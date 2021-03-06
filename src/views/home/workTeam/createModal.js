import React, { useState } from "react";
import "./workTeam.scss";
import { Modal, Card, Button, Input } from "antd";
import IconFont from "./../../../components/iconfont";
import { checkExist, initTeam } from "../../../api/workTeam";
import { useTeamChange } from "../../../hooks/useTeamChange";
import { addApply } from "../../../api/apply";

export function CreateModal(props) {
  const [selectKey, setSelectKey] = useState("create"); //选中的为新建或加入
  const [btnDisabled, setBtnDisabled] = useState(false); //确认按钮是否可用
  const [show, setShow] = useState(false); //是否展示查询工作组id的组件
  const [teamId, setTeamId] = useState(""); //工作组id值
  const [applyInfo, setApplyInfo] = useState({});
  const handleTeamChange = useTeamChange();
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
  const checkTeamExist = () => {
    checkExist({
      id: teamId
    }).then(res => {
      setApplyInfo(res);
      setBtnDisabled(false);
    });
  };
  const handleInput = e => {
    setTeamId(e.target.value);
  };
  const submit = () => {
    if (selectKey === "create") {
      initTeam().then(res => {
        props.setCreateVisible(false);
        props.setTeamInfo(res.info);
        handleTeamChange(res.info.id);
      });
    } else {
      if(props.teamInfo.unique_id===teamId.replace(/\s/g,'')){
        Modal.error({
          title:'错误',
          content:'不可申请加入自己的工作组'
        })
        return 
      }
      addApply({
        fromId: props.fromId,
        teamId: applyInfo.id,
        masterId: applyInfo.masterId
      }).then(()=>{
        props.setCreateVisible(false);
      });
    }
  };
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
            <Button type="primary" disabled={btnDisabled} onClick={submit}>
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
          <Card className="join-team top-10">
            <p className="title">[加入] 一个现有的工作空间</p>
            <Input placeholder="请输入工作组id" onInput={handleInput} />
            <Button
              type="primary"
              className='top-10'
              onClick={checkTeamExist}
            >
              查询
            </Button>
          </Card>
        ) : null}
      </Modal>
    </>
  );
}
