import { fetch } from './fetch'
export function addTestInstance(data) {
  return fetch({
    url: '/test/instance',
    method: 'post',
    data: data,
    modalShow: true
  })
}
export function deleteStatusInstance(data) {
  return fetch({
    url: '/test/delete',
    method: 'post',
    data: data
  })
}
export function getTestInstances(params) {
  return fetch({
    url: '/test/instances',
    method: 'get',
    params: params
  })
}
export function getTestInstanceInfo(params) {
  return fetch({
    url: '/test/instance',
    method: 'get',
    params: params
  })
}

export function updateTestInstance(data) {
  return fetch({
    url: '/test/update',
    method: 'post',
    data: data
  })
}
