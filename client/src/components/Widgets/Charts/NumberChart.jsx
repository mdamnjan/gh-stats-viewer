import BaseWidget from "../BaseWidget";

const NumberChart = ({ data, isLoading, error, title }) => {
  return (
    <BaseWidget isLoading={isLoading} error={error}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h1>{data? data.toLocaleString(): data}</h1>
      </div>
    </BaseWidget>
  );
};
export default NumberChart;
