import React, { useReducer, useState, useEffect, useMemo } from 'react'
import { apiGroupReducer } from '../../../../../reducer/apiGroupReducer'
import ApiList from './apiDocument/apiList'
import ApiGroup from './apiDocument/apiGroup'
import ApiCreate from './apiDocument/apiCreate'
import { getApiInstances } from '../../../../../api/apiInstance'
import ApiIntro from './apiDocument/apiIntro';
export default function ApiDocument(props) {
  const id = props.search.split('=')[1]
  const [list, dispatch] = useReducer(apiGroupReducer, [])
  const [dataList, setDataList] = useState([])
  const [groupId, setGroupId] = useState('')
  const [curShowDes, setCurShowDes] = useState('entry')
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
  const apiList = useMemo(() => {
    if(!groupId){
      return dataList
    }
    return dataList.filter(item => {
      return item.group_id === groupId
    })
  }, [dataList, groupId])
  const curItem=useMemo(()=>{
    switch(curShowDes){
      case 'entry':
        return (
          <>
            <ApiGroup
              id={id}
              dispatch={dispatch}
              list={list}
              setGroupId={setGroupId}
            />
            <ApiList showCreate={()=>{setCurShowDes('create')}} id={id} dataList={apiList} showIntro={()=>{setCurShowDes('introduction')}}/>
          </>
        )
        case 'create':
          return <ApiCreate hide={()=>{setCurShowDes('entry')}} id={id} />
          case 'introduction':
            return <ApiIntro hide={()=>{setCurShowDes('entry')}}/>
            default: 
            return (
              <>
                <ApiGroup
                  id={id}
                  dispatch={dispatch}
                  list={list}
                  setGroupId={setGroupId}
                />
                <ApiList showCreate={()=>{setCurShowDes('create')}} id={id} dataList={apiList} showIntro={()=>{setCurShowDes('introduction')}} />
              </>
            )
    }
  },[apiList, curShowDes, id, list])
  return (
    <>
      <div className="api-document">
        {
          curItem
        }
      </div>
    </>
  )
}
