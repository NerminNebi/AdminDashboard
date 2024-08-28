import React, { useState } from "react";
import { Table, Button, Space, Tooltip } from "antd";
import {
  useChangeStatusMutation,
  useGetUsersQuery,
} from "@/redux/api/usersApi";
import { IStatusParams, IUser } from "@/redux/api/usersApi/type";
import { RenderIf } from "@/shared/components";
import { PoweroffOutlined, PlusOutlined } from "@ant-design/icons";

import ViewUserModal from "./modals/ViewUserModal";
import EditUserModal from "./modals/EditUserModal";
import RemoveUserModal from "./modals/RemoveUserModal";
import { ISorted } from "./type";
import Loading from "@/shared/components/Loading";
import AddUserModal from "./modals/AddUserModal";

const UserTable: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [modalType, setModalType] = useState<
    "view" | "edit" | "remove" | "password" | "add" | null
  >(null);

  const [params, setParams] = useState<ISorted>({
    orderBy: false,
    skip: 0,
    sortField: "id",
    take: 10,
    currentPage: 1,
    pageSize: 10,
  });

  const { data, isLoading, isError } = useGetUsersQuery({
    skip: (params.currentPage - 1) * params.pageSize,
    take: params.pageSize,
    orderBy: params.orderBy,
    sortField: params.sortField,
  });

  const openModal = (
    user: IUser | null,
    type: "view" | "edit" | "remove" | "password" | "add"
  ) => {
    setSelectedUser(user);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalType(null);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const [toggleStatus, { isLoading: statusIsLoading }] =
    useChangeStatusMutation();

  const changeUserStatus = (data: IStatusParams) => {
    toggleStatus(data);
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: string, user: IUser) => (
        <Button
          type="default"
          className={
            user.isActive
              ? "border text-green-500 hover:!border-green-500 hover:!text-green-500"
              : "border text-red-500 hover:!border-red-500 hover:!text-red-500"
          }
          icon={<PoweroffOutlined />}
          size={"middle"}
          disabled={statusIsLoading}
          onClick={() =>
            changeUserStatus({
              id: user.id,
              isActive: !user.isActive,
            })
          }
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: string, user: IUser) => (
        <Space size="middle">
          <Button onClick={() => openModal(user, "view")}>View</Button>
          <Button onClick={() => openModal(user, "edit")}>Edit</Button>
          <Button onClick={() => openModal(user, "password")}>
            Change Password
          </Button>
          <Button danger onClick={() => openModal(user, "remove")}>
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination: any) => {
    setParams((prev) => ({
      ...prev,
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    }));
  };

  return (
    <>
      <RenderIf condition={isLoading}>
        <Loading />
      </RenderIf>
      <RenderIf condition={isError}>
        <h2>Error loading user</h2>
      </RenderIf>
      {!isLoading && !isError && data?.data.length && (
        <div>
          <div className="flex justify-end">
            <Tooltip title="Add user">
              <Button
                onClick={() => openModal(null, "add")}
                className="mb3 bg-slate-00 text-purple-600 hover:!bg-purple-600 hover:!text-white hover:!border-none outline-none"
                shape="circle"
                icon={<PlusOutlined className="font-bold" />}
              />
            </Tooltip>
          </div>
          <Table
            dataSource={data?.data.map((user: IUser) => ({
              ...user,
              key: user.id,
            }))}
            rowSelection={rowSelection}
            columns={columns}
            pagination={{
              current: params.currentPage,
              pageSize: params.pageSize,
              total: data?.totalCount,
            }}
            onChange={handleTableChange}
            className="overflow-x-auto"
          />

          {modalType === "add" && (
            <AddUserModal isOpen={!!modalType} onClose={closeModal} />
          )}

          {modalType === "view" && selectedUser && (
            <ViewUserModal
              isOpen={!!modalType}
              onClose={closeModal}
              user={selectedUser}
            />
          )}
          {modalType === "edit" && selectedUser && (
            <EditUserModal
              isOpen={!!modalType}
              onClose={closeModal}
              user={selectedUser}
            />
          )}
          {modalType === "remove" && selectedUser && (
            <RemoveUserModal
              isOpen={!!modalType}
              onClose={closeModal}
              user={selectedUser}
            />
          )}
        </div>
      )}
    </>
  );
};

export default UserTable;
