import React, { useState } from 'react'
import { Dropdown, Menu, Modal, Input } from 'antd'
import IconFont from './../../../../../../components/iconfont'
import { modifyGroup, deleteGroup } from '../../../../../../api/apiGroup'
import { useInputChange } from '../../../../../../hooks/useInputChange'
export function MenuAction(props) {
  const [modalShow, setModalShow] = useState(false)
  const name = useInputChange('')
  const handleModify = () => {
    return modifyGroup({
      id: props.id,
      name: name.value
    }).then(() => {
      setModalShow(false)
      props.dispatch({
        type: 'MODIFY',
        id: props.id,
        name: name.value
      })
    })
  }
  const handleDelete = () => {
    deleteGroup({
      id: props.id,
      projectId: props.projectId
    }).then(() => {
      props.dispatch({
        type: 'DELETE',
        id: props.id
      })
    })
  }
  return (
    <>
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item>
              <div
                onClick={() => {
                  setModalShow(true)
                }}
              >
                编辑
              </div>
            </Menu.Item>
            <Menu.Item>
              <div onClick={handleDelete}>删除</div>
            </Menu.Item>
          </Menu>
        }
      >
        <IconFont type="icongengduo" />
      </Dropdown>
      <Modal
        visible={modalShow}
        title="修改分组名"
        closable={false}
        okText="确认"
        cancelText="取消"
        onCancel={() => {
          setModalShow(false)
        }}
        onOk={handleModify}
      >
        <Input placeholder="请输入分组名" {...name} />,
      </Modal>
    </>
  )
}
