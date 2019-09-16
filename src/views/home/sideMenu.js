import React, { useMemo } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import getKey from 'until/getKey'
const { Sider } = Layout
const SubMenu = Menu.SubMenu

export default function SideMenu(props) {
  const key = getKey()
  const handleApiClick = ({ key }) => {
    props.setKey(key)
  }
  const openKey = useMemo(() => {
    return (key === '2' || key === '3')&&!props.collapse ? 'sub1' : ''
  }, [key,props.collapse])
  return (
    <>
      <Sider
        trigger={null}
        collapsible
        collapsed={props.collapse}
        theme="light"
      >
        <Menu
          mode="inline"
          selectedKeys={[key]}
          openKeys={[openKey]}
          onClick={handleApiClick}
        >
          <Menu.Item key="0" disabled>
            <Icon type="api" />
            <span>API Master</span>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to="/home/control">
              <Icon type="control" />
              <span>控制台</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span className='side-sub-menu'>
                <Link to="/home/api/manage">
                  <Icon type="api" />
                  <span>API管理与测试</span>
                </Link>
              </span>
            }
          >
            <Menu.Item key="2">
              <Link to="/home/api/manage">
                <span>API管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/home/api/test">
                <span>API测试</span>
              </Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="4">
            <Icon type="database" />
            <span>数据库管理</span>
          </Menu.Item>
          <Menu.Item key="5">
            <Icon type="profile" />
            <span>测试用例</span>
          </Menu.Item>
          {props.showExtraRoute ? (
            <Menu.Item key="6">
              <Link to="/home/person">
                <Icon type="user" />
                <span>成员管理</span>
              </Link>
            </Menu.Item>
          ) : null}
          {props.teamList.length && props.showExtraRoute ? (
            <Menu.Item key="7">
              <Link to="/home/workTeam">
                <Icon type="bank" />
                <span>工作组管理</span>
              </Link>
            </Menu.Item>
          ) : null}
        </Menu>
      </Sider>
    </>
  )
}
