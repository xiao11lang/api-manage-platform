import React from "react";
import { List } from "antd";
import IconFont from "./../../../components/iconfont";
import { changeMesState } from "./../../../api/message";
export function MessageList(props) {
  const list = props.mesList;
  const handleClick = item => {
    props.showDetail();
    props.setMesIndex(item.index);
    if(!item.hasRead){
      changeMesState({ id: item.id }).then(()=>{
        props.setUnRead(props.unRead-1)
      })
    }
  };
  return (
    <>
      <List
        dataSource={list}
        style={{ margin: "5px 10px 0" }}
        renderItem={item => {
          return (
            <div
              onClick={() => {
                handleClick(item);
              }}
              style={{
                background: item.hasRead ? "" : "rgb(232,232,232)"
              }}
              className="message-list-con"
            >
              <List.Item>
                {item.title}
                <IconFont type="iconguanbi" />
              </List.Item>
            </div>
          );
        }}
      />
    </>
  );
}
