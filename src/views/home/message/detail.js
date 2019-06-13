import React from "react";
import { Button, Divider } from "antd";
import IconFont from "./../../../components/iconfont";
export function MessageDetail(props) {
  const { title, content } = props.mes;
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
        <p>2019 06 13 12:12</p>
      </div>
      <Divider />
      <div className="detail-content">{content}</div>
    </div>
  );
}
