import React, { useReducer, useState } from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/github'
import {
  Tabs,
  Table,
  AutoComplete,
  Switch,
  Input,
  Button,
  Radio,
  Select
} from 'antd'
import { requestHeaderReducer } from '../../../../../../reducer/requestHeaderReducer'
const { TabPane } = Tabs
const { Option } = Select
function RequestHeader() {
  const dataH = ['accept', 'language']
  const [headerList, dispatch] = useReducer(requestHeaderReducer, [
    { index: 0, key: '0' }
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
      key: 'ele',
      render: item => {
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
      key: 'required',
      render: () => <Switch />
    },
    {
      title: '内容',
      key: 'content',
      render: () => <Input />
    },
    {
      title: '操作',
      key: 'opeartion',
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
function RequestParam() {
  const [paramType, setParamType] = useState('form-data')
  const handleRadioChange = v => {
    setParamType(v.target.value)
  }
  const columnConfig = [
    {
      title: '参数名',
      key: 'name',
      render: () => {
        return <Input />
      }
    },
    {
      title: '类型',
      key: 'type',
      render: () => {
        return (
          <Select defaultValue="int" style={{ width: 100 }}>
            <Option value="number">number</Option>
            <Option value="string">string</Option>
            <Option value="object">object</Option>
            <Option value="array">array</Option>
            <Option value="file">file</Option>
            <Option value="boolean">boolean</Option>
            <Option value="null">null</Option>
          </Select>
        )
      }
    },
    {
      title: '必填',
      key: 'required',
      render: () => {
        return <Switch />
      }
    },
    {
      title: '说明',
      key: 'des',
      render: () => {
        return <Input />
      }
    },
    {
      title: '示例',
      key: 'example',
      render: () => {
        return <Input />
      }
    },
    {
      title: '操作',
      key: 'operation',
      render: () => {
        return (
          <>
            <Button type="primary" style={{ marginRight: 10 }}>
              添加
            </Button>
            <Button type="danger">删除</Button>
          </>
        )
      }
    }
  ]
  return (
    <div className="request-param">
      <div className="param-switch">
        <Radio.Group
          defaultValue="form-data"
          value={paramType}
          onChange={handleRadioChange}
        >
          <Radio value="form-data">Form-data</Radio>
          <Radio value="json">JSON</Radio>
          <Radio value="raw">Raw</Radio>
        </Radio.Group>
      </div>
      {paramType !== 'raw' ? (
        <Table
          columns={columnConfig}
          dataSource={[
            { key: 0, children: [{ key: 1, children: [{ key: 2 }] }] }
          ]}
        />
      ) : (
        <AceEditor
          mode="javascript"
          theme="github"
          name="UNIQUE_ID_OF_DIV"
          style={{ height: 100, width: '100%' }}
          editorProps={{ $blockScrolling: true }}
        />
      )}
    </div>
  )
}
function UrlParam() {
  const columnConfig = [
    {
      title: '参数名',
      key: 'name',
      render: () => {
        return <Input />
      }
    },
    {
      title: '类型',
      key: 'type',
      render: () => {
        return (
          <Select defaultValue="int" style={{ width: 100 }}>
            <Option value="number">number</Option>
            <Option value="string">string</Option>
            <Option value="object">object</Option>
            <Option value="array">array</Option>
            <Option value="file">file</Option>
            <Option value="boolean">boolean</Option>
            <Option value="null">null</Option>
          </Select>
        )
      }
    },
    {
      title: '必填',
      key: 'required',
      render: () => {
        return <Switch />
      }
    },
    {
      title: '说明',
      key: 'des',
      render: () => {
        return <Input />
      }
    },
    {
      title: '示例',
      key: 'example',
      render: () => {
        return <Input />
      }
    },
    {
      title: '操作',
      key: 'operation',
      render: () => {
        return (
          <>
            <Button type="primary" style={{ marginRight: 10 }}>
              添加
            </Button>
            <Button type="danger">删除</Button>
          </>
        )
      }
    }
  ]
  return <Table columns={columnConfig} dataSource={[{}]} />
}
export default function Request() {
  return (
    <Tabs className="api-create-request" defaultActiveKey="1">
      <TabPane tab="请求头部" key="1">
        <RequestHeader />
      </TabPane>
      <TabPane tab="请求参数" key="2">
        <RequestParam />
      </TabPane>
      <TabPane tab="GET/URL参数" key="3">
        <UrlParam />
      </TabPane>
    </Tabs>
  )
}
