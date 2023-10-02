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

const BarChart = ({ data, title, type }) => {
  let options = {
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
  };

  let labels = [];
  let processedData = {};

  if (!data || Object.keys(data).length === 0) {
    data = [];
  }

  if (type === "contributors") {
    options = {
      indexAxis: "x",
      ...options
    }
    data.forEach((contributor) => {
      labels.push(contributor.author.login);
      processedData[contributor.author.login] = contributor.total;
    });
  } else {
    options = {
      ...options,
      scales: {
        x: {
          min: 0,
          max: 100,
        },
      },
    };

    labels = data ? Object.keys(data) : [];
    const initialVal = 0;
    const total = data
      ? Object.values(data).reduce((cursum, val) => cursum + val, initialVal)
      : 0;

    labels.forEach((label) => {
      if (data && data[label]) {
        processedData[label] = (100 * data[label]) / total;
      } else {
        processedData[label] = 0;
      }
    });
  }

  const chartData = {
    labels,
    datasets: [
      {
        data: labels.map((label) => processedData[label]),
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
