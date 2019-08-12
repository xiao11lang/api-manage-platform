import { fetch } from './fetch'
export function addApiInstance(data){
    return fetch({
        url:'addApiInstance',
        method:'post',
        data:data
    })
}
export function getApiInstances(data){
    return fetch({
        url:'getApiInstances',
        method:'post',
        data:data
    })
}