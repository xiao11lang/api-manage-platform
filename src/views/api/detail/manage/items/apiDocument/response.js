import React, { useContext } from 'react'
import {
  Tabs,
  Table,
  Switch,
  Input,
  Button,
  Radio,
  Select,
  Dropdown,
  Icon
} from 'antd'
import { useSelectChange } from '../../../../../../hooks/useSelectValue'
import { ApiCreateCtx } from './apiCreate'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/github'
import getParent from './../../../../../../until/getParent'
import HttpHeader from './../../../../../../components/httpHeader'
const { TabPane } = Tabs
const { Option } = Select
function ResponseHeader() {
  const { resHeader, setResHeader } = useContext(ApiCreateCtx)
  const handleFieldChange = (item, e, field) => {
    if (item.isLast && field === 'tag') {
      item.isLast = false
      resHeader.push({
        key: Math.random(),
        isLast: true
      })
    }
    item[field] = typeof e === 'object' ? e.target.value : e
    setResHeader([...resHeader])
  }
  const handleDelete = item => {
    const newHeader = resHeader.filter(ite => {
      return item.key !== ite.key
    })
    setResHeader([...newHeader])
  }
  const coulmnConfig = [
    {
      title: '标签',
      render: item => {
        return (
          <Input
            suffix={
              <Dropdown
                overlay={
                  <HttpHeader
                    onClick={key => handleFieldChange(item, key, 'tag')}
                  />
                }
              >
                <Icon type="down" />
              </Dropdown>
            }
            className='width-200'
            value={item.tag}
            onChange={e => handleFieldChange(item, e, 'tag')}
          />
        )
      },
      key: 'tag'
    },
    {
      title: '内容',
      render: item => {
        return (
          <Input
            onChange={e => handleFieldChange(item, e, 'content')}
            defaultValue={item.content}
          />
        )
      },
      key: 'content'
    },
    {
      title: '操作',
      render: item => {
        return !item.isLast ? (
          <Button type="danger" onClick={() => handleDelete(item)}>
            删除
          </Button>
        ) : null
      },
      key: 'operation'
    }
  ]
  return <Table columns={coulmnConfig} dataSource={resHeader} />
}
function ResponseParam() {
  const jsonRoot = useSelectChange('object')
  const { resParam, setResParam } = useContext(ApiCreateCtx)
  const handleRadioChange = v => {
    if (v.target.value === 'json') {
      resParam.detail = [{ key: Math.random(), isRoot: true, isLast: true }]
    } else {
      resParam.detail = null
    }
    resParam.paramType = v.target.value
    setResParam({ ...resParam })
  }
  const handleAdd = item => {
    item.children
      ? item.children.push({
          key: Math.random(),
          isRoot: false,
          isLast: true
        })
      : (item.children = [{ key: Math.random(), isRoot: false, isLast: true }])
    setResParam({ ...resParam })
  } //添加子字段
  const addRoot = (item, e) => {
    if (!item.isLast) {
      item.name = e.target.value
      return //非最后一个字段不添加新字段
    }
    if (item.isRoot) {
      resParam.detail.push({
        key: Math.random(),
        isRoot: true,
        isLast: true
      })
    } else {
      let parent = getParent(resParam.detail, item)
      parent.children.push({
        key: Math.random(),
        isRoot: false,
        isLast: true
      })
    }
    item.isLast = false
    setResParam({ ...resParam })
  } //添加兄弟字段
  const handleFieldChange = (item, e, field) => {
    item[field] = typeof e === 'object' ? e.target.value : e
  }
  const handleDelete = item => {
    if (item.isRoot) {
      resParam.detail = resParam.detail.filter(ite => {
        return ite.key !== item.key
      })
    } else {
      let parent = getParent(resParam.detail, item)
      parent.children = parent.children.filter(ite => {
        return ite.key !== item.key
      })
      if (!parent.children.length) {
        delete parent.children
        // 无子字段时清除children，antd表格在数据元素含children时会出现+号，即使children数组为空
      }
    }
    setResParam({
      ...resParam
    })
  }
  const handleEditorChange = value =>{
    resParam.detail = value
  }
  const columnConfig = [
    {
      title: '参数名',
      key: 'name',
      render: item => {
        return <Input onChange={e => addRoot(item, e)} defaultValue={item.name} />
      }
    },
    {
      title: '类型',
      key: 'type',
      render: item => {
        return (
          <Select
            className='width-100'
            onChange={e => {
              handleFieldChange(item, e, 'type')
            }}
            defaultValue={item.type}
          >
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
      title: '必含',
      key: 'required',
      render: item => {
        return (
          <Switch
            onChange={e => {
              handleFieldChange(item, e, 'required')
            }}
            defaultChecked={item.required}
          />
        )
      }
    },
    {
      title: '说明',
      key: 'des',
      render: item => {
        return (
          <Input
            onChange={e => {
              handleFieldChange(item, e, 'des')
            }}
            defaultValue={item.des}
          />
        )
      }
    },
    {
      title: '示例',
      key: 'example',
      render: (item) => {
        return (
          <Input
            onChange={e => {
              handleFieldChange(item, e, 'example')
            }}
            defaultValue={item.example}
          />
        )
      }
    },
    {
      title: '操作',
      key: 'operation',
      render: item => {
        return (
          <>
            <Button
              type="primary"
              className='right-10'
              onClick={() => handleAdd(item)}
            >
              添加
            </Button>
            {!item.isLast ? (
              <Button type="danger" onClick={() => handleDelete(item)}>
                删除
              </Button>
            ) : null}
          </>
        )
      }
    }
  ]
  return (
    <div className="request-param">
      <div className="param-switch">
        <Radio.Group
          defaultValue="json"
          value={resParam.paramType}
          onChange={handleRadioChange}
        >
          <Radio value="json">JSON</Radio>
          <Radio value="raw">Raw</Radio>
        </Radio.Group>
      </div>
      {resParam.paramType === 'json' ? (
        <div className="param-json-root">
          <label>json根类型</label>
          <Select {...jsonRoot}>
            <Option value="object">object</Option>
            <Option value="array">array</Option>
          </Select>
        </div>
      ) : null}
      {resParam.paramType !== 'raw' ? (
        <Table
          columns={columnConfig}
          dataSource={resParam.detail}
          pagination={false}
        />
      ) : (
        <AceEditor
          mode="javascript"
          theme="github"
          name="UNIQUE_ID_OF_DIV"
          style={{ height: 100, width: '100%' }}
          editorProps={{ $blockScrolling: true }}
          onChange={handleEditorChange}
          defaultValue={resParam.detail}
        />
      )}
    </div>
  )
}
export default function Response() {
  return (
    <Tabs className="api-create-request" defaultActiveKey="1">
      <TabPane tab="返回头部" key="1">
        <ResponseHeader />
      </TabPane>
      <TabPane tab="返回参数" key="2">
        <ResponseParam />
      </TabPane>
    </Tabs>
  )
}
