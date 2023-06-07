import "./ProfileSideBar.css";

const ProfileSideBar = ({ user }) => {
  return (
    <div data-bs-theme="dark" className="user-profile">
      <img id="user-avatar" alt="User's avatar" src={user?.avatar_url}></img>
      <h4 className="h4">{user?.login}</h4>
      <h6 className="h6">{user?.bio}</h6>
      <h6 className="h6">
        <small class="text-muted">
          Joined{" "}
          {new Date(user?.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })}
        </small>
      </h6>
    </div>
  );
};
export default ProfileSideBar;
