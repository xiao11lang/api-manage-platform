import { AccountManage } from "./account";
import React, { useContext } from "react";
import { Divider } from "antd";
import { InfoCard } from "./infoCard";
import { UserCtx } from "./../../App";
export function Control() {
  const titleMap = {
    official: "官方通知",
    project: "项目通知",
    person: "人员通知"
  };
  const { userInfo } = useContext(UserCtx);
  const mesList = Object.keys(userInfo.mesCount).map(type => {
    return {
      title: titleMap[type],
      count: userInfo.mesCount[type],
      type: type
    };
  });
  return (
    <>
      <AccountManage />
      <Divider />
      <InfoCard mesList={mesList} />
    </>
  );
}
