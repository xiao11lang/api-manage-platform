import React, { useState } from 'react'
import { Tabs, Button, Icon } from 'antd'
import ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde-all.css'
import './apiCreate.scss'
import CreateMeta from './createMeta';
import Request from './request';
import { addApiInstance } from '../../../../../../api/apiInstance';
const { TabPane } = Tabs
export default function ApiCreate(props) {
  const [value, setValue] = React.useState('**Hello world!!!**')
  const [meta, setMeta] = useState({})
  const [selectedTab, setSelectedTab] = React.useState('write')
  return (
    <div className="api-create">
      <div className="api-create-top">
        <div onClick={props.hide}>
          <Icon type="rollback" style={{ marginRight: 10 }} />
          <span>返回API列表</span>
        </div>
        <Button type="primary" style={{ marginLeft: 10 }} onClick={()=>addApiInstance({meta:meta})}>
          保存
        </Button>
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="API文档" key="1">
          <CreateMeta id={props.id} setMeta={setMeta} meta={meta}/>
          <Request/>
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
