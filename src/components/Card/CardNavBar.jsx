const CardNavBar = () => {
  return (
    <ul class="nav nav-tabs card-header-tabs">
      <li class="nav-item">
        <button class="nav-link active" aria-current="true" href="#">
          <h6>Summary</h6>
        </button>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <h6>Activity</h6>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link">
          {" "}
          <h6>Metrics</h6>
        </a>
      </li>
    </ul>
  );
};
export default CardNavBar;
