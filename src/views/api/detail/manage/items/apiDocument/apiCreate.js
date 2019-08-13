import React, { useState, createContext, useReducer, useContext } from 'react'
import { Tabs, Button, Icon, Modal } from 'antd'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'
import './apiCreate.scss'
import CreateMeta from './createMeta'
import Request from './request'
import Response from './response'
import Example from './example'
import { addApiInstance } from '../../../../../../api/apiInstance'
import { requestHeaderReducer } from '../../../../../../reducer/requestHeaderReducer'
import { UserCtx } from './../../../../../../App'
const { TabPane } = Tabs
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
})
export const ApiCreateCtx = createContext({})
export default function ApiCreate(props) {
  const { userInfo } = useContext(UserCtx)
  const [meta, setMeta] = useState({})
  const [selectedTab, setSelectedTab] = React.useState('write')
  const [headerList, dispatch] = useReducer(requestHeaderReducer, [
    { key: Math.random(), last: true }
  ])
  const [reqParam, setReqParam] = useState({
    paramType: 'form-data',
    jsonRootType: 'object',
    detail: [{ key: Math.random(), isRoot: true, isLast: true }]
  })
  const [reqUrl, setReqUrl] = useState([
    {
      key: Math.random(),
      isLast: true
    }
  ])
  const [resHeader, setResHeader] = useState([
    { key: Math.random(), isLast: true }
  ])
  const [resParam, setResParam] = useState({
    paramType: 'json',
    jsonRootType: 'object',
    detail: [{ key: Math.random(), isRoot: true, isLast: true }]
  })
  const [detailDes, setDetailDes] = useState('')
  const successExample = {
    code: 200,
    type: 'text/plain',
    content: ''
  }
  const failExample = {
    code: 404,
    type: 'text/html',
    content: ''
  }
  const save = () => {
    if (meta.url && meta.name) {
      const data = {
        projectId: props.id,
        meta: meta,
        request: {
          header: headerList.slice(0, headerList.length - 1),
          param:
            reqParam.paramType !== 'raw'
              ? {
                  ...reqParam,
                  detail: reqParam.detail.slice(0, reqParam.detail.length - 1)
                }
              : reqParam,
          url: reqUrl.slice(0, reqUrl.length - 1)
        },
        response: {
          header: resHeader.slice(0, resHeader.length - 1),
          param:
            resParam.paramType !== 'raw'
              ? {
                  ...resParam,
                  detail: resParam.detail.slice(0, resParam.detail.length - 1)
                }
              : resParam
        },
        result: {
          success: successExample,
          fail: failExample
        },
        description: detailDes,
        updator: userInfo.name
      }
      addApiInstance(data)
    } else {
      Modal.error({
        title: 'URI或名称不可为空'
      })
    }
  }
  return (
    <div className="api-create">
      <div className="api-create-top">
        <div onClick={props.hide}>
          <Icon type="rollback" style={{ marginRight: 10 }} />
          <span>返回API列表</span>
        </div>
        <Button type="primary" style={{ marginLeft: 10 }} onClick={save}>
          保存
        </Button>
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="API文档" key="1">
          <ApiCreateCtx.Provider
            value={{
              headerList,
              dispatch,
              reqParam,
              setReqParam,
              reqUrl,
              setReqUrl,
              resHeader,
              setResHeader,
              resParam,
              setResParam
            }}
          >
            <>
              <CreateMeta id={props.id} setMeta={setMeta} meta={meta} />
              <Request />
              <Response />
              <Example success={successExample} fail={failExample} />
            </>
          </ApiCreateCtx.Provider>
        </TabPane>
        <TabPane tab="详细说明" key="2">
          <ReactMde
            value={detailDes}
            onChange={setDetailDes}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            l18n={{ write: '编辑', preview: '预览' }}
            generateMarkdownPreview={markdown =>
              Promise.resolve(converter.makeHtml(markdown))
            }
          />
        </TabPane>
      </Tabs>
    </div>
  )
}
