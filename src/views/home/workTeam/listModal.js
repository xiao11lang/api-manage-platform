import React from "react";
import { Modal, Icon } from "antd";
import "./workTeam.scss";
import { changeWorkTeam } from "./../../../api/user";
import { useTeamChange } from "../../../hooks/useTeamChange";
export function ListModal(props) {
  const setCreateShow = () => {
    props.setListVisible(false);
    props.setCreateVisible(true);
  };
  const handleTeamChange=useTeamChange()
  const switchTeam = team => {
    changeWorkTeam({ teamId: team.id }).then(() => {
      props.setListVisible(false);
      props.setTeamInfo(team);
      handleTeamChange(team.id)
    });
  };
  return (
    <>
      <Modal
        className="workspace"
        visible={props.listVisible}
        footer={null}
        title="切换工作组"
        onCancel={() => {
          props.setListVisible(false);
        }}
      >
        {props.teamList.map((team, index) => {
          return (
            <div key={index} onClick={() => switchTeam(team)}>
              <Icon type="check" style={{ margin: "0 20px" }} />
              <span>工作组 {team.name}</span>
            </div>
          );
        })}
        <div onClick={setCreateShow}>
          <Icon type="plus" style={{ margin: "0 20px" }} />
          <span>新建/加入工作组</span>
        </div>
      </Modal>
    </>
  );
}
