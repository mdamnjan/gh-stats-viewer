const CardNavBar = ({ tabs, handleTabSelect, currentTab }) => {
  return (
    <ul class="nav nav-tabs card-header-tabs">
      {tabs.map((tab) => (
        <li class="nav-item">
          <button
            onClick={(e) => handleTabSelect(tab.id)}
            class={tab.id === currentTab ? "nav-link active" : "nav-link"}
            aria-current="true"
            href="#"
          >
            <h6>{tab.text}</h6>
          </button>
        </li>
      ))}
    </ul>
  );
};
export default CardNavBar;
