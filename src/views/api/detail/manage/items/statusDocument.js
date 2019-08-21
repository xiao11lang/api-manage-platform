import React, { useEffect, useState } from 'react'
import { Table, Button } from 'antd'
import GeneralGroup from './../../../../../components/generalGroup'
import GeneralList from './../../../../../components/generalList'
import {
  addTopGroup,
  getGroups,
  deleteGroup
} from './../../../../../api/statusGroup'
export default function StatusDocument(props) {
  const id = props.search.split('=')[1]
  const [groupList, setGroupList] = useState([])
  const handleAdd = name => {
    addTopGroup({
      name: name,
      project_id: id
    }).then(res => {
      setGroupList([...groupList, res.item])
    })
  }
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
  }
  useEffect(() => {
    getGroups({
      id: id
    }).then(res => {
      setGroupList(res.list)
    })
  }, [id])
  const columnConfig=[{
    title:"状态码",
    dataIndex:'code'
  },{
    title:"描述",
    dataIndex:'des'
  },{
    title:"分组",
    dataIndex:'group'
  },{
    title:"操作",
    render(){
      return <>
        <Button type='primary' className='right-10'>编辑</Button>
        <Button type='danger'>删除</Button>
      </>
    }
  }]
  return (
    <div className="api-status-document flex height-full">
      <GeneralGroup list={groupList} add={handleAdd} delete={handleDelete} />
      <GeneralList createTitle="新建" >
        <Table dataSource={[]} columns={columnConfig}></Table>
      </GeneralList>
    </div>
  )
}
