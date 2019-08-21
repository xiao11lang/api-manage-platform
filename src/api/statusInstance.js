import { fetch } from './fetch'
export function addStatusInstance(data) {
  return fetch({
    url: '/status/instance',
    method: 'post',
    data: data,
    modalShow: true
  })
}
export function getStatusInstances(params) {
  return fetch({
    url: '/status/instance',
    method: 'get',
    params: params
  })
}
