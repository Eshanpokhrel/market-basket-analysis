import { Bar } from "react-chartjs-2";
import "chart.js/auto";
const ConfidenceLevelDistribution = ({ rules }) => {
  const data = {
    labels: rules.map((rule) => `${rule.antecedent} => ${rule.consequent}`),
    datasets: [
      {
        label: "Confidence",
        data: rules.map((rule) => rule.confidence),
        backgroundColor: "rgba(0, 128, 0, 0.3)",
      },
    ],
  };

  return <Bar data={data} />;
};

 export default ConfidenceLevelDistribution;