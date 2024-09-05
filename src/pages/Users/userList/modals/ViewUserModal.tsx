import React from "react";
import { Card, Modal } from "antd";
import {
  UserOutlined,
  MailOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { IUser } from "@/redux/api/usersApi/type";
import { useGetUserByIdQuery } from "@/redux/api/usersApi";
import { RenderIf } from "@/shared/components";
import Loading from "@/shared/components/Loading";

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
  if (!user) return null;
  const { data: userDetail, isLoading, isError } = useGetUserByIdQuery(user.id);

  return (
    <Modal
      title="User Detail"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className="right-side-modal"
    >
      <RenderIf condition={isLoading}>
        <Loading />
      </RenderIf>
      <RenderIf condition={isError}>
        <span className="text-red-500">Error occured</span>
      </RenderIf>
      {!isError && !isLoading && userDetail && (
        <div className="h-screen bg-white rounded-none">
          <Card className="shadow-md rounded-lg p-2 bg-white">
            <div className="flex items-center mb-3">
              <UserOutlined className="text-2xl text-teal-600 mr-2" />
              <div className="flex flex-col">
                <div className="font-semibold">{userDetail.firstName}</div>
                <span className="text-xs text-gray-600">Firstname</span>
              </div>
            </div>
            <div className="flex items-center mb-3">
              <UserOutlined className="text-2xl  text-teal-600 mr-2" />
              <div className="flex flex-col">
                <div className="font-semibold">{userDetail.lastName}</div>
                <span className="text-xs text-gray-600">Lastname</span>
              </div>
            </div>
            <div className="flex items-center mb-3">
              <MailOutlined className="text-xl  text-teal-600 mr-2" />
              <div className="flex flex-col">
                <div className="font-semibold">{userDetail.email}</div>
                <span className="text-xs text-gray-600">Email</span>
              </div>
            </div>
            <div className="flex items-center mb-3">
              <PhoneOutlined className="text-xl  text-teal-600 mr-2" />
              <div className="flex flex-col">
                <div className="font-semibold">{userDetail.phone}</div>
                <span className="text-xs text-gray-600">Phone</span>
              </div>
            </div>
            <div className="flex items-center">
              {userDetail.isActive ? (
                <CheckCircleOutlined className="text-xl text-teal-600 mr-2" />
              ) : (
                <CloseCircleOutlined className="text-xl text-red-500 mr-2" />
              )}
              <span
                className={
                  userDetail.isActive ? "text-teal-600" : "text-red-500"
                }
              >
                {userDetail.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </Card>
        </div>
      )}
    </Modal>
  );
};

export default ViewUserModal;
