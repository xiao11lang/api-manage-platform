import React, { useEffect, useState, useMemo } from 'react'
import { Icon, Divider, Tag, Table, Tabs, Spin } from 'antd'
import ApiTag, { MethodTag, ProtocolTag } from './apiTag'
import * as Showdown from 'showdown'
import { getApiInfo } from '../../../../../../api/apiInstance'
import format from './../../../../../../until/format'
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
})
const { TabPane } = Tabs
const reqHeaderColumn = [
  {
    title: '标签',
    dataIndex: 'tag'
  },
  {
    title: '必填',
    dataIndex: 'required',
    render: v => {
      return v ? '是' : '否'
    }
  },
  {
    title: '内容',
    dataIndex: 'content'
  }
]
const reqGetColumn = [
  {
    title: '参数名',
    dataIndex: 'name'
  },
  {
    title: '类型',
    dataIndex: 'type'
  },
  {
    title: '必填',
    dataIndex: 'required',
    render: v => {
      return v ? '是' : '否'
    }
  },
  {
    title: '说明',
    dataIndex: 'des'
  },
  {
    title: '示例',
    dataIndex: 'example'
  }
]
const resHeaderColumn = [
  {
    title: '标签',
    dataIndex: 'tag'
  },
  {
    title: '必含',
    dataIndex: 'required',
    render: v => {
      return v ? '是' : '否'
    }
  },
  {
    title: '内容',
    dataIndex: 'content'
  }
]
function FrontTitle(props) {
  return (
    <div className="front-title">
      <span className="front">{props.title}</span>
      {props.children}
    </div>
  )
}
function Param(props) {
  const dataSource = props.data.slice(0, props.data.length - 1)
  return (
    <Table
      columns={props.column}
      dataSource={dataSource}
      pagination={false}
      className="bottom-20"
    />
  )
}
function Pre(data) {
  const parseData = JSON.stringify(data, null, 4)
  return <pre>{parseData}</pre>
}
export default function ApiIntro(props) {
  const [info, setInfo] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    getApiInfo({ id: props.id,parse: true }).then(res => {
      setInfo(res.info)
      setIsLoading(false)
    })
  }, [props.id])

  const { request, response, result, description, group_id } = info
  const groupName = useMemo(() => {
    const filterGroup = props.list.filter(gr => gr.id === group_id)
    if (filterGroup.length > 0) {
      return filterGroup[0].name
    } else {
      return '默认分组'
    }
  }, [group_id, props.list])
  return (
    <>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <div className="api-intro">
          <div onClick={props.hide} className="api-intro-top">
            <Icon type="rollback" className="right-10" />
            <span>返回API列表</span>
          </div>
          <div className="api-intro-main">
            <div className="api-intro-meta">
              <div className="meta-top">
                <ProtocolTag protocol="Http://" />
                <MethodTag method={info.method} />
                <ApiTag status={info.status} />
              </div>
              <div className="meta-middle">
                <div>{info.url}</div>
                <div>{info.name}</div>
              </div>
              <div className="meta-bottom">
                <span>分组：{groupName}</span>
                <span>最后更新者：{info.updator}</span>
                <span>更新时间：{format(info.updatedAt)}</span>
              </div>
            </div>
            <Divider />
            <div className="api-intro-request">
              {request.header.length > 1 ? (
                <>
                  <FrontTitle title="请求头部" />
                  <Param data={request.header} column={reqHeaderColumn} />
                </>
              ) : null}
              {request.url.length > 1 ? (
                <>
                  <FrontTitle title="GET参数" />
                  <Param data={request.url} column={reqGetColumn} />
                </>
              ) : null}
              {request.param.detail.length > 1 ? (
                <>
                  <FrontTitle title="Body 请求参数">
                    <Tag color="#333">{request.param.paramType}</Tag>
                    {request.param.jsonRootType === 'json' ? (
                      <Tag color="#333">
                        最外层结构为{request.param.jsonRootType}
                      </Tag>
                    ) : null}
                  </FrontTitle>
                  <Param data={request.param.detail} column={reqGetColumn} />
                </>
              ) : null}
            </div>
            <div className="api-intro-response">
              {response.header.length > 1 ? (
                <>
                  <FrontTitle title="返回头部" />
                  <Param data={response.header} column={resHeaderColumn} />
                </>
              ) : null}
              {response.param.detail.length > 1 ? (
                <>
                  <FrontTitle title="返回参数">
                    <Tag color="#333">{response.param.paramType}</Tag>
                    {response.param.jsonRootType === 'json' ? (
                      <Tag color="#333">
                        最外层结构为{response.param.jsonRootType}
                      </Tag>
                    ) : null}
                  </FrontTitle>
                  <Param data={response.param.detail} column={reqGetColumn} />
                </>
              ) : null}
            </div>
            <div className="api-intro-example">
              <FrontTitle title="返回示例" />
              <Tabs defaultActiveKey="1">
                <TabPane key="1" tab="成功示例">
                  <Pre data={result.success.content} />
                </TabPane>
                <TabPane key="2" tab="失败示例">
                  <Pre data={result.fail.content} />
                </TabPane>
              </Tabs>
            </div>
            <div className="api-intro-extra">
              {description ? (
                <>
                  <FrontTitle title="额外说明" />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: converter.makeHtml(info.description)
                    }}
                  />
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
