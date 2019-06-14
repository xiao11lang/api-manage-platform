import React from "react";
import { List } from "antd";
import IconFont from "./../../../components/iconfont";
import { changeMesState } from "./../../../api/message";
export function MessageList(props) {
  const list = props.mesList;
  const handleClick = item => {
    props.showDetail();
    props.setMesIndex(item.index);
    changeMesState({ id: item.id });
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
                border: "1px solid #e8e8e8",
                marginBottom: 10,
                padding: "0 10px",
                borderRadius: 4,
                background:item.hasRead?'':'rgb(232,232,232)'
              }}
            >
              <List.Item
                style={{ display: "flex", justifyContent: "space-between" }}
              >
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
