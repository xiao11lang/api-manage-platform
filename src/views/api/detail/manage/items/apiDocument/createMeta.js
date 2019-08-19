import React, { useEffect, useState } from 'react'
import { Input, Select } from 'antd'
import { getGroups } from '../../../../../../api/apiGroup'
const { Option } = Select

export default function CreateMeta(props) {
  const [group, setGroup] = useState([])
  const { meta, setMeta } = props
  const handleModify = (e, field) => {
    typeof e === 'object'
      ? setMeta({ ...meta, [field]: e.target.value })
      : setMeta({ ...meta, [field]: e })
  }
  useEffect(() => {
    getGroups({ id: props.id }).then(res => {
      setGroup(res.list)
    })
  }, [props.id])
  const groupList = group.map(gr => {
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
            handleModify(e, 'group')
          }}
        >
          <Option value="0">默认分组</Option>
          {groupList}
        </Select>
      </div>
      <div className="meta-item">
        <label>状态</label>
        <Select
          value={meta.status||'enabled'}
          className='width-200'
          onChange={e => {
            handleModify(e, 'status')
          }}
        >
          <Option value="enabled">启用</Option>
          <Option value="maintain">维护</Option>
          <Option value="deprecated">弃用</Option>
          <Option value="undetermined">待定</Option>
          <Option value="bug">BUG</Option>
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
