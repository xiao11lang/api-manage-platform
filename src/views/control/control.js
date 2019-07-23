import { AccountManage } from "./account";
import React from "react";
import { Divider } from "antd";
import { InfoCard } from "./infoCard";
export function Control(props) {
  return (
    <>
      <AccountManage />
      <Divider />
      <InfoCard />
    </>
  );
}
