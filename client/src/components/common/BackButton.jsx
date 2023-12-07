import { Link } from "react-router-dom";
import { ArrowLeftCircle } from "react-bootstrap-icons";

const BackButton = ({ to }) => {
  return (
    <Link
      class="btn btn-dark"
      to={to}
      style={{ position: "absolute", left: "20px", top: "80px" }}
    >
      <ArrowLeftCircle width={24} height={24} />
    </Link>
  );
};
export default BackButton;
