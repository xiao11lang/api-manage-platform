import React, { useContext } from 'react'
import { Input, Select, Button } from 'antd'
import { addProject } from '../../../api/apiProject'
import { useInputChange } from '../../../hooks/useInputChange'
import { TeamCtx } from './../../home/home'
import { useSelectChange } from '../../../hooks/useSelectValue'
import dayjs from 'dayjs'
const { Option } = Select
export function ManageModal(props) {
  const name = useInputChange('')
  const version = useInputChange('')
  const type = useSelectChange('web')
  const teamInfo = useContext(TeamCtx)
  const handleAdd = () => {
    addProject({
      name: name.value,
      version: version.value,
      type: type.value,
      teamId: teamInfo.id
    }).then(res => {
      props.hideModal()
      props.dispatch({
        type: 'ADD',
        item: {
          ...res.item,
          key: res.item.id,
          updatedAt: dayjs(res.item.updatedAt).format('YYYY-MM-DD HH:mm')
        }
      })
    })
  }
  return (
    <>
      <div>
        <label>项目名称</label>
        <Input {...name} />
      </div>
      <div>
        <label>版本号</label>
        <Input {...version} />
      </div>
      <div>
        <label>项目类型</label>
        <Select defaultValue="web" style={{ display: 'block' }} {...type}>
          <Option value="web">WEB</Option>
          <Option value="app">App</Option>
          <Option value="pc">PC</Option>
        </Select>
      </div>
      <div className="manage-modal-footer">
        <Button style={{ marginRight: 10 }} onClick={props.hideModal}>
          取消
        </Button>
        <Button type="primary" onClick={handleAdd}>
          确认
        </Button>
      </div>
    </>
  )
}
