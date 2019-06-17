import { AccountManage } from "./account";
import React, { useContext } from "react";
import { Divider } from "antd";
import { InfoCard } from "./infoCard";
import { UserCtx } from "./../../App";
export function Control() {
  const { userInfo } = useContext(UserCtx);
  const titleArr = [
    ["official", "官方通知"],
    ["project", "项目通知"],
    ["person", "人员通知"]
  ];
  const mesList = [];
  titleArr.forEach(title => {
    mesList.push({
      title: title[1],
      type: title[0],
      count: userInfo.mesCount[title[0]]
    });
  });
  return (
    <>
      <AccountManage />
      <Divider />
      <InfoCard mesList={mesList} />
    </>
  );
}
