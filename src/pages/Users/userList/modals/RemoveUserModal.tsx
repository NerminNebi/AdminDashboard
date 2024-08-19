import React from "react";
import { Modal } from "antd";
import { IUser } from "@/redux/api/usersApi/type";

interface RemoveUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUser;
}

const RemoveUserModal: React.FC<RemoveUserModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  return (
    <Modal title="Remove User" open={isOpen} onCancel={onClose} footer={null}>
      Delete
    </Modal>
  );
};

export default RemoveUserModal;
