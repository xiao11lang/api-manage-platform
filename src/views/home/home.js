import React, { useState } from "react";
import {
  Layout,
  Modal
} from "antd";
import { SideMenu } from "./sideMenu";
import {HomeHeader} from './homeHeader'
const { Content } = Layout;
export function Home() {
  const [collapse, setCollapse] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const toggle = () => {
    setCollapse(!collapse);
  };
  const accountProps={collapse,toggle,setModalVisible}
  return (
    <>
      <Layout>
        <SideMenu collapse={collapse} />
        <Layout>
          <HomeHeader {...accountProps}></HomeHeader>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          />
        </Layout>
      </Layout>
      <Modal
        visible={modalVisible}
        footer={null}
        title="切换工作组"
        onCancel={() => {
          setModalVisible(false);
        }}
      />
    </>
  );
}
