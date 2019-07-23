import React, { useState } from "react";
import { Modal, Layout, Menu, Button, Dropdown } from "antd";
import IconFont from "./../../../components/iconfont";
import { MessageList } from "./list";
import { MessageDetail } from "./detail";
import "./message.scss";
import { setAllMesRead ,deleteAllMes} from "../../../api/message";
const { Sider, Content } = Layout;
const MenuAction = (props) => {
  const readAll=()=>{
    setAllMesRead({type:props.type}).then((res)=>{
      props.setUnRead(props.unRead-res.affectedCount)
      props.setAllRead(props.type)
    })
  }
  const deleteAll=()=>{
    deleteAllMes({type:props.type}).then((res)=>{
      props.setAllDelete(props.type)
    })
  }
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item><div onClick={readAll}>全部已读</div></Menu.Item>
          <Menu.Item><div onClick={deleteAll}>全部删除</div></Menu.Item>
        </Menu>
      }
    >
      <IconFont type="icongengduo" />
    </Dropdown>
  );
};
export function MessageModal(props) {
  const [key, setKey] = useState(props.mesKey);
  const [detailShow, setDetailShow] = useState(false);
  const [mesDetail,setMesDetail]=useState({})
  const [allRead,setAllRead]=useState('')
  const [allDelete,setAllDelete]=useState('')
  const [deleteIndex,setDeleteIndex]=useState('')
  const typeArr = ["official", "project", "person"];
  const handleClick = ({ key }) => {
    setDetailShow(false);
    setKey(key);
  };
  const itemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };
  return (
    <>
      <Modal
        title="消息管理"
        visible={true}
        footer={<Button onClick={props.hide}>关闭</Button>}
        className="messageModal"
        closable={false}
        destroyOnClose={true}
        style={{ height: 500 }}
      >
        <Layout style={{ height: "100%" }}>
          <Sider theme="light" style={{ height: "100%" }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[props.mesKey]}
              onClick={handleClick}
            >
              <Menu.Item key="1" style={itemStyle}>
                <span>官方通知</span>
                <MenuAction type='official' setUnRead={props.setUnRead} unRead={props.unRead} setAllRead={setAllRead} setAllDelete={setAllDelete}/>
              </Menu.Item>
              <Menu.Item key="2" style={itemStyle}>
                <span>项目通知</span>
                <MenuAction type='project' setUnRead={props.setUnRead} unRead={props.unRead} setAllRead={setAllRead} setAllDelete={setAllDelete}/>
              </Menu.Item>
              <Menu.Item key="3" style={itemStyle}>
                <span>人员通知</span>
                <MenuAction type='person' setUnRead={props.setUnRead} unRead={props.unRead} setAllRead={setAllRead} setAllDelete={setAllDelete}/>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ height: "100%" }}>
            {detailShow ? (
              <MessageDetail
                mes={mesDetail}
                hideDetail={() => setDetailShow(false)}
                setIndex={setDeleteIndex}
              />
            ) : (
              <MessageList
                showDetail={() => setDetailShow(true)}
                setMesDetail={setMesDetail}
                setUnRead={props.setUnRead}
                unRead={props.unRead}
                type={typeArr[key-1]}
                allRead={allRead}
                allDelete={allDelete}
                deleteIndex={deleteIndex}
                mesList={props.mesList}
                setMesList={props.setMesList}
              />
            )}
          </Content>
        </Layout>
      </Modal>
    </>
  );
}
