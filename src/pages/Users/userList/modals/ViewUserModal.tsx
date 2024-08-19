import React from "react";
import { Modal } from "antd";
import { IUser } from "@/redux/api/usersApi/type";

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
  return (
    <Modal title="View User" visible={isOpen} onCancel={onClose} footer={null}>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Status: {user.isActive ? "Active" : "Inactive"}</p>
    </Modal>
  );
};

export default ViewUserModal;
