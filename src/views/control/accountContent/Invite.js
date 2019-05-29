import React,{createRef} from 'react'
import {Card,Button} from 'antd'
export function Invite(){
    const input=createRef()
    const handleCopy=()=>{
        input.current.select()
        document.execCommand('copy')
    }
    return (
        <Card className='invite' style={{margin:20}}>
            <span>邀请注册</span>
            <input className='link' readOnly value='http://www.11lang.cn/apiManage/#/invite' ref={input}/>
            <Button onClick={handleCopy}>复制</Button>
        </Card>
    )
}