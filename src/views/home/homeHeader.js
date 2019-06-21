import React,{useContext,useState} from "react";
import { Layout, Row, Col, Button, Badge, Avatar, Dropdown } from "antd";
import { Account } from "./accountMenu";
import {UserCtx} from '../../App'
import {CreateModal} from './workTeam/createModal'
const { Header } = Layout;
export function HomeHeader(props) {
  const {userInfo,teamInfo}=useContext(UserCtx)
  const [createVisible, setCreateVisible] = useState(false)
  const handleClick=({key})=>{
    if(key==='0'){
      props.setMessageKey('1')
    }
  }
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
              {`工作组${teamInfo.name}`}
            </Button>
          </Col>
          <Col span={10} style={{ textAlign: "center" }}>
            <Dropdown overlay={<Account handleClick={handleClick}/>}>
              <span onClick={()=>{setCreateVisible(true)}}>
                <Badge count={props.unRead}>
                  <Avatar shape="round" icon="user" />
                </Badge>
                <Button type="link">{userInfo.name}</Button>
              </span>
            </Dropdown>
          </Col>
        </Row>
      </Header>
      <CreateModal createVisible={createVisible} setCreateVisible={setCreateVisible}/>
    </>
  );
}
