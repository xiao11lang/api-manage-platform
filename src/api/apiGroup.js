import { fetch } from './fetch'
export function addTopGroup(data){
    return fetch({
        url:'addTopGroup',
        method:'post',
        data:data,
        modalShow:true
    })
}
export function getGroups(data){
    return fetch({
        url:'getGroups',
        method:'post',
        data:data
    })
}
export function modifyGroup(data){
    return fetch({
        url:'modifyGroup',
        method:'post',
        data:data
    })
}