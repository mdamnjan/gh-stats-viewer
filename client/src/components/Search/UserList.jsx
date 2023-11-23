import SearchItem from "./SearchItem";

const UserList = ({ users, isLoading }) => {
  if (isLoading) {
    <SearchItem type="users" />
  }
  return users.map((user) => {
    return <SearchItem type="users" data={user} />;
  });
};
export default UserList;
