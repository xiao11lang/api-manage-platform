import { AccountManage } from "./account";
import React,{useContext} from "react";
import { Divider } from "antd";
import { InfoCard } from "./infoCard";
import { UserCtx } from './../../App';
export function Control() {
  const {userInfo}=useContext(UserCtx)
  let officialMes=userInfo.mes.filter((mes)=>{
    return mes.type==='official'
  })
  const cardList = [
    { title: "项目通知", number: 4 },
    { title: "官方通知", number: officialMes.length },
    { title: "人员通知", number: 4 }
  ];
  return (
    <>
      <AccountManage />
      <Divider />
      <InfoCard cardList={cardList}/>
    </>
  );
}
