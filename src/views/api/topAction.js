import React from "react";
import { Button, Menu, Dropdown, Icon, Input, Select } from "antd";
const menu = (
  <Menu>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);
const Group = Input.Group;
const Search=Input.Search
const {Option}=Select
export function TopAction() {
  return (
    <>
      <p>API研发管理</p>
      <div className='api-top'>
        <Dropdown overlay={menu}>
          <Button type="primary" icon="plus">
            新建<Icon type="down" />
          </Button>
        </Dropdown>
        <Button type="link" icon="appstore">
          批量操作
        </Button>
        <Group compact>
          <Select defaultValue="all">
            <Option value="all">全部</Option>
            <Option value="API">API</Option>
          </Select>
          <Search
          placeholder='搜索'
          style={{width:200}}
          />
        </Group>
      </div>
    </>
  );
}
