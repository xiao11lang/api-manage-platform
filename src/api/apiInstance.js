import { fetch } from './fetch'
import deleteEmpty from './../until/deleteEmpty'
export function addApiInstance(data) {
  return fetch({
    url: 'addApiInstance',
    method: 'post',
    data: data,
    modalShow: true
  })
}
export function getApiInstances(data) {
  return fetch({
    url: 'getApiInstances',
    method: 'post',
    data: data
  })
}
export function getApiInfo(data) {
  return fetch({
    url: 'getApiInfo',
    method: 'post',
    data: data,
    interceptor: data.parse
      ? data => {
          return deleteEmpty(data)
        }
      : null
  })
}
export function deleteApi(data) {
  return fetch({
    url: 'deleteApi',
    method: 'post',
    data: data
  })
}
export function updateApi(data) {
  return fetch({
    url: 'updateApi',
    method: 'post',
    data: data,
    modalShow: true
  })
}
