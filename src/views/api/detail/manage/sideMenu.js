import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import IconFont from './../../../../components/iconfont'
const { Sider } = Layout
function getKey() {
  const routeMap = {
    projectSurvey: '1',
    apiDocument: '2',
    apiTest: '3',
    statusDocument: '4',
    projectDoucment: '5',
    testEnviroment: '6',
    projectManage: '7'
  }
  const hashArr = window.location.hash.split('/')
  const curRoutePath = hashArr[hashArr.length - 1].split('?')[0]
  return routeMap[curRoutePath]
}
export default function SideMenu(props) {
  const url = props.url
  const key = getKey()
  return (
    <>
      <Sider trigger={null} theme="light">
        <Menu mode="inline" selectedKeys={[key]}>
          <Menu.Item key="0">
            <Icon type="rollback" />
            <span
              onClick={() => {
                props.history.push('/home/api/manage')
              }}
            >
              返回项目列表
            </span>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to={`${url}/projectSurvey${props.search}`}>
              <IconFont type="iconxiangmugaikuang" />
              <span>项目概况</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={`${url}/apiDocument${props.search}`}>
              <IconFont type="iconAPIwendang" />
              <span>API文档</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to={`${url}/apiTest${props.search}`}>
              <IconFont type="iconshandian" />
              <span>API测试</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="4">
            <span to={`${url}/statusDocument${props.search}`}>
              <IconFont type="iconwendang2" />
              <span>状态码文档</span>
            </span>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to={`${url}/projectDoucment${props.search}`}>
              <IconFont type="iconwendang1" />
              <span>项目文档</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to={`${url}/testEnviroment${props.search}`}>
              <IconFont type="iconceshihuanjing" />
              <span>测试环境</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to={`${url}/projectManage${props.search}`}>
              <IconFont type="iconwenzhanghuoke-" />
              <span>项目管理</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  )
}
