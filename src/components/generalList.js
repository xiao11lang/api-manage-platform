import React from 'react'
import { Table, Button } from 'antd'
import format from '../until/format';
const { Column } = Table
export default function GeneralList(props) {
  const columnConfig = [
    {
      title: 'APIs',
      dataIndex: 'name',
      key:'name',
      render: (v, item) => {
        return (
          <>
            <span>{v}</span>
          </>
        )
      }
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key:'url',
      render: (v, item) => {
        return (
          <div className="api-url">
            <span>{v}</span>
          </div>
        )
      }
    },
    {
      title: '最近更新者',
      dataIndex: 'updator',
      key:'updator'
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key:'updatedAt',
      render: v => <>{format(v)}</>
    },
    {
      title: '操作',
      render: (item) => {
        return (
          <>
            <Button type="primary" className='right-10' onClick={()=>props.edit(item.id)}>
              编辑
            </Button>
            <Button type="primary" className='right-10' onClick={()=>props.showIntro(item.id)}>
              查看
            </Button>
            <Button type="danger" onClick={()=>props.handleDelete(item.id)}>删除</Button>
          </>
        )
      }
    }
  ]
  const coulmns = columnConfig.map((column, index) => {
    return <Column key={index}  {...column} />
  })
  return (
    <div className="general-list-con">
      <div className="list-top">
        <Button icon="plus" type="primary" onClick={props.showCreate}>
          {props.createTitle}
        </Button>
      </div>
      {/* <Table dataSource={props.dataList}>{coulmns}</Table> */}
      {props.children}
    </div>
  )
}
