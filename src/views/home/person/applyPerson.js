import React from 'react'
import {Table,Button} from 'antd'
import dayjs from 'dayjs'
const {Column} =Table
const columnConfig=[{
    title:'用户名',
    dataIndex:'name'
},{
    title:'性别',
    dataIndex:'sex'
},{
    title:'申请时间',
    dataIndex:'createdAt',
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
export function ApplyPerson(props){
    const dataSource=props.applyList.map((item,index)=>{
        const {name,sex,createdAt}=item
        return {
            name:name,
            sex:sex,
            createdAt:dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss'),
            key:index
        }
    })
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
