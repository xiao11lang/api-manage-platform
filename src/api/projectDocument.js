import { fetch } from './fetch'
export function addProjectDocument(data) {
  return fetch({
    url: '/project/document',
    method: 'post',
    data,
    modalShow: true
  })
}
export function getProjectDocuments(params) {
  return fetch({
    url: '/project/document',
    method: 'get',
    params
  })
}
export function deleteProjectDocument(params) {
  return fetch({
    url: '/project/document',
    method: 'delete',
    params
  })
}
export function updateProjectDocument(data) {
  return fetch({
    url: '/project/update',
    method: 'post',
    data,
    modalShow: true
  })
}
