import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

export const options = {
  indexAxis: "x",
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
      text: "Commits",
    },
  },
  scales: {
    x: {
      min: 0,
      max: 100,
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const LineChart = ({ inputData }) => {
  const commitsPerMonth = Object();
  labels.forEach((label) => (commitsPerMonth[label] = 0));

  inputData.map((data) => {
    const date = new Date(data.commit.committer.date)
    const month = date.toLocaleString(
      "default",
      { month: "long" }
    );
    commitsPerMonth[month] += 1;
  });

  const processedData = {
    labels,
    datasets: [
      {
        data: labels.map((label) => commitsPerMonth[label]),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={processedData} />;
};
export default LineChart;
