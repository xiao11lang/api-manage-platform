import React from 'react'
import {Card,Menu} from 'antd'
export function InfoCard(){
    return (
        <>
            <Card title='未读消息' style={{width:300}}>
                <div>项目通知</div>
                <div>官方通知</div>
                <div>人员通知</div>
            </Card>
        </>
    )
}


