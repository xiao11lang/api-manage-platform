import React from 'react'
import format from '../../../../../until/format'
const itemMap = {
  name: '项目名称',
  interface_number: '接口数目',
  version: '版本号',
  project_type: '项目类型',
  updatedAt: '最后更新时间',
  code_number: '状态码数目',
  person_number: '项目组成员'
}
export default function ProjectSurvey(props) {
  const { name } = props.info
  const list = []
  Object.keys(itemMap).forEach(item => {
    list.push({
      name: itemMap[item],
      value: item === 'updatedAt' ? format(props.info[item]) : props.info[item]
    })
  })
  const itemList = list.map(item => {
    return (
      <div className="survey-item" key={item.name}>
        <div className="item-top">{item.value}</div>
        <div className="item-bottom">{item.name}</div>
      </div>
    )
  })
  return (
    <div className="project-survey">
      <div className="survey-left">
        <div className="survey-title">{name}</div>
        <div className="surcey-item-con">{itemList}</div>
      </div>
    </div>
  )
}
