import React from 'react'
import * as Showdown from 'showdown'
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
})
export default function PreviewMD(props) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: converter.makeHtml(props.detail) }}
      style={props.style}
    ></div>
  )
}
