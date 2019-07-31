import React, { useEffect, useState } from 'react'
import { Layout } from 'antd'
import { Switch, Route } from 'react-router-dom'
import SideMenu from './sideMenu'
import ProjectSurvey from './items/projectSurvey'
import ManageHeader from './manageHeader'
import { getProject } from '../../../../api/apiProject'
import './manage.scss'
export function ManageDetail(props) {
  const url = props.match.url
  const id = props.location.search.split('=')[1]
  const [projectInfo, setProjectInfo] = useState({})
  useEffect(() => {
    getProject({
      id: id
    })
      .then(res => {
        setProjectInfo(res.list[0])
      })
      .catch(() => {
        props.history.push('/home/api/manage')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  return (
    <Layout>
      <SideMenu url={url} history={props.history} />
      <Layout>
        <ManageHeader name={projectInfo.name}/>
        <Switch>
          <Route path={`${url}/projectSurvey`} render={()=><ProjectSurvey info={projectInfo}/>} />
        </Switch>
      </Layout>
    </Layout>
  )
}
