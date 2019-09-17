import { fetch } from './fetch'
export function addTopGroup(data) {
  return fetch({
    url: 'test/group',
    method: 'post',
    data: data,
    modalShow: true
  })
}
export function getGroups(params) {
  return fetch({
    url: 'test/groups',
    method: 'get',
    params: params
  })
}
export function modifyGroup(data) {
  return fetch({
    url: '/test/modifyGroup',
    method: 'post',
    data: data
  })
}
export function deleteGroup(data) {
  return fetch({
    url: '/test/deleteGroup',
    method: 'post',
    data: data
  })
}
