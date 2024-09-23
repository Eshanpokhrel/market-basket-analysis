import { Line } from "react-chartjs-2";

const SupportCountForItemsets = ({ itemsAndCounts }) => {
  const labels = Object.keys(itemsAndCounts);
  const data = {
    labels,
    datasets: [
      {
        label: "Support Count",
        data: labels.map((label) => itemsAndCounts[label]),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return <Line data={data} />;
};
 export default SupportCountForItemsets; 