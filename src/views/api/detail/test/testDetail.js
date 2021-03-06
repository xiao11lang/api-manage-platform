import React, { useState, useEffect } from 'react'
import { Layout } from 'antd'
import { Switch, Route } from 'react-router-dom'
import SideMenu from './sideMenu'
import ProjectSurvey from './items/projectSurvey'
import TestHeader from './testHeader'
import './test.scss'
import StatusDocument from './items/statusDocument';
import ProjectDocument from './items/projectDocument';
const { Content } = Layout
export function TestDetail(props) {
  const url = props.match.url
  const [projectInfo, setProjectInfo] = useState({})
  const [curMenu, setCurMenu] = useState('项目概况')
  const search = props.location.search
  useEffect(() => {
    const str = search.slice(1)
    const arr = str.split('=')
    if (arr[0] !== 'id' || !arr[1]) {
      props.history.push('/home/api/manage')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])
  return (
    <Layout className='manage-detail'>
      <SideMenu
        url={url}
        history={props.history}
        search={search}
        setCurMenu={setCurMenu}
      />
      <Layout>
        <TestHeader name={projectInfo.name} curMenu={curMenu} />
        <Content
          style={{
            margin: '24px 16px'
          }}
          className='manage-main'
        >
          <Switch>
            <Route
              path={`${url}/projectSurvey`}
              render={({ location }) => (
                <ProjectSurvey
                  info={projectInfo}
                  setProjectInfo={setProjectInfo}
                  search={search}
                />
              )}
            />
            <Route path={`${url}/statusDocument`} render={() => <StatusDocument search={search}/>} />
            <Route path={`${url}/projectDocument`} render={() => <ProjectDocument search={search}/>} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}
