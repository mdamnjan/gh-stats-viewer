import { useNavigate } from "react-router-dom";

const SearchItem = ({ type, data }) => {
  const navigate = useNavigate();
  if (type === "user") {
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
  if (type === "repo") {
    // TODO
    return;
  }
};
export default SearchItem;
