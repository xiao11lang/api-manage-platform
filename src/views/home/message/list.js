import React,{useEffect,useState} from "react";
import { List } from "antd";
import IconFont from "./../../../components/iconfont";
import { changeMesState,deleteMes,getMessageList } from "./../../../api/message";
export function MessageList(props) {
  const [list,setList]=useState([])
  const handleClick = item => {
    props.showDetail();
    props.setMesDetail(list[item.index]);
    if(!item.hasRead){
      changeMesState({ id: item.id }).then(()=>{
        props.setUnRead(props.unRead-1)
      })
    }
  };
  const handleDelete=(e,item)=>{
    e.stopPropagation()
    deleteMes({id:item.id}).then(()=>{
      if(!item.hasRead){
        props.setUnRead(props.unRead-1)
      }
      let curList=list.filter((mes)=>{
        return mes.id!==item.id
      })
      setList(curList)
    })
  }
  useEffect(()=>{
    getMessageList({
      type:props.type
    }).then((res)=>{
      setList(res.list)
    })
  },[props.type])
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
                <div onClick={(e)=>{handleDelete(e,item)}}><IconFont type="iconguanbi" /></div>
              </List.Item>
            </div>
          );
        }}
      />
    </>
  );
}
