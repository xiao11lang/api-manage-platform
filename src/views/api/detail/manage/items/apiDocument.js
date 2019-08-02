import React, { useReducer,useState } from 'react'
import { apiGroupReducer } from '../../../../../reducer/apiGroupReducer'
import ApiList from './apiDocument/apiList'
import ApiGroup from './apiDocument/apiGroup'
import ApiCreate from './apiDocument/apiCreate';
export default function ApiDocument(props) {
  const id = props.search.split('=')[1]
  const [list, dispatch] = useReducer(apiGroupReducer, [])
  const [show,setShow]=useState(true)
  const showCreate=()=>{
    setShow(false)
  }
  return (
    <>
      <div className="api-document">
        {show ? (
          <>
            <ApiGroup id={id} dispatch={dispatch} list={list} />
            <ApiList show={showCreate}/>
          </>
        ) : <ApiCreate/>}
      </div>
    </>
  )
}
