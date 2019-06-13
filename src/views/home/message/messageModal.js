import React, { useState } from "react";
import { Modal, Layout, Menu, Button } from "antd";
import './message.scss'
const { Sider, Content } = Layout;
export function MessageModal(props) {
  const [key, setKey] = useState("1");
  const handleClick = ({ key }) => {
    setKey(key);
  };
  return (
    <>
      <Modal
        title="消息管理"
        visible={true}
        footer={<Button onClick={props.hide}>关闭</Button>}
        className="messageModal"
        closable={false}
        destroyOnClose={true}
        style={{ height: 500 }}
      >
        <Layout style={{ height: "100%" }}>
          <Sider theme="light" style={{ height: "100%" }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[key]}
              onClick={handleClick}
            >
              <Menu.Item key="1">
                <span>项目通知</span>
              </Menu.Item>
              <Menu.Item key="2">
                <span>官方通知</span>
              </Menu.Item>
              <Menu.Item key="3">
                <span>人员通知</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ height: "100%" }} />
        </Layout>
      </Modal>
    </>
  );
}
