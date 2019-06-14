import React,{useContext} from 'react'
import {Card} from 'antd'
import { MessageCtx } from '../home/home';
function CardRow(props){
    const setMessageKey=useContext(MessageCtx)
    return (
        <div className='message-row' onClick={()=>{setMessageKey(props.mesKey)}}>
            <span>{props.title}</span>
            <span>{props.count}</span>
        </div>
    )
}
export function InfoCard(props){
    const list=props.mesList.map((value,index)=>{
        return <CardRow {...value} key={index} mesKey={String(index+1)}></CardRow>
    })
    return (
        <>
            <Card title='未读消息' style={{width:300}} className='info-card'>
                {list}
            </Card>
        </>
    )
}


