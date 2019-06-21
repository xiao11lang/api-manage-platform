import React from "react";
import { Modal, Icon } from "antd";
import "./workTeam.scss";
export function ListModal(props) {
  const setCreateShow = () => {
    props.setListVisible(false);
    props.setCreateVisible(true);
  };
  const switchTeam=(team)=>{
      props.setListVisible(false)
      props.setTeamInfo(team)
  }
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
        destroyOnClose={true}
      >
        {props.teamList.map(team => {
          return (
            <div key={team.id} onClick={()=>switchTeam(team)}>
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
