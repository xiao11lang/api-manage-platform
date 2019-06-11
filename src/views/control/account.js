import {Button,Icon,Card} from 'antd'
import React,{useState,useContext} from 'react'
import {AccountModal} from './accountModal'
import './control.scss'
import {UserCtx} from '../../App'
export function AccountManage(){
    const [modalVisible,setModalVisible]=useState(false)
    const {userInfo}=useContext(UserCtx)
    return (
        <>
        <Card className='accountManage' >
            <Icon type='user'/>
            <span style={{margin:'0 24px'}}>{userInfo.name}</span>
            <Button onClick={()=>setModalVisible(true)}>账户管理</Button>
        </Card>
        <AccountModal visible={modalVisible} hide={()=>setModalVisible(false)}/>
        </>
    )
}