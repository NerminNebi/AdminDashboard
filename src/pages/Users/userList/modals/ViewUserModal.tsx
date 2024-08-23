import React, { useEffect } from "react";
import { Modal } from "antd";
import { IUser } from "@/redux/api/usersApi/type";
import { useGetUserByIdQuery } from "@/redux/api/usersApi";

interface ViewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUser;
}

const ViewUserModal: React.FC<ViewUserModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const { data: userDetail, isLoading, isError } = useGetUserByIdQuery(user.id);

  console.log(userDetail, isError, isLoading);

  return (
    <Modal
      title="User Detail"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className="right-side-modal"
    >
      <div className="h-screen bg-white p-4 rounded-none">
        <p>First Name: {user.firstName}</p>
        <p>Last Name: {user.lastName}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Status: {user.isActive ? "Active" : "Inactive"}</p>
      </div>
    </Modal>
  );
};

export default ViewUserModal;
