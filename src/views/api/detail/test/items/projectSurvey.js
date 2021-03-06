import React, { useEffect, useState } from 'react'
import format from 'until/format'
import { getProject } from 'api/testProject'
const itemMap = {
  name: '项目名称',
  case_number: '测试用例数目',
  version: '版本号',
  updatedAt: '最后更新时间',
  person_number: '项目组成员'
}
export default function ProjectSurvey(props) {
  const { name } = props.info
  const id = props.search.split('=')[1]
  const [activity, setActivity] = useState([])
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
  const activityList = activity.map(ac => {
    return <div key={ac.id}>{ac.description}<span>操作时间：{format(ac.updatedAt)}</span></div>
  })
  useEffect(() => {
    getProject({
      id: id
    }).then(res => {
      props.setProjectInfo(res.list[0])
      setActivity(res.activities.reverse().slice(0,10))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  return (
    <div className="project-survey">
      <div className="survey-left">
        <div className="survey-title">{name}</div>
        <div className="surcey-item-con">{itemList}</div>
      </div>
      <div className="survey-right">
        <div className='activity-title'>项目动态（最近10条）</div>
        {activityList}
      </div>
    </div>
  )
}
