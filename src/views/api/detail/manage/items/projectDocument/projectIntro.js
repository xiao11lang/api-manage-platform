import React from 'react'
import { GeneralBack } from 'components'
import { PreviewMD } from 'components'
import format from 'until/format'
export default function ProjectIntro(props) {
  return (
    <div className="api-project-intro width-full">
      <GeneralBack simple hide={props.hide} />
      <div className="project-intro-meta white">
        <div className="font-22 bottom-20">{props.doc.name}</div>
        <div className="font-12">
          <span className="right-10">分组：{props.groupName}</span>
          <span>更新时间：{format(props.doc.updatedAt)}</span>
        </div>
      </div>
      <PreviewMD
        detail={props.doc.detail}
        style={{ paddingLeft: 40, background: 'white', height: '100%' }}
      />
    </div>
  )
}
