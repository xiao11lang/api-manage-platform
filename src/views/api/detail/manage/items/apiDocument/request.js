import React, { useReducer } from 'react'
import { Tabs, Table, AutoComplete, Switch, Input, Button } from 'antd'
import { requestHeaderReducer } from '../../../../../../reducer/requestHeaderReducer'
const { TabPane } = Tabs
function RequestHeader() {
  const dataH = ['accept', 'language']
  const [headerList, dispatch] = useReducer(requestHeaderReducer, [
    { index: 0 }
  ])
  const handleSelect = item => {
    if (item.index === headerList.length - 1) {
      dispatch({
        type: 'ADD',
        item: { index: headerList.length }
      })
    } else {
      dispatch({
        type: 'MODIFY',
        item: { index: item.index }
      })
    }
  }
  const columnConfig = [
    {
      title: '标签',
      render: (item, a) => {
        return (
          <AutoComplete
            placeholder="accept"
            dataSource={dataH}
            filterOption={true}
            onSelect={() => handleSelect(item)}
            onSearch={() => handleSelect(item)}
            allowClear
          />
        )
      }
    },
    {
      title: '必填',
      render: () => <Switch />
    },
    {
      title: '内容',
      render: () => <Input />
    },
    {
      title: '操作',
      render: () => <Button type="danger">删除</Button>
    }
  ]
  return (
    <Table
      className="request-header"
      dataSource={headerList}
      columns={columnConfig}
    />
  )
}
export default function Request() {
  return (
    <Tabs className="api-create-request" defaultActiveKey="1">
      <TabPane tab="请求头部" key="1">
        <RequestHeader />
      </TabPane>
      <TabPane tab="请求参数" key="2">
        2
      </TabPane>
      <TabPane tab="GET/URL参数" key="3">
        3
      </TabPane>
      <TabPane tab="REST参数" key="4">
        4
      </TabPane>
    </Tabs>
  )
}
