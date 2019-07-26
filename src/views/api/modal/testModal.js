import React from 'react'
import {Input,Button} from 'antd'
const {TextArea}=Input
export function TestModal(props) {
  return (
    <div className='test-modal-con'>
      <div>
        <label>项目名称</label>
        <Input/>
      </div>
      <div>
        <label>版本号</label>
        <Input/>
      </div>
      <div>
        <label>描述</label>
        <TextArea rows={4}></TextArea>
      </div>
      <div className='manage-modal-footer'>
        <Button style={{marginRight:10}} onClick={props.hideModal}>取消</Button>
        <Button type='primary'>确认</Button>
      </div>
    </div>
  )
}
