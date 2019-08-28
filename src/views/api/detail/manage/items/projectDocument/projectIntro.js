import React from 'react'
import * as Showdown from 'showdown'
import { GeneralBack } from 'components'
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
})
export default function ProjectIntro(props) {
  return (
    <div className="api-project-intro width-full">
      <GeneralBack simple hide={props.hide}/>
      <div
        dangerouslySetInnerHTML={{ __html: converter.makeHtml(props.detail) }}
      ></div>
    </div>
  )
}
