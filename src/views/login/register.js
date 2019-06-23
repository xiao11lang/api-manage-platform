import React, { useState } from "react";
import { Icon, Input, Button, Tooltip } from "antd";
import { useNameValidate, usePasswordValidate } from "./validate";
import {register} from '../../api/user'
export function Register(props) {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [nameTip, setNameTip] = useState(false);
  const [passTip, setPassTip] = useState(false);
  const [passConfirmTip, setConfirmPassTip] = useState(false);
  const nameValid = useNameValidate(name);
  const passValid = usePasswordValidate(pass);
  const handleNameChange = e => {
    setName(e.target.value);
    setNameTip(false);
  };
  const handlePassChange = e => {
    setPass(e.target.value);
    setPassTip(false);
  };
  const handlePassConfirmChange = e => {
    setPassConfirm(e.target.value);
    setConfirmPassTip(false);
  };
  const submit = () => {
    if (!nameValid) {
      setNameTip(true);
      return 
    }
    if (!passValid) {
      setPassTip(true);
      return 
    }
    if(pass!==passConfirm){
        setConfirmPassTip(true)
        return 
    }
    register({
      name,pass
    }).then((res)=>{
      localStorage.setItem("api_master_token",res.token)
      props.history.push('/home/control')
    })
  };
  return (
    <>
      <Tooltip
        title="用户名仅可为2-10位的数字、汉字及英文字母"
        visible={nameTip}
      >
        <Input
          prefix={<Icon type="user" />}
          placeholder="Username"
          style={props.style}
          onChange={handleNameChange}
        />
      </Tooltip>
      <Tooltip title="密码仅可为6-16位的数字和字母" visible={passTip}>
        <Input
          prefix={<Icon type="lock" />}
          type="password"
          placeholder="Password"
          style={props.style}
          onChange={handlePassChange}
        />
      </Tooltip>
      <Tooltip title="两次输入的密码不一致" visible={passConfirmTip}>
        <Input
          prefix={<Icon type="lock" />}
          type="password"
          placeholder="Repeat Password"
          style={props.style}
          onChange={handlePassConfirmChange}
        />
      </Tooltip>
      <Button
        type="primary"
        htmlType="submit"
        onClick={submit}
        disabled={!name || !pass || !passConfirm}
      >
        注册
      </Button>
    </>
  );
}
