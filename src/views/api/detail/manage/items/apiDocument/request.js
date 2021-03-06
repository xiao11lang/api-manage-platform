import React, { useContext } from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/github'
import {
  Tabs,
  Table,
  Switch,
  Input,
  Button,
  Radio,
  Select,
  Icon,
  Dropdown
} from 'antd'
import { ApiCreateCtx } from './apiCreate'
import { useSelectChange } from 'hooks/useSelectValue'
import getParent from 'until/getParent'
import { HttpHeader } from 'components'
const { TabPane } = Tabs
const { Option } = Select
function RequestHeader() {
  const { reqHeader, setReqHeader } = useContext(ApiCreateCtx)
  const handleFieldChange = (item, e, field) => {
    if (item.isLast && field === 'tag') {
      item.isLast = false
      reqHeader.push({
        key: Math.random(),
        isLast: true
      })
    }
    item[field] = typeof e === 'object' ? e.target.value : e
    setReqHeader([...reqHeader])
  }
  const handleDelete = item => {
    const newHeader = reqHeader.filter(ite => {
      return item.key !== ite.key
    })
    setReqHeader([...newHeader])
  }
  const columnConfig = [
    {
      title: '标签',
      key: 'tag',
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
            className="width-200"
            value={item.tag}
            onChange={e => handleFieldChange(item, e, 'tag')}
          />
        )
      }
    },
    {
      title: '必填',
      key: 'required',
      render: item => (
        <Switch
          onChange={e => handleFieldChange(item, e, 'required')}
          defaultChecked={item.required}
        />
      )
    },
    {
      title: '内容',
      key: 'content',
      render: item => (
        <Input
          onChange={e => handleFieldChange(item, e, 'content')}
          defaultValue={item.content}
        />
      )
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
      dataSource={reqHeader}
      columns={columnConfig}
      pagination={false}
    />
  )
}
function RequestParam() {
  const { reqParam, setReqParam } = useContext(ApiCreateCtx)
  const jsonRoot = useSelectChange('object')
  const handleRadioChange = e => {
    const type = e.target.value
    reqParam.paramType = type
    if (type === 'raw') {
      reqParam.detail = null
    } else {
      reqParam.detail = [{ key: Math.random(), isRoot: true, isLast: true }]
    }
    setReqParam({ ...reqParam })
  }
  const handleAdd = item => {
    item.children
      ? item.children.push({
          key: Math.random(),
          isRoot: false,
          isLast: true
        })
      : (item.children = [{ key: Math.random(), isRoot: false, isLast: true }])
    setReqParam({
      ...reqParam,
      detail: [...reqParam.detail]
    })
  } //添加子字段
  const addRoot = (item, e) => {
    if (!item.isLast) {
      item.name = e.target.value
      return //非最后一个字段不添加新字段
    }
    if (item.isRoot) {
      reqParam.detail.push({
        key: Math.random(),
        isRoot: true,
        isLast: true
      })
    } else {
      let parent = getParent(reqParam.detail, item)
      parent.children.push({
        key: Math.random(),
        isRoot: false,
        isLast: true
      })
    }
    item.isLast = false
    setReqParam({
      ...reqParam,
      detail: [...reqParam.detail]
    })
  } //添加兄弟字段
  const handleFieldChange = (item, e, field) => {
    item[field] = typeof e === 'object' ? e.target.value : e
  }
  const handleDelete = item => {
    if (item.isRoot) {
      reqParam.detail = reqParam.detail.filter(ite => {
        return ite.key !== item.key
      })
    } else {
      let parent = getParent(reqParam.detail, item)
      parent.children = parent.children.filter(ite => {
        return ite.key !== item.key
      })
      if (!parent.children.length) {
        delete parent.children
        // 无子字段时清除children，antd表格在数据元素含children时会出现+号，即使children数组为空
      }
    }
    setReqParam({
      ...reqParam
    })
  }
  const handleEditorChange = value => {
    reqParam.detail = value
  }
  const columnConfig = [
    {
      title: '参数名',
      key: 'name',
      render: item => {
        return (
          <Input onChange={e => addRoot(item, e)} defaultValue={item.name} />
        )
      }
    },
    {
      title: '类型',
      key: 'type',
      render: item => {
        return (
          <Select
            className="width-100"
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
      title: '必填',
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
      render: item => {
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
            {reqParam.paramType === 'json' ? (
              <Button
                type="primary"
                className="right-10"
                onClick={() => handleAdd(item)}
              >
                添加
              </Button>
            ) : null}
            {item.isLast && item.isRoot ? null : (
              <Button type="danger" onClick={() => handleDelete(item)}>
                删除
              </Button>
            )}
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
          value={reqParam.paramType}
          onChange={handleRadioChange}
        >
          <Radio value="form-data">Form-data</Radio>
          <Radio value="json">JSON</Radio>
          <Radio value="raw">Raw</Radio>
        </Radio.Group>
      </div>
      {reqParam.paramType === 'json' ? (
        <div className="param-json-root">
          <label>json根类型</label>
          <Select {...jsonRoot}>
            <Option value="object">object</Option>
            <Option value="array">array</Option>
          </Select>
        </div>
      ) : null}
      {reqParam.paramType !== 'raw' ? (
        <Table
          columns={columnConfig}
          dataSource={reqParam.detail}
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
          defaultValue={reqParam.detail}
        />
      )}
    </div>
  )
}
function UrlParam() {
  const { reqUrl, setReqUrl } = useContext(ApiCreateCtx)
  const handleFieldChange = (item, e, field) => {
    if (item.isLast && field === 'name') {
      item.isLast = false
      reqUrl.push({
        key: Math.random(),
        isLast: true
      })
    }
    item[field] = typeof e === 'object' ? e.target.value : e
    setReqUrl([...reqUrl])
  }
  const handleDelete = item => {
    const newReqUrl = reqUrl.filter(ite => {
      return ite.key !== item.key
    })
    setReqUrl([...newReqUrl])
  }
  const columnConfig = [
    {
      title: '参数名',
      key: 'name',
      render: item => {
        return <Input onChange={e => handleFieldChange(item, e, 'name')} />
      }
    },
    {
      title: '类型',
      key: 'type',
      render: item => {
        return (
          <Select
            defaultValue="int"
            className="width-100"
            onChange={e => handleFieldChange(item, e, 'type')}
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
      title: '必填',
      key: 'required',
      render: item => {
        return <Switch onChange={e => handleFieldChange(item, e, 'required')} />
      }
    },
    {
      title: '说明',
      key: 'des',
      render: item => {
        return <Input onChange={e => handleFieldChange(item, e, 'des')} />
      }
    },
    {
      title: '示例',
      key: 'example',
      render: item => {
        return <Input onChange={e => handleFieldChange(item, e, 'example')} />
      }
    },
    {
      title: '操作',
      key: 'operation',
      render: item => {
        return (
          <>
            {item.isLast ? null : (
              <Button type="danger" onClick={() => handleDelete(item)}>
                删除
              </Button>
            )}
          </>
        )
      }
    }
  ]
  return <Table columns={columnConfig} dataSource={reqUrl} pagination={false} />
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
