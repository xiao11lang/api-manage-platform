import React from "react";
import {
  Layout,
  Row,
  Col,
  Button,
  Badge,
  Avatar,
  Dropdown
} from "antd";
import {Account} from './accountMenu'
const { Header } = Layout;
export function HomeHeader(props){
    return (
        <>
        <Header style={{ background: "#fff", paddingLeft: 20 }}>
            <Row>
              <Col span={4}>
                <Button
                  icon={props.collapse ? "menu-unfold" : "menu-fold"}
                  onClick={props.toggle}
                  type="link"
                >
                  {props.collapse ? "展开" : "收起"}
                </Button>
              </Col>
              <Col span={10} style={{ textAlign: "center" }}>
                <Button
                  icon="user"
                  type="link"
                  onClick={() => {
                    props.setModalVisible(true);
                  }}
                >
                  工作组
                </Button>
              </Col>
              <Col span={10} style={{ textAlign: "center" }}>
                <Dropdown overlay={Account}>
                  <span>
                    <Badge count={1}>
                      <Avatar shape="round" icon="user" />
                    </Badge>
                    <Button
                      type="link"
                    >
                      小食蚁螂
                    </Button>
                  </span>
                </Dropdown>
              </Col>
            </Row>
          </Header>
        </>
    )
}