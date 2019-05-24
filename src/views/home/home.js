import React, { useState } from "react";
import { Layout, Menu, Icon } from "antd";
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
export function Home() {
  const [collapse, setCollapse] = useState(false);
  const toggle = () => {
    setCollapse(!collapse);
  };
  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapse} theme="light">
          <Menu mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="0" disabled>
              <Icon type="api" />
              <span>API Master</span>
            </Menu.Item>
            <Menu.Item key="1">
              <Icon type="control" />
              <span>控制台</span>
            </Menu.Item>
            <SubMenu
            key='sub1'
              title={
                <span>
                  <Icon type="api" />
                  <span>API管理与测试</span>
                </span>
              }
            >
            <Menu.Item key="2">
              <span>API管理</span>
            </Menu.Item>
            <Menu.Item key="3">
              <span>API测试</span>
            </Menu.Item>
            </SubMenu>
            
            <Menu.Item key="4">
              <Icon type="database" />
              <span>数据库管理</span>
            </Menu.Item>
            <Menu.Item key="5">
              <Icon type="profile" />
              <span>测试用例</span>
            </Menu.Item>
            <Menu.Item key="6">
              <Icon type="user" />
              <span>成员管理</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", paddingLeft: 20 }}>
            <Icon
              className="trigger"
              type={collapse ? "menu-unfold" : "menu-fold"}
              onClick={toggle}
              style={{marginRight:10}}
            />
            {collapse?'展开':'收起'}
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
