import React, { useState } from "react";
import { Icon, Input, Button, Tooltip } from "antd";
import { useNameValidate, usePasswordValidate } from "./validate";
import { login } from "../../api/user";
export function Login(props) {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [nameTip, setNameTip] = useState(false);
  const [passTip, setPassTip] = useState(false);
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
  const submit = () => {
    if (!nameValid) {
      setNameTip(true);
      return;
    }
    if (!passValid) {
      setPassTip(true);
      return;
    }
    login({
      name: name,
      pass: pass
    }).then((res) => {
      localStorage.setItem('api_master_token',res.token)
      props.setLoginState(true);
      props.history.push("/home/control");
    });
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
      <Button type="primary" onClick={submit} disabled={!name || !pass}>
        登录
      </Button>
    </>
  );
}
