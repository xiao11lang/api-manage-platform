import React,{useContext} from "react";
import { Button, Input, Icon, Select, Upload } from "antd";
import {InfoRow} from './infoRow'
import {UserCtx} from '../../../App'
const Option = Select.Option;
export function SelfInfo() {
  const {userInfo}=useContext(UserCtx)
  return (
    <>
      <InfoRow style={{ margin: "20px 0" }} label="头像">
        <Icon type="user" style={{ marginRight: 20 }} />
        <Upload>
          <Button type="primary">更换头像</Button>
        </Upload>
      </InfoRow>
      <InfoRow style={{ marginBottom: 20 }} label="姓名">
        <Input placeholder={userInfo.name} style={{ width: 250 }} />
      </InfoRow>
      <InfoRow label="性别" style={{ marginBottom: 20 }}>
        <Select defaultValue="male" style={{ width: 250 }}>
          <Option value="male">男</Option>
          <Option value="female">女</Option>
          <Option value="unknown">未知</Option>
        </Select>
      </InfoRow>
      <InfoRow ><Button>保存</Button></InfoRow>
    </>
  );
}
