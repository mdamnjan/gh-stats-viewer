import "./ProfileSideBar.css";

const ProfileSideBar = ({ user, isLoading, error }) => {
  if (isLoading || error) {
    return (
      <div className="user-profile placeholder-glow">
        <img id="user-avatar" alt="User's avatar" src={user?.avatar_url}></img>
        {isLoading && (
          <div className="user-details">
            <h4 className="h4 placeholder col-4">
              <span />
            </h4>
            <h6 className="h6 placeholder col-8">
              <span />
            </h6>
            <h6 className="h6 placeholder col-2">
              <span />
            </h6>
          </div>
        )}
        {error && (
          <div className="user-details">
            <span>Error: {error.response.status}</span>
          </div>
        )}
      </div>
    );
  }

  if (user) {
    return (
      <div className="user-profile">
        <img id="user-avatar" alt="User's avatar" src={user.avatar_url}></img>
        <div className="user-details">
          <h4 className="h4">
            <a href={user.html_url}>{user.login}</a>
          </h4>
          <h6 className="h6">
            <span>{user.bio}</span>
          </h6>
          <h6 className="h6">
            <small class="text-muted">
              Joined{" "}
              {new Date(user.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </small>
          </h6>
        </div>
      </div>
    );
  }
};
export default ProfileSideBar;
