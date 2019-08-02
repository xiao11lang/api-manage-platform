import React, { useState, useEffect, useReducer } from 'react'
import { Button, Modal, Input } from 'antd'
import { useInputChange } from '../../../../../hooks/useInputChange'
import { addTopGroup, getGroups } from '../../../../../api/apiGroup'
import { apiGroupReducer } from '../../../../../reducer/apiGroupReducer'
import { MenuAction } from './apiDocument/menuAction';
export default function ApiDocument(props) {
  const id = props.search.split('=')[1]
  const [modalShow, setModalShow] = useState(false)
  const name = useInputChange('')
  const [list, dispatch] = useReducer(apiGroupReducer,[])
  const showModal = () => {
    setModalShow(true)
  }
  const add = () => {
    if (!name.value.trim()) {
      return
    }
    return addTopGroup({ name: name.value, project_id: id }).then(res => {
      setModalShow(false)
      dispatch({
        type: 'ADD',
        item: res.item
      })
    })
  }
  useEffect(() => {
    getGroups({ id: id }).then(res => {
      dispatch({
        type: 'INIT',
        list: res.list
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const items = list.map(item => {
    return (
      <div key={item.id} className="group-item">
        {item.name}
        <MenuAction id={item.id} dispatch={dispatch}/>
      </div>
    )
  })
  return (
    <>
      <div className="api-document">
        <div className="api-group-con">
          <div className="group-top">
            <Button icon="plus" type="primary" onClick={showModal}>
              新建分组
            </Button>
          </div>
          <div className="group-body">
            <div className="group-item">所有分组</div>
            {items}
          </div>
        </div>
        <div className="api-list-con" />
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
