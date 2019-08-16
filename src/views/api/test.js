import React from 'react'
import {Table,Button} from 'antd'
const {Column} =Table
const columnConfig=[{
    title:'名称',
    dataIndex:'name'
},{
    title:'版本号',
    dataIndex:'version'
},{
    title:'类型',
    dataIndex:'type'
},{
    title:'最后更新时间',
    dataIndex:'lastModified',
},{
    title:'操作',
    render:()=>{
        return <>
        <Button type='link' style={{padding:0}}>编辑</Button>
        <Button type='link'>移动</Button>
        <Button type='link'>删除</Button>
    </>
    },
    align:'left'
}]
export function Test(){
    const dataSource=[{
        name:'测试',
        version:'1.0',
        type:'web',
        lastModified:'2019-06-04 13:00',
        key:1
    }]
    const coulmns=columnConfig.map((column,index)=>{
        return <Column  key={index} align='center' {...column}></Column>
    })
    return (
        <>
            <Table dataSource={dataSource} className='top-20'>
                {coulmns}
            </Table>
        </>
    )
}
