import React, { useReducer, useState, useEffect, useMemo } from 'react'
import { apiGroupReducer } from '../../../../../reducer/apiGroupReducer'
import ApiList from './apiDocument/apiList'
import ApiGroup from './apiDocument/apiGroup'
import ApiCreate from './apiDocument/apiCreate'
import { getApiInstances } from '../../../../../api/apiInstance'
export default function ApiDocument(props) {
  const id = props.search.split('=')[1]
  const [list, dispatch] = useReducer(apiGroupReducer, [])
  const [show, setShow] = useState(false)
  const [dataList, setDataList] = useState([])
  const [groupId, setGroupId] = useState('')
  useEffect(() => {
    getApiInstances({
      projectId: id
    }).then(res => {
      res.list=res.list.map((item)=>{
        return {...item,key:item.id}
      })
      setDataList(res.list)
    })
  }, [id])
  const showCreate = () => {
    setShow(true)
  }
  const hideCreate = () => {
    setShow(false)
  }
  const apiList = useMemo(() => {
    if(!groupId){
      return dataList
    }
    return dataList.filter(item => {
      return item.group_id === groupId
    })
  }, [dataList, groupId])
  return (
    <>
      <div className="api-document">
        {!show ? (
          <>
            <ApiGroup
              id={id}
              dispatch={dispatch}
              list={list}
              setGroupId={setGroupId}
            />
            <ApiList show={showCreate} id={id} dataList={apiList} />
          </>
        ) : (
          <ApiCreate hide={hideCreate} id={id} />
        )}
      </div>
    </>
  )
}
