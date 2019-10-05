import React, { useState, createContext, useContext, useEffect } from "react";
import { Button, Icon, Modal, Select, Table } from "antd";
import "react-mde/lib/styles/css/react-mde-all.css";
import "./apiCreate.scss";
import CreateMeta from "./createMeta";
import Request from "./request";
import Response from "./response";
import {
  addTestInstance,
  updateTestInstance,
  mockTest
} from "api/testInstance";
import { UserCtx } from "@/App";
import { SimpleModal } from "components";
import { getProjects } from "api/apiProject";
import { getApiInstances } from "api/apiInstance";
import checkUrl from "until/checkUrl";
const { Option } = Select;
const { Column } = Table;
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
  const [modalShow, setModalShow] = useState(false);
  const [apiList, setApiList] = useState([]); //api项目
  const [instance, setInstances] = useState([]);
  const [response, setResponse] = useState(null);
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
        updator: userInfo.name
      };
      if (props.mode === "new") {
        addTestInstance(data);
      } else {
        updateTestInstance({
          id: props.instance.id,
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
    getProjects({
      teamId: localStorage.getItem("teamId")
    }).then(res => {
      setApiList(res.list);
    }); //导入api文档信息
    if (props.mode === "new") return;
    const { header, param, url } = props.instance.request;
    setMeta(props.instance);
    setReqHeader(header);
    setReqParam(param);
    setReqUrl(url);
  }, []);
  const handleSelect = e => {
    if (e !== "0") {
      getApiInstances({
        projectId: e
      }).then(res => {
        setInstances(res.list);
      });
    }
  }; //导入文档选择
  const handleImport = info => {
    const { header, param, url } = info.request;
    setModalShow(false);
    setMeta(info);
    setReqHeader(header);
    setReqParam(param);
    setReqUrl(url);
  }; //导入api
  const handleTest = () => {
    if (!meta.url || !checkUrl(meta.url)) {
      Modal.error({
        title: "非法的url"
      });
      return;
    }
    const headers = {};
    const params = { ...reqParam };
    const urlParams = {};
    reqHeader.slice(0, reqHeader.length - 1).forEach(hea => {
      headers[hea.tag] = hea.content;
    });
    reqUrl.slice(0, reqHeader.length).forEach(url => {
      urlParams[url.name] = url.content;
    });
    const { paramType, detail } = reqParam;
    if (paramType !== "raw") {
      params.detail = {};
      detail.slice(0, detail.length - 1).forEach(item => {
        params.detail[item.name] = item.content;
      });
    }
    let start = new Date().getTime();
    mockTest({
      url: (meta.protocol || "http") + "://" + meta.url,
      method: meta.method,
      headers: headers,
      params: params,
      urlParams
    }).then(res => {
      setResponse({ ...res.res, time: new Date().getTime() - start });
    });
  };
  const options = apiList.map(item => {
    return (
      <Option value={item.id} key={item.id}>
        {item.name}
      </Option>
    );
  });
  const columnConfig = [
    {
      title: "APIs",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url"
    },
    {
      title: "操作",
      render: item => {
        return (
          <>
            <Button
              type="primary"
              className="right-10"
              onClick={() => handleImport(item)}
            >
              导入测试
            </Button>
          </>
        );
      }
    }
  ];
  const columns = columnConfig.map((column, index) => {
    return <Column key={index} {...column} />;
  });
  return (
    <div className="api-create">
      <div className="api-create-top">
        <div onClick={props.hide}>
          <Icon type="rollback" className="right-10" />
          <span>返回场景用例列表</span>
        </div>
        <Button type="primary" className="left-10" onClick={save}>
          保存
        </Button>
        {props.mode === "new" ? (
          <Button
            type="primary"
            className="left-10"
            onClick={() => {
              setModalShow(true);
            }}
          >
            导入
          </Button>
        ) : null}
        <Button type="primary" className="left-10" onClick={handleTest}>
          测试
        </Button>
      </div>
      <ApiCreateCtx.Provider
        value={{
          reqHeader,
          setReqHeader,
          reqParam,
          setReqParam,
          reqUrl,
          setReqUrl
        }}
      >
        <>
          <CreateMeta
            id={props.id}
            setMeta={setMeta}
            meta={meta}
            group={props.group}
          />
          <Request />

          {response ? <Response response={response} /> : null}
        </>
      </ApiCreateCtx.Provider>
      <SimpleModal
        title="从API文档导入"
        modalShow={modalShow}
        hide={() => setModalShow(false)}
      >
        <div className="import-from-api">
          <div className="from-project">
            <label>项目</label>
            <Select
              defaultValue="0"
              className="width-200 left-20 bottom-20"
              onSelect={e => handleSelect(e)}
            >
              <Option value="0">选择项目</Option>
              {options}
            </Select>
          </div>
          <Table
            rowKey="id"
            dataSource={instance}
            size="middle"
            pagination={{
              defaultPageSize: 5,
              showQuickJumper: true
            }}
          >
            {columns}
          </Table>
        </div>
      </SimpleModal>
    </div>
  );
}
