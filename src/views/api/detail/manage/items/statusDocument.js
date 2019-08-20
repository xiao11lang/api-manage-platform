import React from 'react'
import GeneralGroup from './../../../../../components/generalGroup'
import GeneralList from './../../../../../components/generalList'
import { addTopGroup } from './../../../../../api/statusGroup';
export default function StatusDocument() {
  const handleAdd=()=>{
    addTopGroup({
      name:'测试',
      project_id:1,
      operator:'xmy',
    })
  }
  return (
    <div className="api-status-document flex height-full">
      <GeneralGroup list={[]} add={handleAdd}/>
      <GeneralList createTitle='新建'/>
    </div>
  )
}
