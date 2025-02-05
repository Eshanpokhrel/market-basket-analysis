import { Bar } from "react-chartjs-2";

const SupportCountForItemsets = ({ itemsAndCounts }) => {
  const labels = Object.keys(itemsAndCounts);
  const data = {
    labels,
    datasets: [
      {
        label: "Support Count",
        data: labels.map((label) => itemsAndCounts[label]),
        borderColor: "rgba(255, 0, 0, 0.5)",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
      },
    ],
  };

  return <Bar data={data} />;
};
 export default SupportCountForItemsets; 