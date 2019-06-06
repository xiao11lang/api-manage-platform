import React, { useState } from "react";
import { Button, Menu, Dropdown, Icon, Input, Select } from "antd";
import IconFont from "./../../components/iconfont";
const menuManage = (
  <Menu>
    <Menu.Item key="1">新建项目</Menu.Item>
    <Menu.Item key="2">新建项目组</Menu.Item>
  </Menu>
);
const menuTest = (
  <Menu>
    <Menu.Item key="1">新建测试用例</Menu.Item>
    <Menu.Item key="2">新建项目组</Menu.Item>
  </Menu>
);
const Group = Input.Group;
const Search = Input.Search;
const { Option } = Select;
export function TopAction(props) {
  const [actionShow, setActionShow] = useState(false);
  return (
    <>
      <p>API研发管理</p>
      <div className="api-top">
        {!actionShow ? (
          <div className="left-top">
            <Dropdown overlay={props.currentKey==='2'?menuManage:menuTest}>
              <Button type="primary" icon="plus">
                新建
                <Icon type="down" />
              </Button>
            </Dropdown>
            <Button
              type="link"
              icon="appstore"
              onClick={() => setActionShow(true)}
            >
              批量操作
            </Button>
          </div>
        ) : (
          <div className="left-top">
            <Button onClick={() => setActionShow(false)} type='link'>
              <IconFont type="iconfanhui" />
              返回
            </Button>
            <Button onClick={() => setActionShow(false)} type='link'>
              <IconFont type="iconshanchu" />
              删除
            </Button>
            <Button onClick={() => setActionShow(false)} type='link'>
              <IconFont type="iconyidong1" />
              移动
            </Button>
          </div>
        )}
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
