import React from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/github'
export default function Editor(props) {
  return (
    <AceEditor
      mode="javascript"
      theme="github"
      name="UNIQUE_ID_OF_DIV"
      style={props.style}
      editorProps={{ $blockScrolling: true }}
      onChange={props.onChange}
      value={props.value}
      readOnly={props.readOnly}
    />
  )
}
