import React from "react";
import { Menu, Icon } from "antd";
import IconFont from './../../components/iconfont';
export const Account = (props) => {
  return (
    <Menu onClick={props.handleClick}>
      <Menu.Item key='0'>
        <IconFont type="iconxiaoxi" />
        消息
      </Menu.Item>
      <Menu.Item key='1'>
        <Icon type="setting" />
        账户设置
      </Menu.Item>
      <Menu.Item key='2'>
        <IconFont type="icontuichudenglu" />
        退出登录
      </Menu.Item>
    </Menu>
  );
};
