import React, { useContext, useState } from "react";
import { Button, Input, Icon, Select, Upload,Modal } from "antd";
import { InfoRow } from "./infoRow";
import { UserCtx } from "../../../App";
import { update } from "./../../../api/user";
const Option = Select.Option;
export function SelfInfo() {
  const { userInfo, setUserInfo } = useContext(UserCtx);
  const [sex, setSex] = useState("male");
  const [name, setName] = useState();
  const handleNameChange = e => {
    setName(e.target.value);
  };
  const save = () => {
    const data = {
      id: userInfo.id,
      sex: sex,
      name: name||userInfo.name
    };
    update(data).then((res) => {
      setUserInfo(data);
      Modal.success({
        content:res.detail,
        centered:true
      })
    });
  };
  return (
    <>
      <InfoRow style={{ margin: "20px 0" }} label="头像">
        <Icon type="user" style={{ marginRight: 20 }} />
        <Upload>
          <Button type="primary">更换头像</Button>
        </Upload>
      </InfoRow>
      <InfoRow style={{ marginBottom: 20 }} label="姓名">
        <Input
          placeholder={userInfo.name}
          style={{ width: 250 }}
          onChange={handleNameChange}
        />
      </InfoRow>
      <InfoRow label="性别" style={{ marginBottom: 20 }}>
        <Select
          defaultValue={userInfo.sex}
          style={{ width: 250 }}
          onSelect={value => setSex(value)}
        >
          <Option value="male">男</Option>
          <Option value="female">女</Option>
          <Option value="unknown">未知</Option>
        </Select>
      </InfoRow>
      <InfoRow>
        <Button onClick={save}>保存</Button>
      </InfoRow>
    </>
  );
}
