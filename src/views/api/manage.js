import React from 'react'
import {Table,Button,Input} from 'antd'
import { useInputChange } from '../../hooks/useInputChange';
const {Column} =Table

export function Manage(){
    const name=useInputChange('')
    const version=useInputChange('')
    const columnConfig=[{
        title:'名称',
        dataIndex:'name',
        render:(v)=>{
            return <Input {...name} placeholder={v}/>
        }
    },{
        title:'版本号',
        dataIndex:'version',
        render:(v)=>{
            return <Input value={v} {...version} placeholder={v}/>
        }
    },{
        title:'类型',
        dataIndex:'type',
        render:(v)=>{
            return <Input value={v}/>
        }
    },{
        title:'最后更新时间',
        dataIndex:'lastModified',
    },{
        title:'操作',
        render:()=>{
            return <>
            <Button type='primary' style={{marginRight:10}}>保存</Button>
            <Button type='danger'>删除</Button>
        </>
        },
        align:'left'
    }]
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
            <Table dataSource={dataSource} style={{marginTop:20}}>
                {coulmns}
            </Table>
        </>
    )
}
