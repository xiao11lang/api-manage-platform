import React, { useEffect, useState, useMemo } from 'react'
import { Table, Button, Select, Input } from 'antd'
import { addTopGroup, getGroups, deleteGroup } from 'api/statusGroup'
import { SimpleModal, GeneralGroup, GeneralList } from '@/components'
import {
  addStatusInstance,
  getStatusInstances,
  deleteStatusInstance,
  updateStatusInstance
} from 'api/statusInstance'
import format from 'until/format'
const { Option } = Select
export default function StatusDocument(props) {
  const id = props.search.split('=')[1]
  const [groupList, setGroupList] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [codeList, setCodeList] = useState([])
  const [groupId, setGroupId] = useState('')
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [group, setGroup] = useState('0')
  const [mode, setMode] = useState('new')
  const [instance, setInstance] = useState({})
  const handleAdd = name => {
    addTopGroup({
      name: name,
      project_id: id
    }).then(res => {
      setGroupList([...groupList, res.item])
    })
  } //添加分组
  const handleDelete = groupId => {
    deleteGroup({
      id: groupId,
      projectId: id
    }).then(() => {
      setGroupList(
        groupList.filter(group => {
          return group.id !== groupId
        })
      )
    })
  } //删除分组
  const handleStatusAdd = async () => {
    if (mode === 'new') {
      const res = await addStatusInstance({
        name: name,
        projectId: id,
        groupId: group.value,
        code: code
      })
      setCodeList([...codeList, res.item])
    } else {
      await updateStatusInstance({
        ...instance,
        ...{
          name: name,
          code: code,
          groupId: group
        }
      })
      const res = await getStatusInstances({
        id: id
      })
      setCodeList(res.list)
    }
  } //添加或修改状态码
  const modifyInstance = item => {
    setMode('edit')
    setModalShow(true)
    setInstance(item)
    setName(item.name)
    setCode(item.code)
    setGroup(item.group_id)
  } //修改状态码
  const handleStatusDelete = statusId => {
    deleteStatusInstance({
      id: statusId,
      projectId: id
    }).then(() => {
      const list = codeList.filter(item => {
        return item.id !== statusId
      })
      setCodeList([...list])
    })
  } //删除状态码
  const filterCode = id => {
    setGroupId(id)
  } //按组筛选
  useEffect(() => {
    getGroups({
      id: id
    }).then(res => {
      setGroupList(res.list)
    })
  }, [id]) //获取分组
  useEffect(() => {
    getStatusInstances({
      id: id
    }).then(res => {
      setCodeList(res.list)
    })
  }, [id]) //获取状态码
  const dataList = useMemo(() => {
    if (!groupId) {
      return codeList
    } else {
      return codeList.filter(item => {
        return item.group_id === groupId
      })
    }
  }, [codeList, groupId])
  const groupSelect = useMemo(() => {
    return groupList.map(gr => {
      return (
        <Option value={gr.id} key={gr.id}>
          {gr.name}
        </Option>
      )
    })
  }, [groupList])
  const columnConfig = [
    {
      title: '状态码',
      dataIndex: 'code'
    },
    {
      title: '描述',
      dataIndex: 'name'
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      render: v => <>{format(v)}</>
    },
    {
      title: '操作',
      render(item) {
        return (
          <>
            <Button
              type="primary"
              className="right-10"
              onClick={() => modifyInstance(item)}
            >
              编辑
            </Button>
            <Button type="danger" onClick={() => handleStatusDelete(item.id)}>
              删除
            </Button>
          </>
        )
      }
    }
  ]
  return (
    <div className="api-status-document flex height-full">
      <GeneralGroup
        list={groupList}
        add={handleAdd}
        delete={handleDelete}
        itemClick={filterCode}
      />
      <GeneralList createTitle="新建" add={() => setModalShow(true)}>
        <Table dataSource={dataList} columns={columnConfig} rowKey="id" />
      </GeneralList>
      <SimpleModal
        modalShow={modalShow}
        hide={() => setModalShow(false)}
        onOk={handleStatusAdd}
        simple={false}
        title={mode === 'new' ? '新建一个状态码' : '修改状态码'}
      >
        <>
          <label className="block bottom-10">选择分组</label>
          <Select
            className="width-full"
            value={group}
            onChange={v => setGroup(v)}
          >
            {<Option value={0}>默认分组</Option>}
            {groupSelect}
          </Select>
          <label className="block bottom-10 top-10">状态码</label>
          <Input value={code} onChange={e => setCode(e.target.value)} />
          <label className="block bottom-10 top-10">描述</label>
          <Input value={name} onChange={e => setName(e.target.value)} />
        </>
      </SimpleModal>
    </div>
  )
}
