import { fetch } from './fetch'
export function addStatusInstance(data) {
  return fetch({
    url: '/status/instance',
    method: 'post',
    data: data,
    modalShow: true
  })
}
export function deleteStatusInstance(data) {
  return fetch({
    url: '/status/delete',
    method: 'post',
    data: data
  })
}
export function getStatusInstances(params) {
  return fetch({
    url: '/status/instance',
    method: 'get',
    params: params
  })
}

export function updateStatusInstance(data) {
  return fetch({
    url: '/status/update',
    method: 'post',
    data: data
  })
}
