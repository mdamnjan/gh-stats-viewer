import "./ProfileSideBar.css";

const ProfileSideBar = ({ user }) => {
  if (user) {
    return (
      <div data-bs-theme="dark" className="user-profile">
        <img id="user-avatar" alt="User's avatar" src={user.avatar_url}></img>
        <div className="user-details">
          <h4 className="h4"><a href={user.html_url}>{user.login}</a></h4>
          <h6 className="h6"><span>{user.bio}</span></h6>
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

  return (
    <div data-bs-theme="dark" className="user-profile placeholder-glow">
      <img id="user-avatar" alt="User's avatar" src={user?.avatar_url}></img>
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
    </div>
  );
};
export default ProfileSideBar;
