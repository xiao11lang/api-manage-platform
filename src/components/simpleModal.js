import React from 'react'
import { Modal, Input } from 'antd'
import { useInputChange } from '../hooks/useInputChange'
export default function SimpleModal(props) {
  const name = useInputChange('')
  const onOk = () => {
    if (!name.value.trim()&&props.simple) {
      return
    }
    props.onOk(name.value)
    props.hide()
  }
  return (
    <Modal
      visible={props.modalShow}
      title={props.title}
      closable={false}
      okText="确认"
      cancelText="取消"
      onCancel={props.hide}
      onOk={onOk}
    >
      {props.simple ? (
        <Input placeholder='请输入' {...name} />
      ) : (
        props.children
      )}
    </Modal>
  )
}
