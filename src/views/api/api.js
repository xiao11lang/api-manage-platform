import React from 'react'
import { Manage } from './manage'
import { Test } from './test'
import { TopAction } from './topAction'
import { Switch, Route } from 'react-router-dom'
import './api.scss'
export function Api(props) {
  return (
    <>
      <TopAction />
      <Switch>
        <Route path={`${props.match.url}/manage`} component={Manage} />
        <Route path={`${props.match.url}/test`} component={Test} />
      </Switch>
    </>
  )
}
