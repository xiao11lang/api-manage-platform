import { AccountManage } from "./account";
import React from "react";
import { Divider } from "antd";
import { InfoCard } from "./infoCard";
export function Control() {
  const cardList = [
    { title: "项目通知", number: 4 },
    { title: "官方通知", number: 3 },
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
