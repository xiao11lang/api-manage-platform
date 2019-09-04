import { fetch } from './fetch'
export function addProject(data){
    return fetch({
        url:'/test/project',
        method:'post',
        data:data
    })
}