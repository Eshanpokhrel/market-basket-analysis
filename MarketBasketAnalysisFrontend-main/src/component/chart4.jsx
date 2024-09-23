import { Scatter } from "react-chartjs-2";

const RuleConfidenceVsConsequentFrequency = ({ rules }) => {
  // Dummy data for demonstration. Replace with your actual data preprocessing.
  const data = {
    datasets: [
      {
        label: "Rule Confidence vs Consequent Frequency",
        data: rules.map((rule) => ({
          x: rule.confidence,
          y: Math.random() * 10,
        })), // Replace y with your calculated frequency
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },
    ],
  };

  return <Scatter data={data} />;
};
export default RuleConfidenceVsConsequentFrequency;