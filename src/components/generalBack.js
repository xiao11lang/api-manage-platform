import React from 'react'
import { Icon, Button } from 'antd'
export default function GeneralBack(props) {
  return (
    <div className="general-top-save">
      <div onClick={props.hide}>
        <Icon type="rollback" className="right-10" />
        <span>{props.title||'返回'}</span>
      </div>
      {props.simple ? null : (
        <Button type="primary" className="left-10" onClick={props.save}>
          保存
        </Button>
      )}
    </div>
  )
}
