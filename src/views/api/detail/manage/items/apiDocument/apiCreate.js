import React, { useState, createContext, useReducer } from 'react'
import { Tabs, Button, Icon, Modal } from 'antd'
import ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde-all.css'
import './apiCreate.scss'
import CreateMeta from './createMeta'
import Request from './request'
import { addApiInstance } from '../../../../../../api/apiInstance'
import { requestHeaderReducer } from '../../../../../../reducer/requestHeaderReducer'
const { TabPane } = Tabs
export const ApiCreateCtx = createContext({})
export default function ApiCreate(props) {
  const [value, setValue] = React.useState('')
  const [meta, setMeta] = useState({})
  const [selectedTab, setSelectedTab] = React.useState('write')
  const [headerList, dispatch] = useReducer(requestHeaderReducer, [
    { key: Math.random(), last: true }
  ])
  const save = () => {
    console.log(headerList)
    if (meta.url && meta.name) {
      addApiInstance({
        meta: meta
      })
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
          <ApiCreateCtx.Provider value={{ headerList, dispatch }}>
            <>
              <CreateMeta id={props.id} setMeta={setMeta} meta={meta} />
              <Request   />
            </>
          </ApiCreateCtx.Provider>
        </TabPane>
        <TabPane tab="详细说明" key="2">
          <ReactMde
            value={value}
            onChange={setValue}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            l18n={{ write: '编辑', preview: '预览' }}
            generateMarkdownPreview={markdown => Promise.reject()}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}
