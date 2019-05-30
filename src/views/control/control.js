import {AccountManage} from './account'
import React from 'react'
import {Divider} from 'antd'
import {InfoCard} from './infoCard'
export function Control(){
    return (
        <>
        <AccountManage/>
        <Divider/>
        <InfoCard/>
        </>
    )
}