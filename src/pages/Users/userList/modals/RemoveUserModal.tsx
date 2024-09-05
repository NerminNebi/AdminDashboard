import React from "react";
import { Modal } from "antd";
import { useDeleteUserMutation } from "@/redux/api/usersApi";
import { IModalProps, IRemoveModal } from "./type";

const RemoveUserModal: React.FC<IRemoveModal> = ({
  isOpen,
  onClose,
  user,
  selectedUsersId,
}) => {
  console.log(isOpen, onClose, user, selectedUsersId);
  const id = user ? [user.id] : selectedUsersId;

  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const deleteByClick = (id: number[]) => {
    deleteUser({ id })
      .then(() => {
        onClose();
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  return (
    <Modal title="Remove User" open={isOpen} onCancel={onClose} footer={null}>
      Are you sure delete{" "}
      {selectedUsersId?.length ? `${selectedUsersId.length} selected` : ""}user?
      <div className="mt-3 flex justify-end">
        <button
          onClick={onClose}
          type="button"
          className="px-4 py-2 mr-3 font-semibold leading-6 text-sm rounded-md bg-gray-200"
        >
          Close
        </button>
        <button
          disabled={isLoading}
          type="button"
          onClick={() => deleteByClick(id || [])}
          className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm rounded-md text-white bg-red-500 disabled:bg-red-400"
        >
          Delete
          <svg
            className={`${
              isLoading ? "inline-block" : "hidden"
            } motion-reduce:hidden animate-spin ml-1 mr-3 h-5 w-5 text-white`}
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </button>
      </div>
    </Modal>
  );
};

export default RemoveUserModal;
