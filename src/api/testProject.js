import { fetch } from './fetch'
export function addProject(data) {
  return fetch({
    url: '/test/project',
    method: 'post',
    data: data,
    modalShow: true
  })
}
export function getProjects(params) {
  return fetch({
    url: '/test/project',
    method: 'get',
    params: params
  })
}
export function deleteProject(params) {
  return fetch({
    url: '/test/project',
    method: 'delete',
    params: params
  })
}
