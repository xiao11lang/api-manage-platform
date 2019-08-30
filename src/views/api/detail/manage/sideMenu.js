import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { IconFont } from 'components'
const { Sider } = Layout
const routeMap = {
  projectSurvey: {
    name: '项目概况',
    key: '1',
    icon: 'iconxiangmugaikuang'
  },
  apiDocument: {
    name: 'API文档',
    key: '2',
    icon: 'iconAPIwendang'
  },
  // apiTest: {
  //   name: 'API测试',
  //   key: '3',
  //   icon: 'iconshandian'
  // },
  statusDocument: {
    name: '状态码文档',
    key: '3',
    icon: 'iconwendang2'
  },
  projectDocument: {
    name: '项目文档',
    key: '4',
    icon: 'iconwendang1'
  }
  // testEnviroment: {
  //   name: '测试环境',
  //   key: '5',
  //   icon: 'iconceshihuanjing'
  // },
  // projectManage: {
  //   name: '项目管理',
  //   key: '6',
  //   icon: 'iconwenzhanghuoke-'
  // }
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
                props.history.push('/home/api/manage')
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
