import React, { useEffect, useState } from 'react'
import { Table, Button, Select, Input } from 'antd'
import GeneralGroup from './../../../../../components/generalGroup'
import GeneralList from './../../../../../components/generalList'
import {
  addTopGroup,
  getGroups,
  deleteGroup
} from './../../../../../api/statusGroup'
import SimpleModal from '../../../../../components/simpleModal'
import {
  addStatusInstance,
  getStatusInstances
} from './../../../../../api/statusInstance'
import { useInputChange } from '../../../../../hooks/useInputChange'
import { useSelectChange } from './../../../../../hooks/useSelectValue'
import format from '../../../../../until/format'
const { Option } = Select
export default function StatusDocument(props) {
  const id = props.search.split('=')[1]
  const [groupList, setGroupList] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [codeList, setCodeList] = useState([])
  const name = useInputChange('')
  const code = useInputChange('')
  const group = useSelectChange('0')
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
  const handleStatusAdd = () => {
    addStatusInstance({
      name: name.value,
      projectId: id,
      groupId: group.value,
      code: code.value
    })
  }
  useEffect(() => {
    getGroups({
      id: id
    }).then(res => {
      setGroupList(res.list)
    })
  }, [id])
  useEffect(() => {
    getStatusInstances({
      id: id
    }).then(res => {
      setCodeList(res.list)
    })
  }, [id])
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
      render() {
        return (
          <>
            <Button type="primary" className="right-10">
              编辑
            </Button>
            <Button type="danger">删除</Button>
          </>
        )
      }
    }
  ]
  return (
    <div className="api-status-document flex height-full">
      <GeneralGroup list={groupList} add={handleAdd} delete={handleDelete} />
      <GeneralList createTitle="新建" add={() => setModalShow(true)}>
        <Table dataSource={codeList} columns={columnConfig} rowKey="id" />
      </GeneralList>
      <SimpleModal
        modalShow={modalShow}
        hide={() => setModalShow(false)}
        onOk={handleStatusAdd}
        simple={false}
        title="新建一个状态码"
      >
        <>
          <label className="block bottom-10">选择分组</label>
          <Select defaultValue="0" className="width-full" {...group}>
            <Option value="0">默认分组</Option>
            <Option value="1">测试分组1</Option>
            <Option value="2">测试分组2</Option>
          </Select>
          <label className="block bottom-10 top-10">状态码</label>
          <Input {...code} />
          <label className="block bottom-10 top-10">描述</label>
          <Input {...name} />
        </>
      </SimpleModal>
    </div>
  )
}
