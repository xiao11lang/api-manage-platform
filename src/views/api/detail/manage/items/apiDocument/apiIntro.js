import React from 'react'
import { Icon, Divider, Tag,Table,Tabs } from 'antd'
import ApiTag, { MethodTag, ProtocolTag } from './apiTag'
import * as Showdown from 'showdown'
const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  })
const {TabPane}=Tabs
function FrontTitle(props) {
  return (
    <div className="front-title">
      <span className="front">{props.title}</span>
      {props.children}
    </div>
  )
}
function Param(props){
    const columnConfig=[{
        title:'参数名',
        dataIndex:'name',
    },{
        title:'类型',
        dataIndex:'type',
    },{
        title:'必填',
        dataIndex:'required',
    },{
        title:'说明',
        dataIndex:'description',
    }]
    return <Table columns={columnConfig} dataSource={props.data} pagination={false}/>
}
function Pre(data){
    const parseData=JSON.stringify(data,null,4)
    return <pre>{parseData}</pre>
}
export default function ApiIntro(props) {
  return (
    <div className="api-intro">
      <div onClick={props.hide} className="api-intro-top">
        <Icon type="rollback" style={{ marginRight: 10 }} />
        <span>返回API列表</span>
      </div>
      <div className="api-intro-main">
        <div className="api-intro-meta">
          <div className="meta-top">
            <ProtocolTag protocol="Http://" />
            <MethodTag method="post" />
            <ApiTag status="enabled" />
          </div>
          <div className="meta-middle">
            <div>wwww.baidu.com</div>
            <div>测试接口1</div>
          </div>
          <div className="meta-bottom">
            <span>分组：测试分组1</span>
            <span>最后更新者</span>
            <span>更新时间：2019-08-12 15:32</span>
          </div>
        </div>
        <Divider />
        <div className="api-intro-request">
          <FrontTitle title="Body 请求参数">
            <Tag color="#333">JSON</Tag>
            <Tag color="#333">最外层结构为object</Tag>
          </FrontTitle>
          <Param data={[{name:'code',type:'object',required:'yes',description:'用户代码',key:1}]}/>
        </div>
        <div className="api-intro-response">
          <FrontTitle title="返回参数">
            <Tag color="#333">JSON</Tag>
            <Tag color="#333">最外层结构为object</Tag>
          </FrontTitle>
          <Param data={[{name:'code',type:'object',required:'yes',description:'用户代码',key:1}]}/>
        </div>
        <div className="api-intro-example">
          <FrontTitle title="返回示例" />
          <Tabs defaultActiveKey='1'>
              <TabPane key='1' tab='成功示例'><Pre data={{detail:1,code:1,user:{name:'ch'}}}/></TabPane>
              <TabPane key='2' tab='失败示例'><Pre data={{detail:1,code:1,user:{name:'ch'}}}/></TabPane>
          </Tabs>
        </div>
        <div className="api-intro-extra">
          <FrontTitle title="额外说明" />
          <div dangerouslySetInnerHTML={{__html:converter.makeHtml('### 标题1. 段落1 2. 段落2')}}></div>
        </div>
      </div>
    </div>
  )
}
