import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { IconFont } from 'components'
const { Sider } = Layout
const routeMap = {
  projectSurvey: {
    name: '概况',
    key: '1',
    icon: 'iconxiangmugaikuang'
  },
  projectDocument: {
    name: '场景用例',
    key: '2',
    icon: 'iconAPIwendang'
  },
  statusDocument: {
    name: '测试报告',
    key: '3',
    icon: 'iconwendang2'
  },
  apiDocument: {
    name: '测试环境',
    key: '4',
    icon: 'iconwendang1'
  }
}
function getKey() {
  const hashArr = window.location.hash.split('/')
  const curRoutePath = hashArr[hashArr.length - 1].split('?')[0]
  return routeMap[curRoutePath].key
}
export default function SideMenu(props) {
  const url = props.url
  const key = getKey()
  const handleClick = (path, name) => {
    props.history.push(`${url}/${path + props.search}`)
    props.setCurMenu(name)
  }
  const list = Object.entries(routeMap).map(item => {
    const [path, { name, key, icon }] = item
    return (
      <Menu.Item key={key}>
        <IconFont type={icon} />
        <span onClick={() => handleClick(path, name)}>{name}</span>
      </Menu.Item>
    )
  })
  return (
    <>
      <Sider trigger={null} theme="light">
        <Menu mode="inline" selectedKeys={[key]}>
          <Menu.Item key="0">
            <Icon type="rollback" />
            <span
              onClick={() => {
                props.history.push('/home/api/test')
              }}
            >
              返回项目列表
            </span>
          </Menu.Item>
          {list}
        </Menu>
      </Sider>
    </>
  )
}
