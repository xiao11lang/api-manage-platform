import React from 'react'
import GeneralGroup from './../../../../../components/generalGroup'
import GeneralList from './../../../../../components/generalList'
export default function StatusDocument() {
  return (
    <div className="api-status-document flex height-full">
      <GeneralGroup list={[]}/>
      <GeneralList createTitle='新建'/>
    </div>
  )
}
