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