import React from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Languages Used",
    },
  },
  scales: {
    x: {
      min: 0,
      max: 100
    }
  }
};

const BarChart = ({ inputData }) => {
  const labels = inputData ? Object.keys(inputData) : [];
  const initialVal = 0
  const total = Object.values(inputData).reduce((cursum, val)=>cursum+val, initialVal)
  const data = labels.map((label) => {
    if (inputData && inputData[label]) {
      return 100*inputData[label] / total;
    }
    return 0
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

  return <Bar options={options} data={chartData} />;
};
export default BarChart;
