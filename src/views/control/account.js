import {Button,Icon,Card} from 'antd'
import React,{useState} from 'react'
import {AccountModal} from './accountModal'
import './control.scss'
export function AccountManage(){
    const [modalVisible,setModalVisible]=useState(false)
    return (
        <>
        <Card className='accountManage' >
            <Icon type='user'/>
            <span style={{margin:'0 24px'}}>小食蚁螂</span>
            <Button onClick={()=>setModalVisible(true)}>账户管理</Button>
        </Card>
        <AccountModal visible={modalVisible} hide={()=>setModalVisible(false)}/>
        </>
    )
}