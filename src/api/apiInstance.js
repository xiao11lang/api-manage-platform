import { fetch } from './fetch'
export function addApiInstance(data){
    return fetch({
        url:'addApiInstance',
        method:'post',
        data:data,
        modalShow: true
    })
}
export function getApiInstances(data){
    return fetch({
        url:'getApiInstances',
        method:'post',
        data:data
    })
}
export function getApiInfo(data){
    return fetch({
        url:'getApiInfo',
        method:'post',
        data:data
    })
}
export function deleteApi(data){
    return fetch({
        url:'deleteApi',
        method:'post',
        data:data
    })
}