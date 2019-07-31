import React, { useState } from 'react'
import { Table, Button, Input, Select, Modal } from 'antd'
import { deleteProject, modifyProject } from '../../api/apiProject'
import dayjs from 'dayjs'
const { Column } = Table
const { Option } = Select
export function Manage(props) {
  const { list, dispatch } = props
  const [curItem, setCurItem] = useState({})
  const handleDelete = item => {
    deleteProject({ projectId: item.id }).then(() => {
      dispatch({ type: 'DELETE', id: item.id })
    })
  }
  const handleModify = (e, item, field) => {
    let copy={...curItem.value}
    if (typeof e === 'object') {
      setCurItem({
        value: Object.assign({}, copy, { [field]: e.target.value })
      })
    } else {
      setCurItem({
        value: Object.assign({}, copy, { [field]: e })
      })
    }
  }
  const handleSave = item => {
    if (!curItem.value) {
      return
    }
    const { name, version, project_type } = curItem.value
    if (!name || !version) {
      Modal.error({
        title: '项目名或版本号不可为空'
      })
      return
    }
    modifyProject({
      projectId: item.id,
      value: { name, version, project_type }
    }).then(() => {
      dispatch({
        type: 'MODIFY',
        id: item.id,
        item: {
          updatedAt: dayjs().format('YYYY-MM-DD HH:mm'),
          name,
          version,
          project_type
        }
      })
    })
  }
  const goToDetail = id => {
    props.history.push(`/api/manage/projectSurvey?id=${id}`)
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
              type="primary"
              style={{ marginRight: 10 }}
              onClick={() => goToDetail(item.id)}
            >
              查看
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
