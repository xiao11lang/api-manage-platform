import React from 'react'
import { Tabs, AutoComplete, Input } from 'antd'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/github'
const { TabPane } = Tabs
function ExampleItem(props) {
  const dataC = [
    'text/plain',
    'text/javascript',
    'application/json',
    'application/x-www-form-urlencoded',
    'multipart/form-data'
  ]
  const handleChange = (e, field) => {
    props.info[field] = typeof e === 'object' ? e.target.value : e
    props.set({...props.info})
  }
  return (
    <div className="example-item">
      <div className="status-code">
        <div>HTTP Status Code</div>
        <Input style={{ width: 200 }} onChange={e => handleChange(e, 'code')} value={props.info.code}/>
      </div>
      <div className="content-type">
        <div>Content-Type</div>
        <AutoComplete
          style={{ width: 200 }}
          dataSource={dataC}
          onChange={e => handleChange(e, 'type')}
          value={props.info.type}
        />
      </div>
      <div className="content-detail">
        <div>示例内容 (0 / 65000)</div>
        <AceEditor
          mode="javascript"
          theme="github"
          name="UNIQUE_ID_OF_DIV"
          style={{ height: 200, width: '100%' }}
          editorProps={{ $blockScrolling: true }}
          onChange={e => handleChange(e, 'content')}
          value={props.info.content}
        />
      </div>
    </div>
  )
}
export default function Example(props) {
  const { success, fail } = props
  return (
    <Tabs className="api-create-example" defaultActiveKey="1">
      <TabPane tab="成功示例" key="1">
        <ExampleItem info={success} set={props.setSuccess}/>
      </TabPane>
      <TabPane tab="失败示例" key="2">
        <ExampleItem info={fail} type='fail' set={props.setFail}/>
      </TabPane>
    </Tabs>
  )
}
