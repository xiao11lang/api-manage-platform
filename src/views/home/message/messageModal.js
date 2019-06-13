import React, { useState, useContext } from "react";
import { Modal, Layout, Menu, Button, Dropdown } from "antd";
import IconFont from "./../../../components/iconfont";
import { MessageList } from "./list";
import { MessageDetail } from "./detail";
import "./message.scss";
import { UserCtx } from "./../../../App";
const { Sider, Content } = Layout;
const MenuAction = () => {
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item>全部已读</Menu.Item>
          <Menu.Item>全部删除</Menu.Item>
        </Menu>
      }
    >
      <IconFont type="icongengduo" />
    </Dropdown>
  );
};
export function MessageModal(props) {
  const { userInfo } = useContext(UserCtx);
  const [key, setKey] = useState("1");
  const [detailShow, setDetailShow] = useState(false);
  const handleClick = ({ key }) => {
    setKey(key);
  };
  const itemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
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
              defaultSelectedKeys={[props.mesKey]}
              onClick={handleClick}
            >
              <Menu.Item key="1" style={itemStyle}>
                <span>项目通知</span>
                <MenuAction />
              </Menu.Item>
              <Menu.Item key="2" style={itemStyle}>
                <span>官方通知</span>
                <MenuAction />
              </Menu.Item>
              <Menu.Item key="3" style={itemStyle}>
                <span>人员通知</span>
                <MenuAction />
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ height: "100%" }}>
            {detailShow ? (
              <MessageDetail
                mes={userInfo.mes[0]}
                hideDetail={() => setDetailShow(false)}
              />
            ) : (
              <MessageList
                mesList={userInfo.mes}
                showDetail={() => setDetailShow(true)}
              />
            )}
          </Content>
        </Layout>
      </Modal>
    </>
  );
}
