import React, { useContext, useEffect, useMemo } from 'react'
import { Card } from 'antd'
import { MesCtx } from '../home/home'
import { getMessage } from '../../api/message'
const titleMap = {
  official: '官方通知',
  project: '项目通知',
  person: '人员通知'
}
export function InfoCard(props) {
  const { dispatch, setMessageKey, mesState } = useContext(MesCtx)
  useEffect(() => {
    getMessage().then(res => {
      dispatch({
        type: 'INIT',
        list: res.list
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const mesCount = useMemo(() => {
    const { official, project, person } = mesState
    if (official) {
      return {
        official: official.unRead,
        project: project.unRead,
        person: person.unRead
      }
    } else {
      return {
        official: 0,
        project: 0,
        person: 0
      }
    }
  }, [mesState])
  const list = Object.entries(mesCount).map((mes, index) => {
    return (
      <div
        className="message-row"
        onClick={() => {
          setMessageKey((index + 1).toString())
        }}
        key={index}
      >
        <span>{titleMap[mes[0]]}</span>
        <span>{mes[1]}</span>
      </div>
    )
  })
  return (
    <>
      <Card title="未读消息" style={{ width: 300 }} className="info-card">
        {list}
      </Card>
    </>
  )
}
