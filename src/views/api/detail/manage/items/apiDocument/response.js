import React, { useContext } from 'react'
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
import { useSelectChange } from '../../../../../../hooks/useSelectValue'
import { ApiCreateCtx } from './apiCreate'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/github'
const { TabPane } = Tabs
const { Option } = Select
function ResponseHeader() {
  const dataH = ['accept', 'language']
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
  const handleDelete=(item)=>{
    const newHeader=resHeader.filter((ite)=>{
      return item.key!==ite.key
    })
    setResHeader([...newHeader])
  }
  const coulmnConfig = [
    {
      title: '标签',
      render: item => {
        return (
          <AutoComplete
            onSelect={e => handleFieldChange(item, e, 'tag')}
            onSearch={e => handleFieldChange(item, e, 'tag')}
            dataSource={dataH}
          />
        )
      },
      key: 'tag'
    },
    {
      title: '内容',
      render: item => {
        return <Input onChange={e => handleFieldChange(item, e, 'content')} />
      },
      key: 'content'
    },
    {
      title: '操作',
      render: (item) => {
        return !item.isLast?<Button type="danger" onClick={()=>handleDelete(item)}>删除</Button>:null
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
    if(v.target.value==='json'){
      resParam.detail=[{ key: Math.random(), isRoot: true, isLast: true }]
    }else{
      resParam.detail=null
    }
    resParam.paramType=v.target.value
    setResParam({...resParam})
  }
  const handleAdd = item => {
    item.children
      ? item.children.push({
          key: Math.random(),
          parent: item,
          isRoot: false,
          isLast: true
        })
      : (item.children = [
          { key: Math.random(), parent: item, isRoot: false, isLast: true }
        ])
        setResParam({...resParam})
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
      item.parent.children.push({
        key: Math.random(),
        isRoot: false,
        parent: item.parent,
        isLast: true
      })
    }
    item.isLast = false
    setResParam({...resParam})
  } //添加兄弟字段
  const handleFieldChange = (item, e, field) => {
    item[field] = typeof e === 'object' ? e.target.value : e
  }
  const handleDelete=(item)=>{
    if(item.isRoot){
      resParam.detail=resParam.detail.filter((ite)=>{
        return ite.key!==item.key
      })
    }else{
      item.parent.children=item.parent.children.filter((ite)=>{
        return ite.key!==item.key
      })
      if(!item.parent.children.length){
        delete item.parent.children
        // 无子字段时清除children，antd表格在数据元素含children时会出现+号，即使children数组为空
      }
    }
    setResParam({
      ...resParam
    })
  }
  const columnConfig = [
    {
      title: '参数名',
      key: 'name',
      render: item => {
        return <Input onChange={e => addRoot(item, e)} />
      }
    },
    {
      title: '类型',
      key: 'type',
      render: item => {
        return (
          <Select
            defaultValue="int"
            style={{ width: 100 }}
            onChange={e => {
              handleFieldChange(item, e, '')
            }}
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
              handleFieldChange(item, e, '')
            }}
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
              handleFieldChange(item, e, '')
            }}
          />
        )
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
      render: item => {
        return (
          <>
            <Button
              type="primary"
              style={{ marginRight: 10 }}
              onClick={() => handleAdd(item)}
            >
              添加
            </Button>
            {!item.isLast?<Button type="danger" onClick={()=>handleDelete(item)}>删除</Button>:null}
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
        <Table columns={columnConfig} dataSource={resParam.detail} pagination={false} />
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
