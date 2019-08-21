import React from 'react'
import { Button } from 'antd'
export default function GeneralList(props) {
  return (
    <div className="general-list-con">
      <div className="list-top">
        <Button icon="plus" type="primary" onClick={props.add}>
          {props.createTitle}
        </Button>
      </div>
      {/* <Table dataSource={props.dataList}>{coulmns}</Table> */}
      {props.children}
    </div>
  )
}
