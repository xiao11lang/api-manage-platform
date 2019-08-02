import React, { useState } from 'react'
import { Tabs, Button, Icon } from 'antd'
import ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde-all.css'
import './apiCreate.scss'
const { TabPane } = Tabs
export default function ApiCreate() {
  const [value, setValue] = React.useState('**Hello world!!!**')
  const [selectedTab, setSelectedTab] = React.useState('write')
  return (
    <div className="api-create">
      <div className="api-create-top">
        <Icon type="rollback" style={{ marginRight: 10 }} />
        <span>返回API列表</span>
        <Button type="primary" style={{ marginLeft: 10 }}>
          保存
        </Button>
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="API文档" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="详细说明" key="2">
          <ReactMde
            value={value}
            onChange={setValue}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}
