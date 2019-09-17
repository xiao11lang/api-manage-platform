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
    url: '/test/projects',
    method: 'get',
    params: params
  })
}
export function getProject(params) {
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
export function updateProject(data) {
  return fetch({
    url: '/test/project/update',
    method: 'post',
    data: data,
    modalShow: true
  })
}
