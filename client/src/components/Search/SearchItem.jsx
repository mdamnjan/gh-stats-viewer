import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";

const SearchItem = ({ type, data, isLoading }) => {
  const navigate = useNavigate();
  if (type === "users") {
    return (
      <div
        tabIndex={0}
        onClick={() => navigate(`/users/${data.login}`)}
        onKeyDown={(e) => {
          console.log(e.code);
          if (e.code === "Enter") {
            navigate(`/users/${data.login}`);
          }
        }}
        data-bs-theme="dark"
        key={`user-${data.login}`}
        className="card search-result"
      >
        <img
          className="user-img"
          alt="user's avatar"
          src={data.avatar_url}
        ></img>
        <div>
          <h1 style={{ display: "block" }}> {data.login}</h1>
          {data.type === "Organization" && (
            <span className="badge rounded-pill text-bg-secondary">
              {data.type}
            </span>
          )}
        </div>
      </div>
    );
  }
  if (type === "repos") {
    return (
      <Card
        key={data.id}
        isLoading={isLoading}
        // onClick={() => navigate(`/repos/${data.login}/${repo.name}`)}
        repo={data}
      ></Card>
    );
  }
};
export default SearchItem;
