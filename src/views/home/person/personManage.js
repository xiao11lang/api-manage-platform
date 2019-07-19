import React, { createRef, useState } from "react";
import { Redirect } from "react-router-dom";
import { Tabs, Button, Icon } from "antd";
import { AllPerson } from "./allPerson";
import { ApplyPerson } from "./applyPerson";
const { TabPane } = Tabs;
export function PersonManage(props) {
  const input = createRef();
  const [activeKey, setActiveKey] = useState("1");
  const handleCopy = () => {
    input.current.select();
    document.execCommand("copy");
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
              <Button type="primary">
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
        </>
      ) : (
        <Redirect to="/home/control" />
      )}
    </>
  );
}
