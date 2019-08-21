import React, { useState } from 'react'
import { Dropdown, Menu, Modal, Input } from 'antd'
import { useInputChange } from '../hooks/useInputChange';
import IconFont from './iconfont';
export function MenuAction(props) {
  const [modalShow, setModalShow] = useState(false)
  const name = useInputChange('')
  const handleModify = () => {
  }
  const handleDelete = (e) => {
    e.stopPropagation()
    props.handleDelete(props.id)
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
