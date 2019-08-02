import React, { useReducer } from 'react'
import { apiGroupReducer } from '../../../../../reducer/apiGroupReducer'
import ApiList from './apiDocument/apiList';
import ApiGroup from './apiDocument/apiGroup';
export default function ApiDocument(props) {
  const id = props.search.split('=')[1]
  const [list, dispatch] = useReducer(apiGroupReducer,[])
  
  
  return (
    <>
      <div className="api-document">
        <ApiGroup id={id} dispatch={dispatch} list={list}/>
        <ApiList/>
      </div>
    </>
  )
}
