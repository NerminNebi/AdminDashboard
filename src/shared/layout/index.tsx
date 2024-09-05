import React, { ReactNode, useState } from "react";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  UsergroupAddOutlined,
  BlockOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, Space, theme } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { revertAll } from "@/redux/features/constant";
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

interface IMenu {
  key: string;
  path: string;
  label: ReactNode;
  icon: ReactNode;
}

const items: IMenu[] = [
  {
    path: "/",
    label: <Link to="/">Users</Link>,
    icon: <UsergroupAddOutlined className="!text-lg" />,
  },
  {
    path: "/partners",
    label: <Link to="/partners">Partners</Link>,
    icon: <BlockOutlined className="!text-lg" />,
  },
].map(({ label, icon, path }, index) => ({
  key: String(index + 1),
  icon,
  path,
  label,
}));

interface IProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<IProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { firstName, lastName } = useAppSelector((state) => state.auth.user);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div className="flex min-h-screen">
      <Layout>
        <Sider
          width={250}
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="lg"
          collapsedWidth="64"
        >
          <div className="flex items-center justify-between">
            <div className="ml-3">LOGO</div>
            <Button
              type="text"
              icon={
                collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />
              }
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </div>
          <Menu mode="vertical" items={items} />
        </Sider>
        <Layout>
          <Header
            style={{
              display: "flex",
              alignItems: "center",
              background: "#e6d0ed",
              justifyContent: "end",
            }}
          >
            <button onClick={() => dispatch(revertAll())}>Logout</button>
            <Dropdown
              trigger={["click"]}
              dropdownRender={() => <div className="w-36"></div>}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>Hi, {firstName + " " + lastName}</Space>
              </a>
            </Dropdown>
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center", background: "#e6d0ed" }}>
            Admin Panel ©{new Date().getFullYear()} Created by Narmin Askarzade
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default AppLayout;
