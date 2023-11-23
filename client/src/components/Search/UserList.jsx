import Card from "../Card/Card";

import { useNavigate } from "react-router-dom";

const UserList = ({ users, isLoading }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <Card key={1} isLoading={isLoading} />;
  }
  return users.map((user) => {
    return (
      <div
        tabIndex={0}
        onClick={() => navigate(`/users/${user.login}`)}
        onKeyDown={(e) => {
          console.log(e.code);
          if (e.code === "Enter") {
            navigate(`/users/${user.login}`);
          }
        }}
        data-bs-theme="dark"
        key={`user-${user.login}`}
        className="card search-result"
      >
        <img
          className="user-img"
          alt="user's avatar"
          src={user.avatar_url}
        ></img>
        <div>
          <h1 style={{ display: "block" }}> {user.login}</h1>
          {user.type === "Organization" && (
            <span className="badge rounded-pill text-bg-secondary">
              {user.type}
            </span>
          )}
        </div>
      </div>
    );
  });
};
export default UserList;
