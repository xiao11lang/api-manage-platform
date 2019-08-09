import React from 'react'
import { Tabs, AutoComplete, Input } from 'antd'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/github'
const { TabPane } = Tabs
function ExampleItem() {
  const dataC = ['text/plain', 'text/javascript','application/json','application/x-www-form-urlencoded','multipart/form-data']
  return (
    <div className="example-item">
      <div className="status-code">
        <div>HTTP Status Code</div>
        <Input style={{ width: 200 }} />
      </div>
      <div className="content-type">
        <div>Content-Type</div>
        <AutoComplete style={{ width: 200 }} dataSource={dataC} />
      </div>
      <div className="content-detail">
        <div>示例内容 (0 / 65000)</div>
        <AceEditor
          mode="javascript"
          theme="github"
          name="UNIQUE_ID_OF_DIV"
          style={{ height: 200, width: '100%' }}
          editorProps={{ $blockScrolling: true }}
        />
      </div>
    </div>
  )
}
export default function Example() {
  return (
    <Tabs className="api-create-example" defaultActiveKey="1">
      <TabPane tab="成功示例" key="1">
        <ExampleItem />
      </TabPane>
      <TabPane tab="失败示例" key="2">
        <ExampleItem />
      </TabPane>
    </Tabs>
  )
}
