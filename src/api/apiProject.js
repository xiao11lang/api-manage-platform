import { fetch } from './fetch'
export function addProject(data){
    return fetch({
        url:'addProject',
        method:'post',
        data:data,
        modalShow:true
    })
}
export function getProjects(data){
    return fetch({
        url:'getProjects',
        method:'post',
        data:data
    })
}
export function getProject(data){
    return fetch({
        url:'getProject',
        method:'post',
        data:data
    })
}
export function deleteProject(data){
    return fetch({
        url:'deleteProject',
        method:'post',
        data:data
    })
}
export function modifyProject(data){
    return fetch({
        url:'modifyProject',
        method:'post',
        data:data,
        modalShow:true
    })
}