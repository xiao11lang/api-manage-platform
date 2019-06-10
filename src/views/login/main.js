import { Card, Icon } from "antd";
import React, { useState } from "react";
import { Login } from "./login";
import { Register } from "./register";
const tabList = [
  {
    key: "login",
    tab: "登录"
  },
  {
    key: "register",
    tab: "注册"
  }
];
export function Main(props) {
  const style = { marginBottom: "20px" };
  const [key, setKey] = useState("login");
  const getTitle = key => {
    return key === "login" ? "登录" : "注册";
  };
  return (
    <>
      <header style={{margin:'20px 0'}}>
        <Icon type="api" style={{color:'#1890ff',marginLeft:'20px'}}/>
        API Master
      </header>
      <Card
        style={{ width: 400, margin: "200px auto 0" }}
        title={getTitle(key)}
        tabList={tabList}
        activeTabKey={key}
        onTabChange={key => {
          setKey(key);
        }}
      >
        {key === "login" ? <Login style={style} /> : <Register style={style} history={props.history} setLoginState={props.setLoginState}/>}
      </Card>
    </>
  );
}
