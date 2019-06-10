import React, { useState,createContext } from "react";
import {Switch,Route} from 'react-router-dom'
import {
  Layout,
  Modal,Icon
} from "antd";
import { SideMenu } from "./sideMenu";
import {HomeHeader} from './homeHeader'
import {Control} from '../control/control'
import {Api} from '../api/api'
import './home.scss'
const { Content } = Layout;
export const ApiCtx=createContext()
export function Home(props) {
  const [collapse, setCollapse] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [key,setKey]=useState(2)
  const toggle = () => {
    setCollapse(!collapse);
  };
  const accountProps={collapse,toggle,setModalVisible}
  return (
    <>
      <Layout style={{height:'100%'}} className='home'>
        <SideMenu collapse={collapse} setKey={setKey}/>
        <Layout>
          <HomeHeader {...accountProps}></HomeHeader>
          <ApiCtx.Provider value={key}>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          >
          <Switch>
            <Route component={Control} path={`${props.match.url}/control`}></Route>
            <Route component={Api} path={`${props.match.url}/api`}></Route>
          </Switch>
          </Content>
          </ApiCtx.Provider>
        </Layout>
      </Layout>
      <Modal
      className='workspace'
        visible={modalVisible}
        footer={null}
        title="切换工作组"
        onCancel={() => {
          setModalVisible(false);
        }}
      >
        <div><Icon type='check' style={{margin:'0 20px'}}/><span>工作组12138</span></div>
        <div><Icon type='plus' style={{margin:'0 20px'}}/><span>新建/加入工作组</span></div>
      </Modal>
    </>
  );
}
