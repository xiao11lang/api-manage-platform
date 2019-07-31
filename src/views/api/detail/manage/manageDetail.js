import React from 'react'
import { Layout } from 'antd'
import { Switch, Route } from 'react-router-dom'
import SideMenu from './sideMenu'
import ProjectSurvey from './items/projectSurvey'
import ManageHeader from './manageHeader'
export function ManageDetail(props) {
  const url = props.match.url
  return (
    <Layout>
      <SideMenu url={props.match.url} history={props.history} />
      <Layout>
        <ManageHeader />
        <Switch>
          <Route path={`${url}/projectSurvey`} component={ProjectSurvey} />
        </Switch>
      </Layout>
    </Layout>
  )
}
