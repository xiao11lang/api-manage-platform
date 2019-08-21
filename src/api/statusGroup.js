import { fetch } from './fetch'
export function addTopGroup(data) {
  return fetch({
    url: 'status/group',
    method: 'post',
    data: data,
    modalShow: true
  })
}
export function getGroups(params) {
  return fetch({
    url: 'status/groups',
    method: 'get',
    params: params
  })
}
export function modifyGroup(data) {
  return fetch({
    url: '/status/modifyGroup',
    method: 'post',
    data: data
  })
}
export function deleteGroup(data) {
  return fetch({
    url: '/status/deleteGroup',
    method: 'post',
    data: data
  })
}
