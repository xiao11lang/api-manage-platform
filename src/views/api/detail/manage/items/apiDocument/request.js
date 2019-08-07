import React, { useState, useContext } from 'react'
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
import { ApiCreateCtx } from './apiCreate'
const { TabPane } = Tabs
const { Option } = Select
function RequestHeader() {
  const dataH = ['accept', 'language']
  const { headerList, dispatch } = useContext(ApiCreateCtx)
  const handleSelect = (item, v) => {
    dispatch({
      type: 'MODIFY',
      item: { ...item, label: v },
      key: item.key
    })
    if (item.last) {
      dispatch({
        type: 'ADD',
        item: {
          last: true,
          key: Math.random()
        }
      })
    }
  }
  const handleChange = (e, item, field) => {
    dispatch({
      type: 'MODIFY',
      item: { ...item, [field]: typeof e === 'object' ? e.target.value : e },
      key: item.key
    })
  }
  const handleDelete = item => {
    dispatch({
      type: 'DELETE',
      key: item.key
    })
  }
  const columnConfig = [
    {
      title: '标签',
      key: 'label',
      render: item => {
        return (
          <AutoComplete
            placeholder="accept"
            dataSource={dataH}
            filterOption={true}
            onSelect={v => handleSelect(item, v)}
            onSearch={v => handleSelect(item, v)}
            allowClear
          />
        )
      }
    },
    {
      title: '必填',
      key: 'required',
      render: item => (
        <Switch onChange={e => handleChange(e, item, 'required')} />
      )
    },
    {
      title: '内容',
      key: 'content',
      render: item => <Input onChange={e => handleChange(e, item, 'content')} />
    },
    {
      title: '操作',
      key: 'opeartion',
      render: item =>
        item.last ? null : (
          <Button type="danger" onClick={() => handleDelete(item)}>
            删除
          </Button>
        )
    }
  ]

  return (
    <Table
      className="request-header"
      dataSource={headerList}
      columns={columnConfig}
      pagination={false}
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
          pagination={false}
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
  return <Table columns={columnConfig} dataSource={[{}]} pagination={false} />
}
export default function Request(props) {
  return (
    <Tabs className="api-create-request" defaultActiveKey="1">
      <TabPane tab="请求头部" key="1">
        <RequestHeader setRequest={props.setRequest} />
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
