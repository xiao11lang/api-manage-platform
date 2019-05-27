import React from 'react'
import {InfoRow} from './infoRow'
import {Input} from 'antd'
export function Password(){
    return (
        <>
            <InfoRow label='旧密码' style={{ margin: "20px 0" }}>
                <Input style={{width:250}}/>
            </InfoRow>
            <InfoRow label='新密码' style={{ marginBottom: 20 }}>
                <Input style={{width:250}}/>
            </InfoRow>
            <InfoRow label='确认新密码'>
                <Input style={{width:250}}/>
            </InfoRow>
        </>
    )
}