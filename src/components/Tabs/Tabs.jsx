import "./Tabs.css"

const Tabs = ({ tabs }) => {
  return (
    <div className="tabs">
      <ul>
        {tabs.map((tab) => (
          <li className="tab">{tab.text}</li>
        ))}
      </ul>
    </div>
  );
};
export default Tabs;
