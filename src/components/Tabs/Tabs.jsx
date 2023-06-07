import "./Tabs.css"

const Tabs = ({ tabs }) => {
  return (
    <nav className="tabs">
      <ul data-bs-theme="dark" class="nav nav-tabs ">
        {tabs.map((tab) => (
          <li className="nav-item">
            <button className={tab.active? "nav-link active": "nav-link"} aria-current="page">
              {tab.icon}
              {tab.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Tabs;
