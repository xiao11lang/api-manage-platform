import React, { useEffect, useState, useMemo } from 'react'
import { Table, Button } from 'antd'
import { addTopGroup, getGroups, deleteGroup } from 'api/statusGroup'
import { GeneralGroup, GeneralList } from '@/components'
import { getProjectDocuments, deleteProjectDocument } from 'api/projectDocument'
import format from 'until/format'
import ProjectCreate from './projectDocument/projectCreate'
export default function ProjectDocument(props) {
  const id = props.search.split('=')[1]
  const [groupList, setGroupList] = useState([])
  const [createShow, setCreateShow] = useState(false)
  const [list, setList] = useState([])
  const [groupId, setGroupId] = useState('')
  const [curDoc, setCurDoc] = useState(null)
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
  const handleDocAdd = () => {
    setCreateShow(true)
    setCurDoc(null)
  }
  const modifyDocument = item => {
    setCreateShow(true)
    setCurDoc(item)
  } //修改文档
  const handleStatusDelete = projectId => {
    deleteProjectDocument({
      id: projectId
    }).then(() => {
      const filterList = list.filter(item => {
        return item.id !== projectId
      })
      setList([...filterList])
    })
  } //删除文档
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
    if(createShow) return 
    getProjectDocuments({
      id: id
    }).then(res => {
      setList(res.list)
    })
  }, [id,createShow]) //获取文档
  const dataList = useMemo(() => {
    if (!groupId) {
      return list
    } else {
      return list.filter(item => {
        return item.group_id === groupId
      })
    }
  }, [list, groupId])
  const columnConfig = [
    {
      title: '名称',
      dataIndex: 'name'
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      render: v => <>{format(v)}</>
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
              onClick={() => modifyDocument(item)}
            >
              编辑
            </Button>
            <Button
              type="primary"
              className="right-10"
              onClick={() => modifyDocument(item)}
            >
              查看
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
      {!createShow ? (
        <>
          <GeneralGroup
            list={groupList}
            add={handleAdd}
            delete={handleDelete}
            itemClick={filterCode}
          />
          <GeneralList createTitle="新建" add={handleDocAdd}>
            <Table dataSource={dataList} columns={columnConfig} rowKey="id" />
          </GeneralList>
        </>
      ) : (
        <ProjectCreate
          hide={() => setCreateShow(false)}
          groupList={groupList}
          id={id}
          doc={curDoc}
        />
      )}
    </div>
  )
}
