import { Modal, Menu, Layout, Button } from "antd";
import React from "react";
import {SelfInfo} from './accountContent/selfInfo'
const { Sider, Content } = Layout;
export function AccountModal(props) {
  return (
    <>
      <Modal
        title="账户管理"
        visible={props.visible}
        footer={<Button onClick={props.hide}>关闭</Button>}
        className="accountModal"
        closable={false}
        style={{height:500}}
      >
        <Layout style={{height:'100%'}}>
          <Sider theme="light" style={{height:'100%'}}>
            <Menu mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <span>个人信息</span>
              </Menu.Item>
              <Menu.Item key="2">
                <span>账户密码</span>
              </Menu.Item>
              <Menu.Item key="3">
                <span>邀请注册</span>
              </Menu.Item>
              <Menu.Item key="4">
                <span>邮件推送</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{height:'100%'}}>
            <SelfInfo/>
          </Content>
        </Layout>
      </Modal>
    </>
  );
}
