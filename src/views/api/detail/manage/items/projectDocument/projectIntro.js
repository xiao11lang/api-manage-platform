import React from 'react'
import { GeneralBack } from 'components'
import { PreviewMD } from 'components'
import { Divider } from 'antd'
import format from 'until/format'
export default function ProjectIntro(props) {
  const { name, updatedAt, detail } = props.doc
  return (
    <div className="api-project-intro width-full white">
      <GeneralBack simple hide={props.hide} title='返回项目列表'/>
      <Divider className='top-10 bottom-10'/>
      <div className="project-intro-meta">
        <div className="font-22 bottom-20">{name}</div>
        <div className="font-12">
          <span className="right-10">分组：{props.groupName}</span>
          <span>更新时间：{format(updatedAt)}</span>
        </div>
      </div>
      <Divider />
      <PreviewMD
        detail={detail}
        style={{ paddingLeft: 40, background: 'white', height: '100%' }}
      />
    </div>
  )
}
