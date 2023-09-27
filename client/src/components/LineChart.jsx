import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  Colors,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  PointElement
);

const getTimeRange = (range) => {
  let currentTime = new Date(Date());
  let timeRange = [];
  switch (range) {
    case "lastYear":
      // return last 12 months
      currentTime.setMonth(currentTime.getMonth() - 12);
      for (let i = 0; i < 12; i++) {
        timeRange.push(currentTime.toLocaleDateString());
        currentTime.setMonth(currentTime.getMonth() + 1);
      }
      break;
    case "lastThreeMonths":
      // return last 12 weeks
      currentTime.setDate(currentTime.getMonth() - 3);
      for (let i = 0; i < 12; i++) {
        timeRange.push(currentTime.toLocaleDateString());
        currentTime.setDate(currentTime.getDate() + 7);
      }
      break;
    case "lastWeek":
      // return last 7 days
      currentTime.setDate(currentTime.getDate() - 7);
      for (let i = 0; i < 7; i++) {
        timeRange.push(currentTime.toLocaleDateString());
        currentTime.setDate(currentTime.getDate() + 1);
      }
      break;
    default:
      // return last 30 days
      currentTime.setDate(currentTime.getDate() - 30);
      for (let i = 0; i < 30; i++) {
        timeRange.push(currentTime.toLocaleDateString());
        currentTime.setDate(currentTime.getDate() + 1);
      }
      break;
  }
  return timeRange;
};

const LineChart = ({ inputData, title, type }) => {
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
      colors: {
        enabled: true,
      },
    },
    scales: {
      y: {
        min: 0,
      },
    },
  };

  let output = {};
  let labels = [];
  let series = [];

  if (!inputData || Object.keys(inputData).length === 0) {
    inputData = [];
  }

  if (type === "commit") {
    inputData.forEach((data) => {
      const date = new Date(data.week * 1000).toLocaleDateString();
      labels.push(date);

      output[date] = data.total;
    });
  } else {
    labels = getTimeRange("lastWeek");

    let emptyTimeSeries = {};
    labels.forEach((label) => {
      emptyTimeSeries[label] = 0;
    });

    // type is event
    inputData.forEach((data) => {
      let date = new Date(data.created_at).toLocaleDateString();

      if (!output[data.type]) {
        output[data.type] = {};
        labels.forEach((label) => {
          output[data.type][label] = 0;
        })
        output[data.type][date] += 1;
      } else {
        output[data.type][date] += 1;
      }
    series = Object.keys(output);
  })
}

  let datasets;
  if (series.length > 0) {
    options.plugins.legend = { display: true, position: "top" };

    datasets = series.map((s) => {
      return {
        data: labels.map((label) => output[s][label]),
        label: s,
      };
    });
  } else {
    datasets = [
      {
        data: labels.map((label) => output[label]),
      },
    ];
  }

  let processedData = {
    labels: labels,
    datasets: datasets,
  };

  return (
    <div className="card chart-container" style={{ padding: "10px" }}>
      <Line options={options} data={processedData} />
    </div>
  );
};
export default LineChart;
