import { Line } from "react-chartjs-2";
import BaseWidget from "../BaseWidget";

import {
  Chart as ChartJS,
  CategoryScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  Colors,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  Filler,
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

const LineChart = ({ data, isLoading, error, title, type, status }) => {
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
      filler: {
        propagate: false,
      },
    },
  };

  let output = {};
  let labels = [];
  let series = [];

  if (!data || Object.keys(data).length === 0) {
    data = [];
  }

  switch (type) {
    case "commit":
      data.forEach((data) => {
        const date = new Date(data.week * 1000).toLocaleDateString();
        labels.push(date);

        output[date] = data.total;
      });
      break;

    case "event":
      labels = getTimeRange("lastWeek");

      let emptyTimeSeries = {};
      labels.forEach((label) => {
        emptyTimeSeries[label] = 0;
      });

      // type is event
      data.forEach((data) => {
        let date = new Date(data.created_at).toLocaleDateString();

        if (!output[data.type]) {
          output[data.type] = {};
          labels.forEach((label) => {
            output[data.type][label] = 0;
          });
          output[data.type][date] += 1;
        } else {
          output[data.type][date] += 1;
        }
        series = Object.keys(output);
      });
      break;

    case "frequency":
      output["additions"] = {};
      output["deletions"] = {};

      data.forEach((data) => {
        let [week, additions, deletions] = data;
        const date = new Date(week * 1000).toLocaleDateString();
        labels.push(date);

        output["additions"][date] = additions;
        output["deletions"][date] = deletions;
      });

      series = ["additions", "deletions"];

      options["plugins"]["filler"] = {
        propagate: true,
        drawTime: "beforeDraw",
      };

      break;

    default:
      break;
  }

  let datasets;
  if (series.length > 0) {
    options.plugins.legend = { display: true, position: "top" };

    datasets = series.map((s) => {
      return {
        data: labels.map((label) => output[s][label]),
        label: s,
        fill: type === "frequency" ? "origin" : false,
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
    <BaseWidget isLoading={isLoading} error={error} status={status}>
      <Line style={{minHeight: "300px", maxHeight: "400px"}} options={options} data={processedData} />
    </BaseWidget>
  );
};
export default LineChart;
