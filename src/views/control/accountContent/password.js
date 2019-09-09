import React, { useState,useContext } from "react";
import { InfoRow } from "./infoRow";
import { Input, Button, Tooltip } from "antd";
import { usePasswordValidate } from "../../login/validate";
import { changePass } from "../../../api/user";
import { UserCtx } from "../../../App";
export function Password() {
  const { userInfo } = useContext(UserCtx);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [oldPassTip, setOldPassTip] = useState(false);
  const [newPassTip, setNewPassTip] = useState(false);
  const [passConfirmTip, setPassConfirmTip] = useState(false);
  const oldPassValid = usePasswordValidate(oldPass);
  const newPassValid = usePasswordValidate(newPass);
  const handleOldPassChange = e => {
    setOldPass(e.target.value);
    setOldPassTip(false);
  };
  const handleNewPassChange = e => {
    setNewPass(e.target.value);
    setNewPassTip(false);
  };
  const handlePassConfirmChange = e => {
    setPassConfirm(e.target.value);
    setPassConfirmTip(false);
  };
  const save = () => {
    if (!oldPassValid) {
      setOldPassTip(true);
    }
    if (!newPassValid) {
      setNewPassTip(true);
      return;
    }
    if (passConfirm !== newPass) {
      setPassConfirmTip(true);
      return;
    }
    changePass({
        oldPass:oldPass,
        newPass:newPass,
        id:userInfo.id
    })
  };
  
  return (
    <>
      <InfoRow label="旧密码" style={{ margin: "20px 0" }}>
        <Tooltip title="密码仅可为6-16位的数字和字母" visible={oldPassTip}>
          <Input style={{ width: 250 }} onChange={handleOldPassChange} type='password'/>
        </Tooltip>
      </InfoRow>
      <InfoRow label="新密码" style={{ marginBottom: 20 }}>
        <Tooltip title="密码仅可为6-16位的数字和字母" visible={newPassTip}>
          <Input style={{ width: 250 }} onChange={handleNewPassChange} type='password'/>
        </Tooltip>
      </InfoRow>
      <InfoRow label="确认新密码" style={{ marginBottom: 20 }}>
        <Tooltip title="两次输入的密码不一致" visible={passConfirmTip}>
          <Input style={{ width: 250 }} onChange={handlePassConfirmChange} type='password'/>
        </Tooltip>
      </InfoRow>
      <InfoRow>
        <Button onClick={save}>保存</Button>
      </InfoRow>
    </>
  );
}
