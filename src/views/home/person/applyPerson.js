import React from 'react'
import {Table,Button} from 'antd'
const {Column} =Table
const columnConfig=[{
    title:'用户名',
    dataIndex:'name'
},{
    title:'性别',
    dataIndex:'sex'
},{
    title:'申请时间',
    dataIndex:'lastModified',
},{
    title:'操作',
    render:()=>{
        return <>
        <Button type='primary' style={{marginRight:20}}>同意</Button>
        <Button type='danger'>拒绝</Button>
    </>
    },
    align:'left'
}]
export function ApplyPerson(){
    const dataSource=[{
        name:'xmy',
        sex:'男',
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
