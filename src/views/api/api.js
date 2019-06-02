import React,{useContext} from 'react'
import {Manage} from './manage'
import {Test} from './test'
import {ApiCtx} from '../home/home'
export function Api(){
    const key=useContext(ApiCtx)
    return (
        <>
            {key==='2'?<Manage/>:<Test/>}
        </>
    )
}
