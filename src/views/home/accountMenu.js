import React from "react";
import { Menu, Icon } from "antd";
export const Account = (props) => {
  return (
    <Menu onClick={props.handleClick}>
      <Menu.Item key='0'>
        <Icon type="info-circle" />
        消息
      </Menu.Item>
      <Menu.Item key='1'>
        <Icon type="setting" />
        账户设置
      </Menu.Item>
      <Menu.Item key='2'>
        <Icon type="rollback" />
        消息
      </Menu.Item>
      <Menu.Item key='3'>
        <Icon type="close-circle" />
        退出登录
      </Menu.Item>
    </Menu>
  );
};
