import React from "react";
import { Divider } from "antd";
import UserList from "./userList";

const Users = () => {
  return (
    <React.Fragment>
      <h2 className="text-2xl mb-4">Users</h2>
      <Divider />
      <UserList />
    </React.Fragment>
  );
};

export default Users;
