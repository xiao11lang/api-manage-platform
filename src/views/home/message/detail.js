import React, { useContext } from 'react'
import { Button, Divider } from 'antd'
import IconFont from './../../../components/iconfont'
import { deleteMes, refuseInvite, agreeInvite } from '../../../api/message'
import { UserCtx } from './../../../App'
export function MessageDetail(props) {
  const {
    title,
    content,
    createdAt,
    id,
    extra,
    type,
    extraStatus,
    extraInfo
  } = props.mes
  const time = new Date(createdAt).toLocaleString()
  const userInfo = useContext(UserCtx).userInfo
  const handleDelete = () => {
    deleteMes({
      id: id
    }).then(() => {
      props.hideDetail()
      props.dispatch({
        type: 'DELETE_ONE',
        id: id,
        mesType: type,
        hasRead: 1
      })
    })
  }
  const handleAgree = () => {
    agreeInvite({
      id: id,
      extraInfo: extraInfo,
      name: userInfo.name
    }).then(() => {
      props.hideDetail()
    })
  }
  const handleRefuse = () => {
    refuseInvite({ id: id }).then(() => {
      props.hideDetail()
    })
  }
  return (
    <div className="message-detail">
      <div className="detail-top">
        <Button style={{ marginRight: 16 }} onClick={props.hideDetail}>
          <IconFont type="iconfanhui2" />
          返回
        </Button>
        <Button onClick={handleDelete}>
          <IconFont type="iconshanchu" />
          删除
        </Button>
      </div>
      <Divider />
      <div className="detail-title">
        <p>{title}</p>
        <p>{time}</p>
      </div>
      <Divider />
      <div className="detail-content">{content}</div>
      {extra && !extraStatus ? (
        <div>
          <Button style={{ margin: '20px' }} onClick={handleRefuse}>
            拒绝
          </Button>
          <Button type="primary" onClick={handleAgree}>
            同意
          </Button>
        </div>
      ) : null}
    </div>
  )
}
