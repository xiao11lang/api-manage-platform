import React, { useState, createContext,useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Layout, Modal, Icon } from "antd";
import { SideMenu } from "./sideMenu";
import { HomeHeader } from "./homeHeader";
import { Control } from "../control/control";
import { Api } from "../api/api";
import "./home.scss";
import {MessageModal} from './message/messageModal'
import { getMesCount } from "../../api/message";
const { Content } = Layout;
export const ApiCtx = createContext();
export const MessageCtx=createContext()
export function Home(props) {
  const [collapse, setCollapse] = useState(false);//左侧折叠
  const [modalVisible, setModalVisible] = useState(false);//工作组模态框
  const [key, setKey] = useState(2);//左侧选项
  const [messageShow,setMessageShow]=useState(false)//消息模态框
  const [mesKey, setMesKey] = useState(0);//消息模态框key
  const [mesCount,setMesCount]=useState({})
  const [unRead,setUnRead]=useState(0)//未读
  const toggle = () => {
    setCollapse(!collapse);
  };
  const hideMessage=()=>{
    setMessageShow(false)
  }
  const setMessageKey=(key)=>{
    setMessageShow(true);
    setMesKey(key)
  }
  useEffect(()=>{
    getMesCount({id:props.userInfo.id}).then((res)=>{
      let count=Object.values(res.mesCount).reduce((pre,cur)=>{
        return pre+cur
      },0)
      setUnRead(count)
      setMesCount(res.mesCount)
    })
  },[props.userInfo.id, unRead])
  const accountProps = { collapse, toggle, setModalVisible,setMessageKey,unRead };//顶部的props
  return props.loginState||true ? (
    <>
      <Layout style={{ height: "100%" }} className="home">
        <SideMenu collapse={collapse} setKey={setKey} />
        <Layout>
          <HomeHeader {...accountProps} />
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
                <Route
                  render={()=><MessageCtx.Provider value={setMessageKey}><Control mesCount={mesCount}/></MessageCtx.Provider>}
                  path={`${props.match.url}/control`}
                />
                <Route component={Api} path={`${props.match.url}/api`} />
              </Switch>
            </Content>
          </ApiCtx.Provider>
        </Layout>
      </Layout>
      <Modal
        className="workspace"
        visible={modalVisible}
        footer={null}
        title="切换工作组"
        onCancel={() => {
          setModalVisible(false);
        }}
      >
        <div>
          <Icon type="check" style={{ margin: "0 20px" }} />
          <span>工作组12138</span>
        </div>
        <div>
          <Icon type="plus" style={{ margin: "0 20px" }} />
          <span>新建/加入工作组</span>
        </div>
      </Modal>
      {messageShow?<MessageModal hide={hideMessage} mesKey={mesKey} setUnRead={setUnRead} unRead={unRead}/>:null}
    </>
  ) : (
    <Redirect to="/" />
  );
}
