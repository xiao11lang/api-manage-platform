import React,{useEffect,useReducer,useContext} from 'react'
import { Manage } from './manage'
import { Test } from './test'
import { TopAction } from './topAction'
import { Switch, Route } from 'react-router-dom'
import { getProjects } from '../../api/apiProject'
import './api.scss'
import { ApiCtx, TeamCtx } from './../home/home';
import { apiManageReducer } from './../../reducer/apiManageReducer';
import format from '../../until/format';
export function Api(props) {
  const key = useContext(ApiCtx)
  const teamInfo = useContext(TeamCtx)
  const [list, dispatch] = useReducer(apiManageReducer)
  useEffect(() => {
    if (key&&teamInfo.id) {
      getProjects({
        teamId: teamInfo.id
      }).then(res => {
        const list = res.list.map(item => {
          return Object.assign({}, item, { key: item.id,updatedAt:format(item.updatedAt) })
        })
        dispatch({ type: 'INIT', list: list })
      })
    }
  }, [key,teamInfo])
  return (
    <>
      <TopAction dispatch={dispatch}/>
      <Switch>
        <Route path={`${props.match.url}/manage`} render={({history})=><Manage list={list} dispatch={dispatch} history={history}/>} />
        <Route path={`${props.match.url}/test`} component={Test} />
      </Switch>
    </>
  )
}
