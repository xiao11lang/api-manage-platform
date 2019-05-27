import React from "react";
import { Button, Input, Icon, Select, Row, Col, Upload } from "antd";
const Option = Select.Option;
function InfoRow(props) {
  const style = props.style
    ? Object.assign({}, props.style, { paddingLeft: 20 })
    : { paddingLeft: 20 };
  return (
    <>
      <Row align="middle" type="flex" style={style}>
        {props.children}
      </Row>
    </>
  );
}
export function SelfInfo() {
  return (
    <>
      <InfoRow style={{ margin: "20px 0" }}>
        <Col span={6}>
          <span>头像</span>
        </Col>
        <Col span={18}>
          <Icon type="user" style={{ marginRight: 20 }}/>
          <Upload>
            <Button type="primary" >
              更换头像
            </Button>
          </Upload>
        </Col>
      </InfoRow>
      <InfoRow style={{ marginBottom: 20 }}>
        <Col span={6}>
          <span>姓名</span>
        </Col>
        <Col span={18}>
          <Input placeholder="小食蚁螂" style={{ width: 250 }} />
        </Col>
      </InfoRow>
      <InfoRow>
        <Col span={6}>
          <span>性别</span>
        </Col>
        <Col span={18}>
          <Select defaultValue="male" style={{ width: 250 }}>
            <Option value="male">男</Option>
            <Option value="female">女</Option>
            <Option value="unkoown">未知</Option>
          </Select>
        </Col>
      </InfoRow>
    </>
  );
}
