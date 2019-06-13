import React from "react";
import { List } from "antd";
import IconFont from './../../../components/iconfont';
export function MessageList(props) {
  const list = props.mesList;
  return (
    <>
      <List
        dataSource={list}
        bordered
        style={{margin:'5px 10px 0'}}
        renderItem={item => {
          return <div onClick={props.showDetail}><List.Item style={{display:'flex',justifyContent:'space-between'}}>{item.title}<IconFont type='iconguanbi'/></List.Item></div>;
        }}
      />
    </>
  );
}
