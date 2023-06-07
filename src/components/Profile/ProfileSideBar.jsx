import "./ProfileSideBar.css";

const ProfileSideBar = ({ user }) => {
  return (
    <div data-bs-theme="dark" className="user-profile">
      <img id="user-avatar" alt="User's avatar" src={user?.avatar_url}></img>
      <h4>{user?.login}</h4>
      <h4>{user?.bio}</h4>
    </div>
  );
};
export default ProfileSideBar;
