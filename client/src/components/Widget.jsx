import NumberChart from "./NumberChart";
import LineChart from "./LineChart";
import BarChart from "./BarChart";

const Widget = ({ title, data, type }) => {
  let contents;

  switch (type) {
    default:
      contents = <NumberChart title={title} data={data} />;
      break;
    case "bar":
      contents = <BarChart title={title} inputData={data} />;
      break;
    case "line":
      contents = <LineChart title={title} inputData={data} />;
      break;
  }
  return { contents };
};
export default Widget;
