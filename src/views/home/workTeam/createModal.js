import React, { useState } from "react";
import "./workTeam.scss";
import { Modal, Card, Button, Input } from "antd";
import IconFont from "./../../../components/iconfont";
import { checkExist } from "../../../api/workTeam";
export function CreateModal(props) {
  const [selectKey, setSelectKey] = useState("create");
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [show, setShow] = useState(false);
  const [teamId,setTeamId]=useState('')
  const handleCreate = () => {
    setSelectKey("create");
    setShow(false);
    setBtnDisabled(false);
  };
  const handleJoin = () => {
    setSelectKey("join");
    setShow(true);
    setBtnDisabled(true);
  };
  const checkTeamExist=()=>{
    checkExist({
      id:teamId
    }).then(()=>{
      setBtnDisabled(false)
    })
  }
  const handleInput=(e)=>{
    setTeamId(e.target.value)
  }
  return (
    <>
      <Modal
        className="create-workspace"
        visible={props.createVisible}
        title="切换/加入工作组"
        closable={false}
        footer={
          <div>
            <Button
              type="default"
              onClick={() => {
                props.setCreateVisible(false);
              }}
            >
              取消
            </Button>
            <Button type="primary" disabled={btnDisabled}>
              确认
            </Button>
          </div>
        }
      >
        <Card className="create-team">
          <div onClick={handleCreate}>
            <p className="title">[新建] 一个新的工作空间</p>
            <p className="middle">
              <span>
                适合团队负责人、项目负责人、或者初次使用API Master的用户。
              </span>
              <IconFont
                type="iconxuanzhong"
                style={{
                  color: selectKey === "create" ? "#1890ff" : "rgba(0,0,0,.65)",
                  fontSize: 20
                }}
              />
            </p>
            <p>创建工作空间之后，您将成为该工作空间的最高管理员。</p>
          </div>
        </Card>
        <Card className="join-team">
          <div onClick={handleJoin}>
            <p className="title">[加入] 一个现有的工作空间</p>
            <p className="middle">
              <span>适合开发人员、测试等协作成员。</span>
              <IconFont
                type="iconxuanzhong"
                style={{
                  color: selectKey !== "create" ? "#1890ff" : "rgba(0,0,0,.65)",
                  fontSize: 20
                }}
              />
            </p>
            <p>创建工作空间之后，您将成为该工作空间的最高管理员。</p>
          </div>
        </Card>
        {show ? (
          <Card className="join-team" style={{ marginTop: 10 }}>
            <p className="title">[加入] 一个现有的工作空间</p>
            <Input placeholder="请输入工作组id" onInput={handleInput}/>
            <Button type='primary' style={{marginTop:10}} onClick={checkTeamExist}>查询</Button>
          </Card>
        ) : null}
      </Modal>
    </>
  );
}
