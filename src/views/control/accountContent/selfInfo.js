import React from "react";
import { Button, Input, Icon, Select, Upload } from "antd";
import {InfoRow} from './infoRow'
const Option = Select.Option;
export function SelfInfo() {
  return (
    <>
      <InfoRow style={{ margin: "20px 0" }} label="头像">
        <Icon type="user" style={{ marginRight: 20 }} />
        <Upload>
          <Button type="primary">更换头像</Button>
        </Upload>
      </InfoRow>
      <InfoRow style={{ marginBottom: 20 }} label="姓名">
        <Input placeholder="小食蚁螂" style={{ width: 250 }} />
      </InfoRow>
      <InfoRow label="性别">
        <Select defaultValue="male" style={{ width: 250 }}>
          <Option value="male">男</Option>
          <Option value="female">女</Option>
          <Option value="unkoown">未知</Option>
        </Select>
      </InfoRow>
    </>
  );
}
