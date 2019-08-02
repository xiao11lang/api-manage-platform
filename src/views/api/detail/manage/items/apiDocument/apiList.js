import React from 'react'
import { Table,Button } from 'antd'
import ApiTag from './apiTag'
const { Column } = Table
export default function ApiList(props) {
  const columnConfig = [
    {
      title: 'APIs',
      dataIndex: 'name',
      render: (v) => {
        return <><ApiTag status="BUG" /><span>{v}</span></>
      }
    },
    {
        title:'URL',
        dataIndex:'url'
    },
    {
        title:'创建者',
        dataIndex:'creator'
    },
    {
        title:'最近更新者',
        dataIndex:'updator'
    },
    {
        title:'更新时间',
        dataIndex:'updatedAt'
    }
  ]
  const coulmns = columnConfig.map((column, index) => {
    return <Column key={index} align="center" {...column} />
  })
  const data=[{
      name:'测试',
      url:'www.baidu.com',
      creator:'xmy',
      updator:'dmy',
      updatedAt:'2019-08-02'
  }]
  return (
    <div className="api-list-con">
        <div className="list-top">
            <Button icon="plus" type="primary" onClick={props.show}>
              新建API
            </Button>
          </div>
      <Table dataSource={data}>{coulmns}</Table>
    </div>
  )
}
