import React from "react";
import { Layout, Menu, Icon } from "antd";
import {Link} from 'react-router-dom'
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
export function SideMenu(props) {
  return (
    <>
      <Sider trigger={null} collapsible collapsed={props.collapse} theme="light">
          <Menu mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="0" disabled>
              <Icon type="api" />
              <span>API Master</span>
            </Menu.Item>
            <Menu.Item key="1">
              <Link to='/home/control'>
              <Icon type="control" />
              <span>控制台</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
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
    </>
  );
}
