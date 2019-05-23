import React from "react";
import {  Icon, Input, Button } from "antd";
export function Login(props) {
  return (
    <>
      <Input
        prefix={<Icon type="user"  />}
        placeholder="Username"
        style={props.style}
      />
      <Input
        prefix={<Icon type="lock"  />}
        type="password"
        placeholder="Password"
        style={props.style}
      />
      <Button type="primary" htmlType="submit" className="login-form-button">
        登录
      </Button>
    </>
  )
}



