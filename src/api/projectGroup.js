import { fetch } from './fetch'
export function addTopGroup(data) {
  return fetch({
    url: 'project/group',
    method: 'post',
    data: data,
    modalShow: true
  })
}
export function getGroups(params) {
  return fetch({
    url: 'project/groups',
    method: 'get',
    params: params
  })
}
export function modifyGroup(data) {
  return fetch({
    url: '/project/modifyGroup',
    method: 'post',
    data: data
  })
}
export function deleteGroup(data) {
  return fetch({
    url: '/project/deleteGroup',
    method: 'post',
    data: data
  })
}
