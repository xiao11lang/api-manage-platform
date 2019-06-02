import React,{useContext} from 'react'
import {Manage} from './manage'
import {Test} from './test'
import {ApiCtx} from '../home/home'
import {TopAction} from './topAction'
import './api.scss'
export function Api(){
    const key=useContext(ApiCtx)
    return (
        <>
        <TopAction/>
            {key==='2'?<Manage/>:<Test/>}
        </>
    )
}
