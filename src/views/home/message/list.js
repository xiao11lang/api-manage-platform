import React from "react";
import { List } from "antd";
import IconFont from "./../../../components/iconfont";
import {
  changeMesState,
  deleteMes,
  getMessageList
} from "./../../../api/message";
export function MessageList(props) {
  const list=props.mesList[props.type].list
  const handleClick = item => {
    props.showDetail();
    props.setMesDetail(Object.assign({}, list[item.index]));
    if (!item.hasRead) {
      changeMesState({ id: item.id }).then(() => {
        props.setUnRead(props.unRead - 1);
      });
    }
  };
  const handleDelete = (e, item) => {
    e.stopPropagation();
    deleteMes({ id: item.id }).then(() => {
      if (!item.hasRead) {
        props.setUnRead(props.unRead - 1);
      }
      let curList = list.filter(mes => {
        return mes.id !== item.id;
      });
      props.setMesList(curList);
    });
  };
  // useEffect(() => {
  //   if (props.allRead) {
  //     const curList = list.map(mes => {
  //       return Object.assign({}, mes, { hasRead: 1 });
  //     });
  //     props.setMesList(curList);
  //   }
  // }, [props.allRead]);
  // useEffect(() => {
  //   if (props.allDelete) {
  //     let count = 0;
  //     list.forEach(mes => {
  //       if (!mes.hasRead) {
  //         count = count + 1;
  //       }
  //     }, 0);
  //     props.setUnRead(props.unRead - count);
  //     props.setMesList([]);
  //   }
  // }, [props.allDelete]);
  // useEffect(() => {
  //   if (props.deleteIndex !== "") {
  //     let curList = list.filter((mes, index) => {
  //       return index !== props.deleteIndex;
  //     });
  //     props.setMesList(curList);
  //   }
  // }, [props.deleteIndex]);
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
                <div
                  onClick={e => {
                    handleDelete(e, item);
                  }}
                >
                  <IconFont type="iconguanbi" />
                </div>
              </List.Item>
            </div>
          );
        }}
      />
    </>
  );
}
