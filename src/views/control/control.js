import { AccountManage } from "./account";
import React from "react";
import { Divider } from "antd";
import { InfoCard } from "./infoCard";
export function Control(props) {
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
      count: props.mesCount[title[0]]
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
