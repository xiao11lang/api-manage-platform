import React from 'react'
import { List } from 'antd'
import IconFont from './../../../components/iconfont'
import { changeMesState, deleteMes } from './../../../api/message'
export function MessageList(props) {
  const list = props.mesState[props.type].list
  const handleClick = item => {
    props.showDetail()
    props.setMesDetail(Object.assign({}, item))
    if (!item.hasRead) {
      changeMesState({ id: item.id }).then(() => {
        props.dispatch({
          type: 'READ_ONE',
          id: item.id,
          mesType: props.type
        })
      })
    }
  }
  const handleDelete = (e, item) => {
    e.stopPropagation()
    deleteMes({ id: item.id }).then(() => {
      props.dispatch({
        type: 'DELETE_ONE',
        id: item.id,
        mesType: props.type,
        hasRead: item.hasRead
      })
    })
  }
  return (
    <>
      <List
        dataSource={list}
        style={{ margin: '5px 10px 0' }}
        renderItem={item => {
          return (
            <div
              onClick={() => {
                handleClick(item)
              }}
              style={{
                background: item.hasRead ? '' : 'rgb(232,232,232)'
              }}
              className="message-list-con"
            >
              <List.Item>
                {item.title}
                <div
                  onClick={e => {
                    handleDelete(e, item)
                  }}
                >
                  <IconFont type="iconguanbi" />
                </div>
              </List.Item>
            </div>
          )
        }}
      />
    </>
  )
}
