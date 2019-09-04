import React, { useContext } from 'react'
import { Input, Button, Modal } from 'antd'
import { addProject } from 'api/testProject'
import { useInputChange } from 'hooks/useInputChange'
import { TeamCtx } from '@/views/home/home'
const { TextArea } = Input
export function TestModal(props) {
  const name = useInputChange('')
  const version = useInputChange('')
  const des = useInputChange('')
  const teamInfo = useContext(TeamCtx)
  const handleAdd = () => {
    if (!name.value) {
      Modal.error({
        title: '项目名不可为空'
      })
      return
    }
    addProject({
      name: name.value,
      des: des.value,
      version: version.value,
      teamId: teamInfo.id
    })
  }
  return (
    <div className="test-modal-con">
      <div>
        <label>项目名称</label>
        <Input {...name} />
      </div>
      <div>
        <label>版本号</label>
        <Input {...version} />
      </div>
      <div>
        <label>描述</label>
        <TextArea rows={4} {...des}></TextArea>
      </div>
      <div className="manage-modal-footer">
        <Button className="right-10" onClick={props.hideModal}>
          取消
        </Button>
        <Button type="primary" onClick={handleAdd}>
          确认
        </Button>
      </div>
    </div>
  )
}
