import React, { useContext, useEffect } from 'react'
import { Card } from 'antd'
import { HomeCtx } from '../home/home'
import { getMesCount } from '../../api/message'
function CardRow(props) {
  useEffect(() => {
    getMesCount({ id: userInfo.id }).then(res => {
      let count = Object.values(res.mesCount).reduce((pre, cur) => {
        return pre + cur
      }, 0)
      setUnRead(count)
      setMesCount(res.mesCount)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const { setMessageKey, setUnRead, setMesCount, userInfo } = useContext(
    HomeCtx
  )
  return (
    <div
      className="message-row"
      onClick={() => {
        setMessageKey(props.mesKey)
      }}
    >
      <span>{props.title}</span>
      <span>{props.count}</span>
    </div>
  )
}
export function InfoCard(props) {
  const list = props.mesList.map((value, index) => {
    return <CardRow {...value} key={index} mesKey={String(index + 1)} />
  })
  return (
    <>
      <Card title="未读消息" style={{ width: 300 }} className="info-card">
        {list}
      </Card>
    </>
  )
}
