import React, { useEffect, useState } from 'react'
import { Table, Button } from 'antd'
import ApiTag, { MethodTag } from './apiTag'
import { getApiInstances } from '../../../../../../api/apiInstance'
import format from './../../../../../../until/format'
const { Column } = Table
export default function ApiList(props) {
  const [dataList, setDataList] = useState([])
  useEffect(() => {
    getApiInstances({
      projectId: props.id
    }).then(res => {
      setDataList(res.list)
    })
  }, [props.id])
  const columnConfig = [
    {
      title: 'APIs',
      dataIndex: 'name',
      render: (v, item) => {
        return (
          <>
            <ApiTag status={item.status} />
            <span>{v}</span>
          </>
        )
      }
    },
    {
      title: 'URL',
      dataIndex: 'url',
      render: (v, item) => {
        return (
          <div className="api-url">
            <MethodTag method={item.method} />
            <span>{v}</span>
          </div>
        )
      }
    },
    {
      title: '最近更新者',
      dataIndex: 'updator'
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      render: v => <>{format(v)}</>
    },
    {
      title: '操作',
      render: () => {
        return (
          <>
            <Button type="primary" style={{ marginRight: 10 }}>
              编辑
            </Button>
            <Button type="primary" style={{ marginRight: 10 }}>
              查看
            </Button>
            <Button type="danger">删除</Button>
          </>
        )
      }
    }
  ]
  const coulmns = columnConfig.map((column, index) => {
    return <Column key={index}  {...column} />
  })
  return (
    <div className="api-list-con">
      <div className="list-top">
        <Button icon="plus" type="primary" onClick={props.show}>
          新建API
        </Button>
      </div>
      <Table dataSource={dataList}>{coulmns}</Table>
    </div>
  )
}
