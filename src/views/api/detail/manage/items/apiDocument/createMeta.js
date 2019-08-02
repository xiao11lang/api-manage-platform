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
      defaultValue="Http://"
      style={{ width: 90 }}
      onChange={e => {
        handleModify(e, 'protocol')
      }}
    >
      <Option value="Http://">Http://</Option>
      <Option value="Https://">Https://</Option>
    </Select>
  )
  return (
    <div className="api-create-meta">
      <div className="meta-item">
        <label>分组</label>
        <Select
          defaultValue="0"
          style={{ width: 200 }}
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
          defaultValue="enabled"
          style={{ width: 200 }}
          onChange={e => {
            handleModify(e, 'status')
          }}
        >
          <Option value="enaled">启用</Option>
          <Option value="maintain">维护</Option>
          <Option value="deprecated">弃用</Option>
          <Option value="undetermined">待定</Option>
          <Option value="bug">BUG</Option>
        </Select>
      </div>
      <div className="meta-item">
        <label>URI</label>
        <Input
          addonBefore={selectBefore}
          onChange={e => {
            handleModify(e, 'url')
          }}
        />
      </div>
      <div className="meta-item">
        <label>名称</label>
        <Input
          onChange={e => {
            handleModify(e, 'name')
          }}
        />
      </div>
    </div>
  )
}
