import React, { useState } from 'react'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'
import { Button, Icon, Input, Select } from 'antd'
import './projectCreate.scss'
import { addProjectDocument, updateProjectDocument } from 'api/projectDocument'
import { useInputChange } from 'hooks/useInputChange'
import { useSelectChange } from 'hooks/useSelectValue'
const { Option } = Select
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
})
export default function ProjectCreate(props) {
  const [selectedTab, setSelectedTab] = React.useState('write')
  const doc = props.doc
  const name = useInputChange((doc && doc.name) || '')
  const group = useSelectChange((doc && doc.group_id) || '')
  const [detail, setDetail] = useState((doc && doc.detail) || '')
  const save = () => {
    if (doc) {
      updateProjectDocument({
        id: doc.id,
        name: name.value,
        groupId: group.value,
        detail: detail
      })
    } else {
      addProjectDocument({
        name: name.value,
        projectId: props.id,
        groupId: group.value,
        detail: detail
      })
    }
  }
  const options = props.groupList.map(gr => {
    return (
      <Option value={gr.id} key={gr.id}>
        {gr.name}
      </Option>
    )
  })
  return (
    <div className="api-project-create width-full">
      <div className="general-top-save">
        <div onClick={props.hide}>
          <Icon type="rollback" className="right-10" />
          <span>返回API列表</span>
        </div>
        <Button type="primary" className="left-10" onClick={save}>
          保存
        </Button>
      </div>
      <div className="api-project-meta">
        <div className="meta-group flex bottom-10">
          <label>分组</label>
          <Select defaultValue="0" className="width-200" {...group}>
            <Option value="0">默认分组</Option>
            {options}
          </Select>
        </div>
        <div className="meta-title flex">
          <label>标题</label>
          <Input {...name} />
        </div>
      </div>
      <ReactMde
        value={detail}
        onChange={v => setDetail(v)}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        l18n={{ write: '编辑', preview: '预览' }}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={500}
        minPreviewHeight={500}
      />
    </div>
  )
}
