import React, { useContext, useState, useEffect } from "react";
import { Layout, Row, Col, Button, Badge, Avatar, Dropdown } from "antd";
import { Account } from "./accountMenu";
import { UserCtx } from "../../App";
import { CreateModal } from "./workTeam/createModal";
import { ListModal } from "./workTeam/listModal";
import { getTeamList } from "../../api/workTeam";
const { Header } = Layout;
export function HomeHeader(props) {
  const { userInfo } = useContext(UserCtx);
  const { teamInfo, setTeamInfo } = props;
  const [createVisible, setCreateVisible] = useState(false);
  const [listVisible, setListVisible] = useState(false);
  const { teamList, setTeamList } = props;
  useEffect(() => {
    if (userInfo.workTeamId) {
      getTeamList({ teamId: userInfo.workTeamId }).then(res => {
        setTeamList(res.list);
        setTeamInfo(res.list[0]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);
  const handleClick = ({ key }) => {
    if (key === "0") {
      props.setMessageKey("1");
    } else if (key === "1") {
      props.setAccountShow(true);
    } else {
      sessionStorage.setItem("api_master_token", "");
      window.location.assign("/");
    }
  };
  const showList = () => {
    getTeamList({ teamId: userInfo.workTeamId }).then(res => {
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
            <Button icon="user" type="link" onClick={showList}>
              {`工作组${teamInfo && teamInfo.name ? teamInfo.name : ""}`}
            </Button>
          </Col>
          <Col span={10} style={{ textAlign: "center" }}>
            <Dropdown overlay={<Account handleClick={handleClick} />}>
              <span>
                <Badge count={props.unRead}>
                  <Avatar shape="round" src={userInfo.avatar} />
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
        unRead={props.unRead}
        setUnRead={props.setUnRead}
        fromId={userInfo.id}
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
