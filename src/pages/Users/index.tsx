import React from "react";
import { Divider } from "antd";
import UserTable from "./userList";

const Users = () => {
  return (
    <React.Fragment>
      <h2 className="text-2xl mb-4">Users</h2>
      <Divider />
      <UserTable />
    </React.Fragment>
  );
};

export default Users;
