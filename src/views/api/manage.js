import React from 'react'
import {Table,Button} from 'antd'
const {Column} =Table
export function Manage(){
    const dataSource=[{
        name:'测试',
        version:'1.0',
        type:'web',
        lastModified:'2019-06-04 13:00',
        key:1
    }]
    return (
        <>
            <Table dataSource={dataSource}>
                <Column title='名称' dataIndex='name' key='name'></Column>
                <Column title='版本号' dataIndex='version' key='version'></Column>
                <Column title='类型' dataIndex='type' key='type'></Column>
                <Column title='最后更新时间' dataIndex='lastModified' key='lastModified'></Column>
                <Column title='操作' render={()=>{
                    return <>
                        <Button type='link'>编辑</Button>
                        <Button type='link'>移动</Button>
                        <Button type='link'>删除</Button>
                    </>
                }} key='action'></Column>
            </Table>
        </>
    )
}
