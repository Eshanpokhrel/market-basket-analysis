import React from 'react';
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const LiftDistributionChart = ({ rules }) => {
    // Process rules to get lift data
    const processedRules = rules
        // eslint-disable-next-line react/prop-types
        .filter(rule => rule && typeof rule.lift === 'number')
        .sort((a, b) => b.lift - a.lift)
        .slice(0, 10); // Take top 10 for better visualization

    // Create labels from rule combinations
    const labels = processedRules.map(
        rule => `${rule.antecedent} → ${rule.consequent}`
    );

    const data = {
        labels,
        datasets: [
            {
                label: "Lift Value",
                data: processedRules.map(rule => rule.lift),
                backgroundColor: "rgba(255, 0, 0, 0.5)", // Teal color to differentiate from other charts
                borderColor: "rgba(255, 0, 0, 0.5)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: ''
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `Lift: ${context.raw.toFixed(2)}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Lift Value'
                }
            },
            x: {
                ticks: {
                    maxRotation: 45,
                    minRotation: 45
                }
            }
        }
    };

    return <Bar data={data} options={options} />;
};

export default LiftDistributionChart;