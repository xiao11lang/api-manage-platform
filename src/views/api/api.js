import React, { useEffect, useReducer, useContext } from 'react'
import { Manage } from './manage'
import { Test } from './test'
import { TopAction } from './topAction'
import { Switch, Route } from 'react-router-dom'
import { getProjects } from '../../api/apiProject'
import './api.scss'
import { ApiCtx, TeamCtx } from './../home/home'
import { apiManageReducer } from './../../reducer/apiManageReducer'
import format from '../../until/format'
import { apiTestReducer } from './../../reducer/apiTestReducer'
export function Api(props) {
  const key = useContext(ApiCtx)
  const teamInfo = useContext(TeamCtx)
  const [manageList, manageDispatch] = useReducer(apiManageReducer)
  const [testList, testDispatch] = useReducer(apiTestReducer)
  useEffect(() => {
    if (key && teamInfo.id) {
      getProjects({
        teamId: teamInfo.id
      }).then(res => {
        const list = res.list.map(item => {
          return Object.assign({}, item, {
            key: item.id,
            updatedAt: format(item.updatedAt)
          })
        })
        manageDispatch({ type: 'INIT', list: list })
      })
    }
  }, [key, teamInfo])
  return (
    <>
      <TopAction manageDispatch={manageDispatch} id={teamInfo.id} testDispatch={testDispatch}/>
      <Switch>
        <Route
          path={`${props.match.url}/manage`}
          render={({ history }) => (
            <Manage
              list={manageList}
              dispatch={manageDispatch}
              history={history}
              id={teamInfo.id}
            />
          )}
        />
        <Route
          path={`${props.match.url}/test`}
          render={({ history }) => (
            <Test list={testList} dispatch={testDispatch} history={history} id={teamInfo.id}/>
          )}
        />
      </Switch>
    </>
  )
}
