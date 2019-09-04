import React, { useEffect } from 'react'
import { Table, Button, Input, Tooltip } from 'antd'
import { getProjects } from 'api/testProject'
import format from 'until/format'
const { Column } = Table
const columnConfig = [
  {
    title: '名称',
    dataIndex: 'name',
    render(v) {
      return <Input defaultValue={v} />
    }
  },
  {
    title: '版本号',
    dataIndex: 'version',
    render(v) {
      return <Input defaultValue={v} />
    }
  },
  {
    title: '类型',
    dataIndex: 'project_des',
    render(v) {
      return (
        <Tooltip title={v}>
          <div>{v}</div>
        </Tooltip>
      )
    }
  },
  {
    title: '最后更新时间',
    dataIndex: 'updatedAt',
    render(v) {
      return format(v)
    }
  },
  {
    title: '操作',
    render: item => {
      return (
        <>
          <Button type="primary" className="right-10">
            保存
          </Button>
          <Button type="primary" className="right-10">
            查看
          </Button>
          <Button type="danger">删除</Button>
        </>
      )
    },
    align: 'left'
  }
]
export function Test(props) {
  useEffect(() => {
    if (!props.id) return
    getProjects({
      id: props.id
    }).then(res => {
      props.dispatch({
        type: 'INIT',
        list: res.list
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id])
  const coulmns = columnConfig.map((column, index) => {
    return <Column key={index} align="center" {...column}></Column>
  })
  return (
    <>
      <Table dataSource={props.list} className="top-20" rowKey="id">
        {coulmns}
      </Table>
    </>
  )
}
