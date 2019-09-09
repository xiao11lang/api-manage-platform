import React from 'react'
import {Card,Switch} from 'antd'
export function Mail(){
    return (
        <>
            <Card className='mail' style={{margin:20}}>
                <span className='about'>获取关于API Master的最新更新消息</span>
                <Switch/>
            </Card>
        </>
    )
}