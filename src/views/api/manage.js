import React, { useEffect, useContext,useState } from 'react'
import { Table, Button, Input } from 'antd'
import { useInputChange } from '../../hooks/useInputChange'
import { getProjects } from '../../api/apiProject'
import { TeamCtx } from './../home/home'
const { Column } = Table

export function Manage() {
  const teamInfo = useContext(TeamCtx)
  const [list, setList] = useState([])
  useEffect(() => {
    if (teamInfo.id) {
      getProjects({
        teamId: teamInfo.id
      }).then((res)=>{
          const list=res.list.map((item)=>{
              return Object.assign({},item,{key:item.id})
          })
          setList(list)
      })
    }
  }, [teamInfo.id])
  const name = useInputChange('')
  const version = useInputChange('')
  const columnConfig = [
    {
      title: '名称',
      dataIndex: 'name',
      render: v => {
        return <Input {...name} placeholder={v} />
      }
    },
    {
      title: '版本号',
      dataIndex: 'version',
      render: v => {
        return <Input value={v} {...version} placeholder={v} />
      }
    },
    {
      title: '类型',
      dataIndex: 'project_type',
      render: v => {
        return <Input value={v} />
      }
    },
    {
      title: '最后更新时间',
      dataIndex: 'updatedAt'
    },
    {
      title: '操作',
      render: () => {
        return (
          <>
            <Button type="primary" style={{ marginRight: 10 }}>
              保存
            </Button>
            <Button type="danger">删除</Button>
          </>
        )
      },
      align: 'left'
    }
  ]
  const coulmns = columnConfig.map((column, index) => {
    return <Column key={index} align="center" {...column} />
  })
  return (
    <>
      <Table dataSource={list} style={{ marginTop: 20 }}>
        {coulmns}
      </Table>
    </>
  )
}
