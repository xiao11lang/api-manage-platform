import React from 'react'
import {Tabs} from 'antd'
const {TabPane}=Tabs
export default function Request(){
    return (
        <Tabs className='api-create-request' defaultActiveKey="1">
            <TabPane tab='请求头部' key='1'>1</TabPane>
            <TabPane tab='请求参数' key='2'>2</TabPane>
            <TabPane tab='GET/URL参数' key='3'>3</TabPane>
            <TabPane tab='REST参数' key='4'>4</TabPane>
        </Tabs>
    )
}