import React from 'react'
import {  Icon, Input, Button } from "antd";
export function Register(props){
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
          <Input
            prefix={<Icon type="lock"  />}
            type="password"
            placeholder="Repeat Password"
            style={props.style}
          />
          <Button type="primary" htmlType="submit" >
            注册
          </Button>
        </>
      );
}