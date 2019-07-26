import React from 'react'
import {Input,Select,Button} from 'antd'
const {Option}=Select
export function ManageModal(props) {
  return (
    <>
      <div>
        <label>项目名称</label>
        <Input/>
      </div>
      <div>
        <label>版本号</label>
        <Input/>
      </div>
      <div>
        <label>项目类型</label>
        <Select defaultValue='web' style={{display:'block'}}>
            <Option value='web'>WEB</Option>
            <Option value='app'>App</Option>
            <Option value='pc'>PC</Option>
        </Select>
      </div>
      <div className='manage-modal-footer'>
        <Button style={{marginRight:10}} onClick={props.hideModal}>取消</Button>
        <Button type='primary'>确认</Button>
      </div>
    </>
  )
}
