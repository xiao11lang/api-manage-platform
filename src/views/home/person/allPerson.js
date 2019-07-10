import React from 'react'
import {Table,Button,Select} from 'antd'
const {Column} =Table
const {Option}=Select
const columnConfig=[{
    title:'用户名',
    dataIndex:'name'
},{
    title:'性别',
    dataIndex:'sex'
},{
    title:'权限',
    dataIndex:'role',
    render:()=>{
        return <Select
        defaultValue="none"
        style={{ width: 200 }}
      >
        <Option value="none">不设置</Option>
        <Option value="admin">设置为管理员</Option>
        <Option value="read">设置为只读成员</Option>
        <Option value="read_write">设置为读写成员 </Option>
      </Select>
    }
},{
    title:'最后更新时间',
    dataIndex:'lastModified',
},{
    title:'操作',
    render:()=>{
        return <>
        <Button type='danger'>删除</Button>
    </>
    },
    align:'left'
}]
export function AllPerson(){
    const dataSource=[{
        name:'xmy',
        sex:'1.0',
        type:'web',
        lastModified:'2019-06-04 13:00',
        key:1
    }]
    const coulmns=columnConfig.map((column,index)=>{
        return <Column  key={index} align='center' {...column}></Column>
    })
    return (
        <>
            <Table dataSource={dataSource} style={{marginTop:20}}>
                {coulmns}
            </Table>
        </>
    )
}
