import React, { useContext, useState,useEffect } from "react";
import { Layout, Row, Col, Button, Badge, Avatar, Dropdown } from "antd";
import { Account } from "./accountMenu";
import { UserCtx } from "../../App";
import { CreateModal } from "./workTeam/createModal";
import { ListModal } from "./workTeam/listModal";
import { getTeamList } from "../../api/workTeam";
import { getTeamInfo } from './../../api/workTeam';
const { Header } = Layout;
export function HomeHeader(props) {
  const { userInfo} = useContext(UserCtx);
  const [teamInfo,setTeamInfo]=useState({})
  const [createVisible, setCreateVisible] = useState(false);
  const [listVisible, setListVisible] = useState(false);
  const [teamList, setTeamList] = useState([]);
  useEffect(() => {
    getTeamInfo().then(res => {
      setTeamInfo(res.info);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClick = ({ key }) => {
    if (key === "0") {
      props.setMessageKey("1");
    }
  };
  const showList = () => {
    getTeamList().then(res => {
      setListVisible(true);
      setTeamList(res.list);
    });
  };
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
              onClick={showList}
            >
              {`工作组${teamInfo.name}`}
            </Button>
          </Col>
          <Col span={10} style={{ textAlign: "center" }}>
            <Dropdown overlay={<Account handleClick={handleClick} />}>
              <span>
                <Badge count={props.unRead}>
                  <Avatar shape="round" icon="user" />
                </Badge>
                <Button type="link">{userInfo.name}</Button>
              </span>
            </Dropdown>
          </Col>
        </Row>
      </Header>
      <CreateModal
        createVisible={createVisible}
        setCreateVisible={setCreateVisible}
        setTeamInfo={setTeamInfo}
      />
      <ListModal
        listVisible={listVisible}
        setListVisible={setListVisible}
        teamInfo={teamInfo}
        setCreateVisible={setCreateVisible}
        teamList={teamList}
        setTeamInfo={setTeamInfo}
      />
    </>
  );
}
