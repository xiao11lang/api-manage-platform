import { Button, Icon, Card } from "antd";
import React, { useContext } from "react";
import { AccountModal } from "./accountModal";
import "./control.scss";
import { UserCtx } from "../../App";
import { HomeCtx } from "../home/home";
export function AccountManage() {
  const { userInfo } = useContext(UserCtx);
  const {accountModalShow,setAccountShow}=useContext(HomeCtx)
  return (
    <>
      <Card className="accountManage">
        <Icon type="user" />
        <span style={{ margin: "0 24px" }}>{userInfo.name}</span>
        <Button onClick={() => setAccountShow(true)}>账户管理</Button>
      </Card>
      <AccountModal
        visible={accountModalShow}
        hide={() => setAccountShow(false)}
      />
    </>
  );
}
