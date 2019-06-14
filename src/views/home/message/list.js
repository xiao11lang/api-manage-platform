import React from "react";
import { List } from "antd";
import IconFont from './../../../components/iconfont';
export function MessageList(props) {
  const list = props.mesList;
  const handleClick=(index)=>{
    props.showDetail();
    props.setMesIndex(index)
  }
  return (
    <>
      <List
        dataSource={list}
        style={{margin:'5px 10px 0'}}
        renderItem={item => {
          return <div onClick={()=>{handleClick(item.index)}} style={{border:'1px solid #e8e8e8',marginBottom:10,padding:'0 10px',borderRadius:4}}><List.Item style={{display:'flex',justifyContent:'space-between'}}>{item.title}<IconFont type='iconguanbi'/></List.Item></div>;
        }}
      />
    </>
  );
}
