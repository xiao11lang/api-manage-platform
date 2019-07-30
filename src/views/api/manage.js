import React, { useEffect, useContext, useReducer, useState } from 'react'
import { Table, Button, Input, Select } from 'antd'
import { getProjects, deleteProject, modifyProject } from '../../api/apiProject'
import { TeamCtx } from './../home/home'
import { apiManageReducer } from './../../reducer/apiManageReducer'
const { Column } = Table
const { Option } = Select
export function Manage() {
  const teamInfo = useContext(TeamCtx)
  const [list, dispatch] = useReducer(apiManageReducer)
  const [curItem, setCurItem] = useState({})
  useEffect(() => {
    if (teamInfo.id) {
      getProjects({
        teamId: teamInfo.id
      }).then(res => {
        const list = res.list.map(item => {
          return Object.assign({}, item, { key: item.id })
        })
        dispatch({ type: 'INIT', list: list })
      })
    }
  }, [teamInfo.id])
  const handleDelete = item => {
    deleteProject({ projectId: item.id }).then(() => {
      dispatch({ type: 'DELETE', id: item.id })
    })
  }
  const handleModify = (e, item, field) => {
    if(typeof e==='object'){
      setCurItem({
        value: Object.assign({}, item, { [field]: e.target.value })
      })
    }else{
      setCurItem({
        value: Object.assign({}, item, { [field]: e })
      })
    }
  }
  const handleSave = item => {
    modifyProject({ projectId: item.id, value: curItem.value })
  }
  const columnConfig = [
    {
      title: '名称',
      dataIndex: 'name',
      render: (v, item) => {
        return (
          <Input
            placeholder={v}
            onChange={e => {
              handleModify(e, item, 'name')
            }}
          />
        )
      }
    },
    {
      title: '版本号',
      dataIndex: 'version',
      render: (v, item) => {
        return (
          <Input
            placeholder={v}
            onChange={e => {
              handleModify(e, item, 'version')
            }}
          />
        )
      }
    },
    {
      title: '类型',
      dataIndex: 'project_type',
      render: (v, item) => {
        return (
          <Select
            style={{ width: 100 }}
            defaultValue={v}
            onChange={e => {
              handleModify(e, item, 'project_type')
            }}
          >
            <Option value="web">WEB</Option>
            <Option value="app">App</Option>
            <Option value="pc">PC</Option>
          </Select>
        )
      }
    },
    {
      title: '最后更新时间',
      dataIndex: 'updatedAt'
    },
    {
      title: '操作',
      render: item => {
        return (
          <>
            <Button
              type="primary"
              style={{ marginRight: 10 }}
              onClick={() => handleSave(item)}
            >
              保存
            </Button>
            <Button
              type="danger"
              onClick={() => {
                handleDelete(item)
              }}
            >
              删除
            </Button>
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
