import React, { useState, createContext, useContext, useEffect } from 'react'
import { Tabs, Button, Icon, Modal } from 'antd'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'
import './apiCreate.scss'
import CreateMeta from './createMeta'
import Request from './request'
import Response from './response'
import Example from './example'
import { addApiInstance, getApiInfo,updateApi } from '../../../../../../api/apiInstance'
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
  const [reqHeader, setReqHeader] = useState([
    { key: Math.random(), isLast: true }
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
  const [successExample, setSuccess] = useState({
    code: 200,
    type: 'text/plain',
    content: ''
  })
  const [failExample, setFail] = useState({
    code: 404,
    type: 'text/html',
    content: 'not found'
  })
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
        response: {
          header: resHeader,
          param: resParam
        },
        result: {
          success: successExample,
          fail: failExample
        },
        description: detailDes,
        updator: userInfo.name
      }
      if(props.mode==='new'){
        addApiInstance(data)
      }else{
        updateApi({
          id: props.apiId,
          data: data
        })
      }
    } else {
      Modal.error({
        title: 'URI或名称不可为空'
      })
    }
  }
  useEffect(() => {
    if (props.mode === 'new') return
    getApiInfo({
      id: props.apiId
    }).then(res => {
      const {
        name,
        method,
        protocol,
        request,
        response,
        url,
        description,
        result,
        status,
        group_id
      } = res.info
      setMeta({ name, method, protocol, url,status,group_id })
      setDetailDes(description)
      setReqHeader(request.header)
      setReqParam(request.param)
      setReqUrl(request.url)
      setResHeader(response.header)
      setResParam(response.param)
      setSuccess(result.success)
      setFail(result.fail)
    })
  }, [props.apiId, props.mode])
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
              reqHeader,
              setReqHeader,
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
              <Example
                success={successExample}
                fail={failExample}
                setSuccess={setSuccess}
                setFail={setFail}
              />
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
