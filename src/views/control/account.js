import {Button,Icon,Card} from 'antd'
import React from 'react'
import './control.scss'
export function AccountManage(){
    return (
        <Card className='accountManage' >
            <Icon type='user'/>
            <span style={{margin:'0 24px'}}>小食蚁螂</span>
            <Button>账户管理</Button>
        </Card>
    )
}