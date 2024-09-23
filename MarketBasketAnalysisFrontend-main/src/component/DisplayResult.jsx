import FrequentItemsetsCountChart from "./FrequentItemsetBar";
import ConfidenceLevelDistribution from './ConfidenceDistributionBar'
import SupportCountForItemsets  from './Chart3'
import RuleConfidenceVsConsequentFrequency from "./chart4";
const DisplayResult = ({ data }) => {
  let parsedData = JSON.parse(data);
  const associationRules = parsedData.association_rules;
  const frequent_patterns = parsedData.frequent_patterns;

  const itemsAndCounts = {};

  for (const key in frequent_patterns) {
    const items = key
      .replace(/\(|\)|'/g, "") // Remove parentheses and single quotes
      .split(", ") // Split by ', ' to get individual items
      .map((item) => item.trim()); // Trim any leading/trailing spaces
    const count = frequent_patterns[key];
    itemsAndCounts[items.join(", ")] = count;
  }

  const sortedItemsAndCounts = Object.entries(itemsAndCounts)
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

  const rules = [];

  for (const key in associationRules) {
    const antecedent = key
      .replace(/\(|\)|'/g, "")
      .split(", ")
      .map((item) => item.trim());

    const [consequentItems, confidence] = associationRules[key];
    const rule = {
      antecedent: antecedent.join(", "),
      consequent: consequentItems.join(", "),
      confidence,
    };
    rules.push(rule);
  }
  const sortedData = rules.sort((a, b) => b.confidence - a.confidence);

  // Calculate the index up to which to display (25% of the array length)
  const splitIndex = Math.ceil(sortedData.length * 0.25);

  // Slice the array to get the top 25%
  const top25Percent = sortedData.slice(0, splitIndex);

  // Display the top 25%
  const displayData = top25Percent.map((item, index) => (
    <div key={index}>
      <p style={{ fontWeight: "bolder" }}>
        {" "}
        {item.antecedent}{" "}
        <span style={{ color: "#e67e22", fontSize: "32px" }}> and</span>{" "}
        {item.consequent}{" "}
      </p>
    </div>
  ));




  return (
    <><h1>FrequentItemsetsCountChart</h1>
    <FrequentItemsetsCountChart itemsAndCounts={sortedItemsAndCounts}/>

    <div>
      <h1>Confidence distribution</h1>
      <ConfidenceLevelDistribution rules={rules} />
    </div>

    <div>
    <SupportCountForItemsets itemsAndCounts={itemsAndCounts} />
    </div>

    <div>
      <RuleConfidenceVsConsequentFrequency rules={rules} />
    </div>
      <div>
        <h1>Recommended</h1>
        <p>
          These items can be used for{" "}
          <span style={{ color: "#8e44ad", fontWeight: "bolder" }}>
            cross selling{" "}
          </span>{" "}
        </p>
        {displayData}
      </div>
      <div style={{ marginTop: "30px" }}>
        <h4>Frequent Itemsets</h4>
        <p>
          These are the items frequently bought from you. Support count
          specifies how many times the itemsets were bought compared to total
          transactions
        </p>
        <div
          style={{
            height: "600px",
            overflowY: "scroll",
            borderRadius: "5px",
            marginBottom: "50px",
          }}
        >
          <div>
            {Object.keys(sortedItemsAndCounts).map((key) => (
              <div
                key={key}
                style={{ backgroundColor: "#9b59b6", padding: "20px" }}
              >
                <p style={{ color: "white" }}>Itemsets : {key}</p>
                <p style={{ color: "white" }}>
                  Time bought together: {itemsAndCounts[key]}
                </p>
                <br />
              </div>
            ))}
          </div>
        </div>
        <h4>Strong Rules</h4>
        <p>
          These are the items that have a higher possibility of being bought
          together
        </p>
        <div
          style={{ height: "600px", overflowY: "scroll", borderRadius: "5px" }}
        >
          {rules.map((rule, index) => (
            <div
              key={index}
              style={{ backgroundColor: "#9b59b6", padding: "20px" }}
            >
              <p style={{ color: "white" }}>
                {rule.antecedent} =&gt; {rule.consequent}
              </p>
              <p style={{ color: "white" }}>
                Confidence: {rule.confidence * 100} %
              </p>
              <br />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default DisplayResult;
