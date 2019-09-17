import React, { useState, createContext, useContext, useEffect } from "react";
import { Button, Icon, Modal } from "antd";
import "react-mde/lib/styles/css/react-mde-all.css";
import "./apiCreate.scss";
import CreateMeta from "./createMeta";
import Request from "./request";
import { addApiInstance, getApiInfo, updateApi } from "api/apiInstance";
import { UserCtx } from "@/App";
export const ApiCreateCtx = createContext({});
export default function ApiCreate(props) {
  const { userInfo } = useContext(UserCtx);
  const [meta, setMeta] = useState({});
  const [reqHeader, setReqHeader] = useState([
    { key: Math.random(), isLast: true }
  ]);
  const [reqParam, setReqParam] = useState({
    paramType: "form-data",
    jsonRootType: "object",
    detail: [{ key: Math.random(), isRoot: true, isLast: true }]
  });
  const [reqUrl, setReqUrl] = useState([
    {
      key: Math.random(),
      isLast: true
    }
  ]);
  
  const [detailDes, setDetailDes] = useState("");
  const save = () => {
    if (meta.url && meta.name) {
      const data = {
        projectId: props.id,
        meta: meta,
        request: {
          header: reqHeader,
          param: reqParam,
          url: reqUrl
        },
        description: detailDes,
        updator: userInfo.name
      };
      if (props.mode === "new") {
        addApiInstance(data);
      } else {
        updateApi({
          id: props.apiId,
          data: data
        });
      }
    } else {
      Modal.error({
        title: "URI或名称不可为空"
      });
    }
  };
  useEffect(() => {
    if (props.mode === "new") return;
    getApiInfo({
      id: props.apiId,
      parse: false
    }).then(res => {
      const {
        name,
        method,
        protocol,
        request,
        url,
        description,
        status,
        group_id
      } = res.info;
      setMeta({ name, method, protocol, url, status, group_id });
      setDetailDes(description);
      setReqHeader(request.header);
      setReqParam(request.param);
      setReqUrl(request.url);
    });
  }, [props.apiId, props.mode]);
  return (
    <div className="api-create">
      <div className="api-create-top">
        <div onClick={props.hide}>
          <Icon type="rollback" className="right-10" />
          <span>返回API列表</span>
        </div>
        <Button type="primary" className="left-10" onClick={save}>
          保存
        </Button>
      </div>
      <ApiCreateCtx.Provider
        value={{
          reqHeader,
          setReqHeader,
          reqParam,
          setReqParam,
          reqUrl,
          setReqUrl,
        }}
      >
        <>
          <CreateMeta id={props.id} setMeta={setMeta} meta={meta} />
          <Request />
        </>
      </ApiCreateCtx.Provider>
    </div>
  );
}
