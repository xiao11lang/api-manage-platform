import React, { useEffect, useState } from 'react'
import { Table, Button, Input, Tooltip, Modal } from 'antd'
import { getProjects, deleteProject, updateProject } from 'api/testProject'
import { useInputChange } from 'hooks/useInputChange'
import format from 'until/format'
import { SimpleModal } from '@/components'
const { Column } = Table
const { TextArea } = Input
export function Test(props) {
  const name = useInputChange('')
  const version = useInputChange('')
  const [modalShow, setModalShow] = useState(false)
  const des = useInputChange('')
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
  const handleDelete = async id => {
    try {
      const { status } = await deleteProject({ id })
      if (status === 1) {
        props.dispatch({
          type: 'DELETE',
          id
        })
      }
    } catch (e) {}
  }
  const handleUpdate = id => {
    if (!name.value) {
      return
    }
    updateProject({
      projectId: id,
      value: {
        name: name.value,
        version: version.value
      }
    })
  }
  const handleDesChange = () => {
    setModalShow(false)
    Modal.info({
      title: '修改成功，请点击保存',
      okText:'确认'
    })
  }
  const columnConfig = [
    {
      title: '名称',
      dataIndex: 'name',
      render(v) {
        return <Input {...name} value={name.value||v}  />
      }
    },
    {
      title: '版本号',
      dataIndex: 'version',
      render(v) {
        return <Input placeholder={v} {...version} />
      }
    },
    {
      title: '描述',
      dataIndex: 'project_des',
      align: 'center',
      render(v) {
        return (
          <Tooltip title={v}>
            <div
              className="ellipsis width-200 inline-block"
              onClick={() => setModalShow(true)}
            >
              {v}
            </div>
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
            <Button
              type="primary"
              className="right-10"
              onClick={() => handleUpdate(item.id)}
            >
              保存
            </Button>
            <Button type="primary" className="right-10">
              查看
            </Button>
            <Button type="danger" onClick={() => handleDelete(item.id)}>
              删除
            </Button>
          </>
        )
      },
      align: 'left'
    }
  ]
  const coulmns = columnConfig.map((column, index) => {
    return <Column key={index} align="center" {...column}></Column>
  })
  return (
    <>
      <Table dataSource={props.list} className="top-20" rowKey="id">
        {coulmns}
      </Table>
      <SimpleModal
        hide={() => setModalShow(false)}
        title="修改描述"
        modalShow={modalShow}
        onOk={handleDesChange}
      >
        <TextArea {...des} />
      </SimpleModal>
    </>
  )
}
