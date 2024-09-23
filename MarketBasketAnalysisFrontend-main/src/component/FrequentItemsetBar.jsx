import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const FrequentItemsetsCountChart = ({ itemsAndCounts }) => {
  // Sanitize itemset labels by removing problematic characters
  const labels = Object.keys(itemsAndCounts).map((key) =>
    key.replace(/\(|\)|'/g, "")
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Count",
        data: labels.map((label, index) => itemsAndCounts[Object.keys(itemsAndCounts)[index]]),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  return <Bar data={data} />;
};

export default FrequentItemsetsCountChart;
