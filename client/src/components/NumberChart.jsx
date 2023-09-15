const NumberChart = ({ title, data }) => {
  return (
    <div data-bs-theme="dark" className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h1>{data}</h1>
      </div>
    </div>
  );
};
export default NumberChart;
