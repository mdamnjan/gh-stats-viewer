import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import BaseWidget from "../BaseWidget";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data, title }) => {
  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
    },

    scales: {
      x: {
        min: 0,
        max: 100,
      },
    },
  };

  const labels = data ? Object.keys(data) : [];
  const initialVal = 0;
  const total = data
    ? Object.values(data).reduce((cursum, val) => cursum + val, initialVal)
    : 0;
  const processedData = labels.map((label) => {
    if (data && data[label]) {
      return (100 * data[label]) / total;
    }
    return 0;
  });

  const chartData = {
    labels,
    datasets: [
      {
        data: processedData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <BaseWidget>
      <Bar options={options} data={chartData} />
    </BaseWidget>
  );
};
export default BarChart;
