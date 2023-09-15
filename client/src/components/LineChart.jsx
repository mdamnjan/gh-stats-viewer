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

const LineChart = ({ inputData, title }) => {

  let options = {
    indexAxis: "x",
    maintainAspectRatio: false,
    responsive: true,
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

  const commitsPerMonth = Object();
  labels.forEach((label) => (commitsPerMonth[label] = 0));

  inputData.forEach((data) => {
    let date;
    if (data.commit) {
      date = new Date(data.commit.committer.date);
    } else {
      date = new Date(data.created_at);
    }
    const month = date.toLocaleString("default", { month: "long" });
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

  return (
    <div className="card chart-container" style={{ padding: "10px" }}>
      <Line options={options} data={processedData} />
    </div>
  );
};
export default LineChart;
