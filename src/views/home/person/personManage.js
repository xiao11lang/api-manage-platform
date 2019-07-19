import React, { createRef, useState } from "react";
import { Redirect } from "react-router-dom";
import { Tabs, Button, Icon, Modal, Input } from "antd";
import { AllPerson } from "./allPerson";
import { ApplyPerson } from "./applyPerson";
import { inviteMessage } from "../../../api/message";

const { TabPane } = Tabs;
export function PersonManage(props) {
  const input = createRef();
  const [activeKey, setActiveKey] = useState("1");
  const [modalShow, setModalShow] = useState(false);
  const [name, setName] = useState("");
  const handleCopy = () => {
    input.current.select();
    document.execCommand("copy");
  };
  const handleInvite = () => {
    inviteMessage({
      name: name.replace(/\s/g, ""),
      teamName: props.teamInfo.name,
      teamId: props.teamInfo.id,
      fromName: props.userInfo.name,
      fromId:props.userInfo.id
    }).then(()=>{
      setModalShow(false)
    });
  };
  const handleInput = e => {
    setName(e.target.value);
  };
  return (
    <>
      {props.showExtraRoute ? (
        <>
          <div className="person-manage-top">
            <h2 style={{ fontWeight: "bold" }}>人员管理</h2>
            <p>
              <b>TeamId</b>
              <input
                className="link"
                readOnly
                defaultValue={props.teamInfo.unique_id}
                ref={input}
                style={{ margin: "0 10px", width: 350, border: "none" }}
              />
              <Button size="small" onClick={handleCopy}>
                复制
              </Button>
            </p>
            <div>
              <Button
                type="primary"
                onClick={() => {
                  setModalShow(true);
                }}
              >
                <Icon type="plus" />
                邀请
              </Button>
            </div>
          </div>
          <Tabs
            defaultActiveKey="1"
            onChange={key => {
              setActiveKey(key);
            }}
          >
            <TabPane tab="全部" key="1">
              {props.teamInfo.id ? (
                <AllPerson activeKey={activeKey} teamId={props.teamInfo.id} />
              ) : null}
            </TabPane>
            <TabPane tab="申请" key="2">
              {props.teamInfo.id ? (
                <ApplyPerson activeKey={activeKey} teamId={props.teamInfo.id} />
              ) : null}
            </TabPane>
          </Tabs>
          <Modal
            visible={modalShow}
            okText="确定"
            cancelText="取消"
            onCancel={() => setModalShow(false)}
            closable={false}
            title="邀请加入我的工作组"
            onOk={() => {
              handleInvite();
            }}
          >
            <Input
              placeholder="请输入对方用户名"
              value={name}
              onChange={e => handleInput(e)}
            />
          </Modal>
        </>
      ) : (
        <Redirect to="/home/control" />
      )}
    </>
  );
}
