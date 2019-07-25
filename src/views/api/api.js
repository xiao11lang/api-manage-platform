import React, { useContext } from 'react'
import { Manage } from './manage'
import { Test } from './test'
import { ApiCtx } from '../home/home'
import { TopAction } from './topAction'
import { Switch, Route } from 'react-router-dom'
import './api.scss'
export function Api(props) {
  const key = useContext(ApiCtx)
  return (
    <>
      <TopAction currentKey={key} />
      <Switch>
        <Route path={`${props.match.url}/manage`} component={Manage} />
        <Route path={`${props.match.url}/test`} component={Test} />
      </Switch>
    </>
  )
}
