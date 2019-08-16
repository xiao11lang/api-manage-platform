import React, {
  useReducer,
  useState,
  useEffect,
  useMemo,
  useCallback
} from 'react'
import { apiGroupReducer } from '../../../../../reducer/apiGroupReducer'
import ApiList from './apiDocument/apiList'
import ApiGroup from './apiDocument/apiGroup'
import ApiCreate from './apiDocument/apiCreate'
import { getApiInstances, deleteApi } from '../../../../../api/apiInstance'
import ApiIntro from './apiDocument/apiIntro'
export default function ApiDocument(props) {
  const id = props.search.split('=')[1]
  const [list, dispatch] = useReducer(apiGroupReducer, [])
  const [dataList, setDataList] = useState([])
  const [groupId, setGroupId] = useState('')
  const [curShowDes, setCurShowDes] = useState('entry')
  const [apiId, setApiId] = useState('')
  const [mode,setMode]=useState('new')
  useEffect(() => {
    if(curShowDes!=='entry'){
      return 
    }
    getApiInstances({
      projectId: id
    }).then(res => {
      res.list = res.list.map(item => {
        return { ...item, key: item.id }
      })
      setDataList(res.list)
    })
  }, [id,curShowDes])
  const apiList = useMemo(() => {
    if (!groupId) {
      return dataList
    }
    return dataList.filter(item => {
      return item.group_id === groupId
    })
  }, [dataList, groupId])
  const showIntro = id => {
    setCurShowDes('introduction')
    setApiId(id)
  }
  const handleDelete = useCallback(
    async id => {
      await deleteApi({ id: id })
      setDataList(
        dataList.filter(item => {
          return item.id !== id
        })
      )
    },
    [dataList]
  )
  const handleDeleteGroup = useCallback(
    async id => {
      setDataList(
        dataList.filter(item => {
          return item.group_id !== id
        })
      )
    },
    [dataList]
  )
  const handleEdit=(id)=>{
    setCurShowDes('create')
    setMode('edit')
    setApiId(id)
  }
  const showCreate=()=>{
    setCurShowDes('create')
    setMode('new')
  }
  const hide=()=>{
    setCurShowDes('entry')
    setMode('new')
  }
  const curItem = useMemo(() => {
    switch (curShowDes) {
      case 'entry':
        return (
          <>
            <ApiGroup
              id={id}
              dispatch={dispatch}
              list={list}
              setGroupId={setGroupId}
              handleDeleteGroup={handleDeleteGroup}
            />
            <ApiList
              showCreate={showCreate}
              id={id}
              dataList={apiList}
              showIntro={showIntro}
              handleDelete={handleDelete}
              edit={handleEdit}
            />
          </>
        )
      case 'create':
        return (
          <ApiCreate
            hide={hide}
            id={id}
            mode={mode}
            apiId={apiId}
          />
        )
      case 'introduction':
        return (
          <ApiIntro
            hide={hide}
            id={apiId}
            list={list}
          />
        )
      default:
        return (
          <>
            <ApiGroup
              id={id}
              dispatch={dispatch}
              list={list}
              setGroupId={setGroupId}
            />
            <ApiList
              showCreate={showCreate}
              id={id}
              dataList={apiList}
              showIntro={() => {
                setCurShowDes('introduction')
              }}
              handleDelete={handleDelete}
              edit={handleEdit}
            />
          </>
        )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiId, apiList, curShowDes, id, list, mode])
  return (
    <>
      <div className="api-document">{curItem}</div>
    </>
  )
}
