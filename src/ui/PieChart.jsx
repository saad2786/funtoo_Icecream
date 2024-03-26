import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ data }) {
  // Filter out items with no quantity
  const filteredData = data?.filter((item) => item.quantity);

  // Extract labels and quantities for the chart data
  const chartData = {
    labels: filteredData?.map((item) => item.product),
    datasets: [
      {
        data: filteredData?.map((item) => item.quantity),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "#90D26D",
          "#FF204E",
        ],
        borderColor: "#FFF",
        borderWidth: 1,
        // Change to a number
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 12,
            weight: "bold", // Adjust the font size as needed
          },
        },
      },
    },
  };
  return <Pie data={chartData} options={options} />;
}
