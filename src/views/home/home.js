import React, { useState, createContext, useEffect, useMemo } from "react";
import { Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import SideMenu from "./sideMenu";
import { HomeHeader } from "./homeHeader";
import { Control } from "../control/control";
import { Api } from "../api/api";
import "./home.scss";
import { MessageModal } from "./message/messageModal";
import { getMesCount } from "../../api/message";
import { getInfo } from "../../api/user";
import { TeamManage } from "./workTeam/teamManage";
import { AccountModal } from "./../control/accountModal";
import { PersonManage } from "./person/personManage";
const { Content } = Layout;
export const ApiCtx = createContext();
export const HomeCtx = createContext();
export function Home(props) {
  const [collapse, setCollapse] = useState(false); //左侧折叠
  const [key, setKey] = useState(2); //左侧选项
  const [messageShow, setMessageShow] = useState(false); //消息模态框
  const [accountModalShow, setAccountShow] = useState(false); //消息模态框key
  const [mesKey, setMesKey] = useState(0); //消息模态框key
  const [mesCount, setMesCount] = useState({});
  const [unRead, setUnRead] = useState(0); //未读
  const [teamInfo, setTeamInfo] = useState({}); //工作组信息
  const [teamList, setTeamList] = useState([]); //工作组列表
  const toggle = () => {
    setCollapse(!collapse);
  };
  const hideMessage = () => {
    setMessageShow(false);
  };
  const setMessageKey = key => {
    setMessageShow(true);
    setMesKey(key);
  };
  useEffect(() => {
    getInfo().then(res => {
      props.setUserInfo(res.info);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getMesCount({ id: props.userInfo.id }).then(res => {
      let count = Object.values(res.mesCount).reduce((pre, cur) => {
        return pre + cur;
      }, 0);
      setUnRead(count);
      setMesCount(res.mesCount);
    });
  }, [props.userInfo.id, unRead]);
  // 仅在工作组的创建者是当前用户时可见的路由组件
  const showExtraRoute = useMemo(() => {
    return props.userInfo.id === teamInfo.master;
  }, [props.userInfo, teamInfo]);

  const accountProps = {
    collapse,
    toggle,
    setMessageKey,
    setMessageShow,
    setAccountShow,
    unRead,
    setUnRead,
    teamInfo,
    setTeamInfo,
    teamList,
    setTeamList
  }; //顶部的props
  return (
    <>
      <Layout style={{ height: "100%" }} className="home">
        <SideMenu
          collapse={collapse}
          setKey={setKey}
          teamList={teamList}
          showExtraRoute={showExtraRoute}
        />
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
                  render={() => (
                    <HomeCtx.Provider
                      value={{
                        setMessageKey,
                        accountModalShow,
                        setAccountShow
                      }}
                    >
                      <Control mesCount={mesCount} />
                    </HomeCtx.Provider>
                  )}
                  path={`${props.match.url}/control`}
                />
                <Route component={Api} path={`${props.match.url}/api`} />
                {teamList.length ? (
                  <Route
                    render={() => <PersonManage teamInfo={teamInfo} showExtraRoute={showExtraRoute} userInfo={props.userInfo}/>}
                    path={`${props.match.url}/person`}
                  />
                ) : null}
                <Route
                  render={props => (
                    <TeamManage
                      setTeamInfo={setTeamInfo}
                      setTeamList={setTeamList}
                      teamInfo={teamInfo}
                      showExtraRoute={showExtraRoute}
                      {...props}
                    />
                  )}
                  path={`${props.match.url}/workTeam`}
                />
              </Switch>
            </Content>
          </ApiCtx.Provider>
        </Layout>
      </Layout>
      {messageShow ? (
        <MessageModal
          hide={hideMessage}
          mesKey={mesKey}
          setUnRead={setUnRead}
          unRead={unRead}
        />
      ) : null}
      {accountModalShow ? (
        <AccountModal
          visible={accountModalShow}
          hide={() => setAccountShow(false)}
        />
      ) : null}
    </>
  );
}
