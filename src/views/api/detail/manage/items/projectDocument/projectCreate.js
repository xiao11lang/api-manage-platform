import React from 'react'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
})
export default function ProjectCreate() {
  const [selectedTab, setSelectedTab] = React.useState('write')
  return (
    <div className="api-project-create">
      <ReactMde
        // value={detailDes}
        // onChange={setDetailDes}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        l18n={{ write: '编辑', preview: '预览' }}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
    </div>
  )
}
