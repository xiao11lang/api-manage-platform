import React from "react";
import { Tabs } from "antd";
const { TabPane } = Tabs;
function Body(props) {
  const size =
    props.headers && (props.headers["content-length"] / 1024).toFixed(2);
  const style = {
    backgroundColor: props.code < 300 ? "#1890ff" : "#cf1322"
  };
  return (
    <div className="test-response-body left-20 right-20">
      <div className="status-code-con top-10 " style={style}>
        <span>{props.code}</span>
        <span>Size:{size}kb</span>
        <span>Time:{props.time}ms</span>
      </div>
      <div className="">{props.body}</div>
    </div>
  );
}
function ResponseHeaders(props) {
  return Object.entries(props.headers).map(header => {
    return (
      <div key={header[0]} className="left-20">
        <span style={{ color: "#999" }}>{header[0]} : </span>
        <span>{header[1]}</span>
      </div>
    );
  });
}
export default function Response(props) {
  const { body, statusCode, time, headers } = props.response;
  return (
    <Tabs className="api-create-request" defaultActiveKey="1">
      <TabPane tab="返回内容" key="1">
        <Body body={body} code={statusCode} time={time} headers={headers} />
      </TabPane>
      <TabPane tab="响应头" key="2">
        <ResponseHeaders headers={headers} />
      </TabPane>
    </Tabs>
  );
}
