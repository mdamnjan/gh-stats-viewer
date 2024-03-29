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

const BarChart = ({ data, isLoading, error, title, type, status }) => {
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
    };

    labels = data ? Object.keys(data) : [];

    labels.forEach((label) => {
      if (data && data[label]) {
        processedData[label] = data[label]
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
    <BaseWidget isLoading={isLoading} error={error} status={status}>
      <Bar style={{minHeight: "300px"}} options={options} data={chartData} />
    </BaseWidget>
  );
};
export default BarChart;
