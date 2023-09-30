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

const BarChart = ({ inputData, title }) => {
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

  const labels = inputData ? Object.keys(inputData) : [];
  const initialVal = 0;
  const total = inputData
    ? Object.values(inputData).reduce((cursum, val) => cursum + val, initialVal)
    : 0;
  const data = labels.map((label) => {
    if (inputData && inputData[label]) {
      return (100 * inputData[label]) / total;
    }
    return 0;
  });

  const chartData = {
    labels,
    datasets: [
      {
        data: data,
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
