import React, { useState } from "react";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, Space, theme } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { revertAll } from "@/redux/features/constant";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
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
    <Layout>
      <Sider
        width={250}
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="64"
        onBreakpoint={(broken) => {
          // console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, type);
        }}
      >
        <div className="flex items-center justify-between">
          <div className="">LOGO</div>
          <Button
            type="text"
            icon={collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
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
            menu={{ items }}
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
  );
};

export default AppLayout;
