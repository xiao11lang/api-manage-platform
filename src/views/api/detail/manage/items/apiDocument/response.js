import React,{useState} from 'react'
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
import { useSelectChange } from '../../../../../../hooks/useSelectValue';
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/github'
const { TabPane } = Tabs
const {Option}=Select
function ResponseHeader(){
    const [resHeader,setResHeader]=useState([{key:Math.random(),isLast:true}])
    const handleFieldChange = (item, e, field) => {
        if(item.isLast&&field==='tag'){
          item.isLast=false
          resHeader.push({
            key:Math.random(),
            isLast:true
          })
        }
        item[field] = typeof e === 'object' ? e.target.value : e
        setResHeader([...resHeader])
      }
    const coulmnConfig=[{
        title:'标签',
        render:(item)=>{
            return <AutoComplete onSelect={(e)=>handleFieldChange(item,e,'tag')} onSearch={(e)=>handleFieldChange(item,e,'tag')}/>
        },
        key:'tag'
    },{
        title:'内容',
        render:(item)=>{
            return <Input onChange={(e)=>handleFieldChange(item,e,'content')}/>
        },
        key:'content'
    },{
        title:'操作',
        render:()=>{
            return <Button type='danger'>删除</Button>
        },
        key:'operation'
    }]
    return <Table columns={coulmnConfig} dataSource={resHeader}/>
}
function ResponseParam() {
    const [paramType, setParamType] = useState('json')
  
    const jsonRoot = useSelectChange('object')
    const [param, setParam] = useState([
      { key: Math.random(), isRoot: true, isLast: true }
    ])
    const handleRadioChange = v => {
      setParamType(v.target.value)
      setParam([{ key: Math.random(), isRoot: true, isLast: true }])
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
      setParam([...param])
    } //添加子字段
    const addRoot = (item, e) => {
      if (!item.isLast) {
        item.name = e.target.value
        return //非最后一个字段不添加新字段
      }
      if (item.isRoot) {
        param.push({
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
      setParam([...param])
    } //添加兄弟字段
    const handleFieldChange = (item, e, field) => {
      item[field] = typeof e === 'object' ? e.target.value : e
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
            defaultValue="json"
            value={paramType}
            onChange={handleRadioChange}
          >
            <Radio value="json">JSON</Radio>
            <Radio value="raw">Raw</Radio>
          </Radio.Group>
        </div>
        {paramType === 'json' ? (
          <div className='param-json-root'>
            <label>json根类型</label>
            <Select {...jsonRoot}>
            <Option value="object">object</Option>
            <Option value="array">array</Option>
          </Select>
          </div>
        ) : null}
        {paramType !== 'raw' ? (
          <Table columns={columnConfig} dataSource={param} pagination={false} />
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
      <TabPane tab="返回头部" key="1" >
          <ResponseHeader/>
      </TabPane>
      <TabPane tab="返回参数" key="2" >
          <ResponseParam/>
      </TabPane>
    </Tabs>
  )
}
