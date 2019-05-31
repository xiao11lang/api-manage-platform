import React from 'react'
import {Card} from 'antd'
function CardRow(props){
    return (
        <div className='message-row'>
            <span>{props.title}</span>
            <span>{props.number}</span>
        </div>
    )
}
export function InfoCard(props){
    const list=props.cardList.map((value,index)=>{
        return <CardRow {...value} key={index}></CardRow>
    })
    return (
        <>
            <Card title='未读消息' style={{width:300}} className='info-card'>
                {list}
            </Card>
        </>
    )
}


