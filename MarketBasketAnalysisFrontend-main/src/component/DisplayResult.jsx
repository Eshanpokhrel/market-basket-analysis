import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import FrequentItemsetsCountChart from "./FrequentItemsetBar";
import ConfidenceLevelDistribution from './ConfidenceDistributionBar';
import LiftDistributionChart from "./LiftDistributionChart.jsx";

const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
};

const DisplayResult = ({ data, title }) => {
    const reportRef = useRef(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const parsedData = JSON.parse(data);
    const associationRules = parsedData.association_rules;
    const frequent_patterns = parsedData.frequent_patterns;

    // Data processing remains unchanged
    const itemsAndCounts = {};
    for (const key in frequent_patterns) {
        const items = key.replace(/\(|\)|'/g, "").split(", ").map((item) => item.trim());
        itemsAndCounts[items.join(", ")] = frequent_patterns[key];
    }
    const sortedItemsAndCounts = Object.entries(itemsAndCounts)
        .sort(([, a], [, b]) => b - a)
        .reduce((r, [k, v]) => ({...r, [k]: v}), {});

    const rules = [];
    for (const key in associationRules) {
        const antecedent = key.replace(/\(|\)|'/g, "").split(", ").map((item) => item.trim());
        const ruleData = associationRules[key];
        if (ruleData) {
            const consequent = typeof ruleData.consequent === 'string'
                ? ruleData.consequent.replace(/\(|\)|'/g, "").split(", ").map(item => item.trim())
                : [];
            rules.push({
                antecedent: antecedent.join(", "),
                consequent: consequent.join(", "),
                confidence: ruleData.confidence || 0,
                lift: ruleData.lift || 0
            });
        }
    }
    const sortedData = rules.sort((a, b) => b.confidence - a.confidence);
    const top25Percent = sortedData.slice(0, Math.ceil(sortedData.length * 0.25));
    const displayData = top25Percent.map((item, index) => (
        <div key={index}>
            <p style={{fontWeight: "bolder"}}>
                {item.antecedent} <span style={{color: "teal", fontSize: "32px"}}> and</span> {item.consequent}
            </p>
        </div>
    ));

    // Split data into chunks for PDF
    const itemsetChunks = chunkArray(Object.keys(sortedItemsAndCounts), 15);
    const ruleChunks = chunkArray(rules, 10);

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            const element = reportRef.current;
            const pdf = new jsPDF('p', 'mm', 'a4');

            // Activate PDF mode
            element.classList.add('pdf-mode');

            // Get all pages including the chunked pages
            const pages = element.querySelectorAll('.pdf-page');

            for (let i = 0; i < pages.length; i++) {
                const pageEl = pages[i];

                // Temporarily override styles for PDF
                const originalStyles = Array.from(pageEl.querySelectorAll('*')).map(el => ({
                    element: el,
                    overflow: el.style.overflow,
                    height: el.style.height,
                    position: el.style.position,
                }));

                pageEl.querySelectorAll('*').forEach(el => {
                    el.style.overflow = 'visible';
                    el.style.height = 'auto';
                    el.style.position = 'static';
                });

                await new Promise(resolve => setTimeout(resolve, 500));
                const canvas = await html2canvas(pageEl, {
                    scale: 2,
                    useCORS: true,
                    windowHeight: pageEl.scrollHeight + 200,
                    logging: true,
                });

                // Restore original styles
                originalStyles.forEach(style => {
                    style.element.style.overflow = style.overflow;
                    style.element.style.height = style.height;
                    style.element.style.position = style.position;
                });

                const imgData = canvas.toDataURL('image/png');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();

                const imgWidth = pdfWidth;
                const imgHeight = (canvas.height * pdfWidth) / canvas.width;

                if (i > 0) pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            }

            // Deactivate PDF mode
            element.classList.remove('pdf-mode');

            const pdfBlob = pdf.output('blob');
            const url = window.URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = url;
            if(title != null && title != undefined){
                const sanitizedTitle = title.replace(/[^a-zA-Z0-9_-]/g, "_");
                link.download = `${sanitizedTitle}_report.pdf`;
            } else {
                link.download = 'complete-analysis-report.pdf';
            }
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error('PDF generation failed:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div ref={reportRef}>
            <button
                onClick={handleDownload}
                disabled={isDownloading}
                style={{
                    margin: '20px',
                    padding: '10px 20px',
                    backgroundColor: isDownloading ? '#cccccc' : '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isDownloading ? 'not-allowed' : 'pointer',
                }}
            >
                {isDownloading ? 'Processing...' : 'Download Full Analysis Report as PDF'}
            </button>

            {/* Page 1: Frequent Itemsets and Confidence */}
            <div className="pdf-page">
                <h1>Frequent Itemsets</h1>
                <FrequentItemsetsCountChart itemsAndCounts={sortedItemsAndCounts}/>

                <div>
                    <h1>Confidence Distribution</h1>
                    <ConfidenceLevelDistribution rules={rules}/>
                </div>
            </div>

            {/* Page 2: Lift Analysis and Recommendations */}
            <div className="pdf-page">
                <div>
                    <h1>Lift Analysis</h1>
                    <p>
                        Lift values greater than 1 indicate positive correlation between items,
                        while values less than 1 indicate negative correlation.
                    </p>
                    <LiftDistributionChart rules={rules}/>
                </div>

                <div>
                    <h1>Recommended</h1>
                    <p>
                        These items can be used for{" "}
                        <span style={{color: "teal", fontWeight: "bolder"}}>
                            cross selling
                        </span>
                    </p>
                    {displayData}
                </div>
            </div>

            {/* Original Detailed Lists (Visible in UI) */}
            <div className="regular-page">
                <div style={{marginTop: "30px"}}>
                    <h4>Frequent Itemsets</h4>
                    <p>
                        These are the items frequently bought from you. Support count
                        specifies how many times the itemsets were bought compared to total
                        transactions
                    </p>
                    <div style={{
                        height: "600px",
                        overflowY: "scroll",
                        borderRadius: "5px",
                        marginBottom: "50px",
                    }}>
                        {Object.keys(sortedItemsAndCounts).map((key) => (
                            <div
                                key={key}
                                style={{backgroundColor: "rgba(0, 128, 128, 0.8)", padding: "20px"}}
                            >
                                <p style={{color: "white"}}>Itemsets : {key}</p>
                                <p style={{color: "white"}}>Time bought together: {itemsAndCounts[key]}</p>
                                <br/>
                            </div>
                        ))}
                    </div>

                    <h4>Strong Rules</h4>
                    <p>
                        These are the items that have a higher possibility of being bought
                        together
                    </p>
                    <div style={{height: "600px", overflowY: "scroll", borderRadius: "5px"}}>
                        {rules.map((rule, index) => (
                            <div
                                key={index}
                                style={{backgroundColor: "rgba(0, 128, 128, 0.8)", padding: "20px"}}
                            >
                                <p style={{color: "white"}}>
                                    {rule.antecedent} =&gt; {rule.consequent}
                                </p>
                                <p style={{color: "white"}}>
                                    Confidence: {(rule.confidence * 100).toFixed(2)}%
                                </p>
                                <br/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* PDF-only Pages (Hidden in UI) */}
            {itemsetChunks.map((chunk, index) => (
                <div className="pdf-page pdf-only" key={`itemset-${index}`}>
                    <div style={{ marginTop: "30px" }}>
                        <h4>Frequent Itemsets</h4>
                        <p>
                            These are the items frequently bought from you. Support count
                            specifies how many times the itemsets were bought compared to total
                            transactions
                        </p>
                        <div className="pdf-list">
                            {chunk.map((key) => (
                                <div
                                    key={key}
                                    className="pdf-itemset"
                                >
                                    <p>Itemsets: {key}</p>
                                    <p>Time bought together: {itemsAndCounts[key]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

            {ruleChunks.map((chunk, index) => (
                <div className="pdf-page pdf-only" key={`rule-${index}`}>
                    <div style={{ marginTop: "30px" }}>
                        <h4>Strong Rules</h4>
                        <p>
                            These are the items that have a higher possibility of being bought
                            together
                        </p>
                        <div className="pdf-list">
                            {chunk.map((rule, idx) => (
                                <div
                                    key={idx}
                                    className="pdf-rule"
                                >
                                    <p>{rule.antecedent} =&gt; {rule.consequent}</p>
                                    <p>Confidence: {(rule.confidence * 100).toFixed(2)}%</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

            <style>
                {`
                    /* Hide PDF-only content in regular view */
                    .pdf-only {
                        display: none;
                    }

                    /* PDF mode styles */
                    .pdf-mode .regular-page {
                        display: none !important;
                    }

                    .pdf-mode .pdf-only {
                        display: block !important;
                    }

                    /* PDF-specific styling */
                    .pdf-mode .pdf-list {
                        height: auto !important;
                        overflow: visible !important;
                        margin-bottom: 20px;
                    }

                    .pdf-mode .pdf-itemset,
                    .pdf-mode .pdf-rule {
                        background-color: rgba(0, 128, 128, 0.8) !important;
                        padding: 15px !important;
                        margin-bottom: 10px;
                        break-inside: avoid;
                    }

                    .pdf-mode .pdf-itemset p,
                    .pdf-mode .pdf-rule p {
                        color: white !important;
                        margin: 5px 0;
                    }
                `}
            </style>
        </div>
    );
};

export default DisplayResult;