import React from "react";
import { Button, Menu, Dropdown, Icon, Input, Select } from "antd";
const menu = (
  <Menu>
    <Menu.Item key="1">新建项目</Menu.Item>
    <Menu.Item key="2">新建项目组</Menu.Item>
  </Menu>
);
const Group = Input.Group;
const Search = Input.Search;
const { Option } = Select;
export function TopAction() {
  return (
    <>
      <p>API研发管理</p>
      <div className="api-top">
        <div className="left-top">
          <Dropdown overlay={menu}>
            <Button type="primary" icon="plus">
              新建
              <Icon type="down" />
            </Button>
          </Dropdown>
          <Button type="link" icon="appstore">
            批量操作
          </Button>
        </div>
        <Group compact>
          <Select defaultValue="all">
            <Option value="all">全部</Option>
            <Option value="API">API</Option>
          </Select>
          <Search placeholder="搜索" style={{ width: 200 }} />
        </Group>
      </div>
    </>
  );
}
