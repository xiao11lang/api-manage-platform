import React from "react";
import { Button, Divider } from "antd";
import IconFont from "./../../../components/iconfont";
export function MessageDetail(props) {
  const { title, content,createdAt } = props.mes;
  const time=new Date(createdAt).toLocaleString()
  return (
    <div className="message-detail">
      <div className="detail-top">
        <Button style={{ marginRight: 16 }} onClick={props.hideDetail}>
          <IconFont type="iconfanhui2" />
          返回
        </Button>
        <Button>
          <IconFont type="iconshanchu" />
          删除
        </Button>
      </div>
      <Divider />
      <div className="detail-title">
        <p>{title}</p>
        <p>{time}</p>
      </div>
      <Divider />
      <div className="detail-content">{content}</div>
    </div>
  );
}
