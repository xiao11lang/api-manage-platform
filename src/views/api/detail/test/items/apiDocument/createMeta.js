import React from 'react'
import { Input, Select } from 'antd'
const { Option } = Select

export default function CreateMeta(props) {
  const { meta, setMeta } = props
  const handleModify = (e, field) => {
    typeof e === 'object'
      ? setMeta({ ...meta, [field]: e.target.value })
      : setMeta({ ...meta, [field]: e })
  }
  const groupList = props.group.map(gr => {
    return (
      <Option key={gr.id} value={gr.id}>
        {gr.name}
      </Option>
    )
  })
  const selectBefore = (
    <Select
      value={meta.protocol||'http'}
      style={{ width: 90 }}
      onChange={e => {
        handleModify(e, 'protocol')
      }}
    >
      <Option value="http">Http://</Option>
      <Option value="https">Https://</Option>
    </Select>
  )
  return (
    <div className="api-create-meta">
      <div className="meta-item">
        <label>分组</label>
        <Select
          value={meta.group_id||'0'}
          className='width-200'
          onChange={e => {
            handleModify(e, 'group_id')
          }}
        >
          <Option value="0">默认分组</Option>
          {groupList}
        </Select>
      </div>
      <div className="meta-item">
        <label>方法</label>
        <Select
          value={meta.method||'get'}
          className='width-200'
          onChange={e => {
            handleModify(e, 'method')
          }}
        >
          <Option value="head">HEAD</Option>
          <Option value="get">GET</Option>
          <Option value="post">POST</Option>
          <Option value="delete">DELETE</Option>
          <Option value="put">PUT</Option>
          <Option value="options">OPTIONS</Option>
        </Select>
      </div>
      <div className="meta-item">
        <label>URI</label>
        <Input
          addonBefore={selectBefore}
          onChange={e => {
            handleModify(e, 'url')
          }}
          value={meta.url}
        />
      </div>
      <div className="meta-item">
        <label>名称</label>
        <Input
          onChange={e => {
            handleModify(e, 'name')
          }}
          value={meta.name}
        />
      </div>
    </div>
  )
}
