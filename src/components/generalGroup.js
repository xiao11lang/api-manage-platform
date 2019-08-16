import React, { useState,useEffect } from 'react'
import { Button, Modal, Input } from 'antd'
import {MenuAction} from './menuAction'
import { useInputChange } from '../hooks/useInputChange';
export default function GeneralGroup(props) {
  const [modalShow, setModalShow] = useState(false)
  const name = useInputChange('')
  const showModal = () => {
    setModalShow(true)
  }
  const add = () => {
    if (!name.value.trim()) {
      return
    }
    // return addTopGroup({ name: name.value, project_id: props.id }).then(res => {
    //   setModalShow(false)
    //   props.dispatch({
    //     type: 'ADD',
    //     item: res.item
    //   })
    // })
  }
  useEffect(() => {
    // getGroups({ id: props.id }).then(res => {
    //   props.dispatch({
    //     type: 'INIT',
    //     list: res.list
    //   })
    // })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const items = props.list.map(item => {
    return (
      <div key={item.id} className="group-item" onClick={()=>props.setGroupId(item.id)}>
        {item.name}
        <MenuAction id={item.id} dispatch={props.dispatch} projectId={props.id} handleDelete={props.handleDeleteGroup}/>
      </div>
    )
  })
  return (
    <>
      <div className="general-group-con">
        <div className="group-top">
          <Button icon="plus" type="primary" onClick={showModal}>
            新建分组
          </Button>
        </div>
        <div className="group-body">
          <div className="group-item all" onClick={()=>props.setGroupId('')}>所有分组</div>
          {items}
        </div>
      </div>
      <Modal
        visible={modalShow}
        title="新建一个分组"
        closable={false}
        okText="确认"
        cancelText="取消"
        onCancel={() => {
          setModalShow(false)
        }}
        onOk={add}
      >
        <Input placeholder="请输入分组名" {...name} />,
      </Modal>
    </>
  )
}
