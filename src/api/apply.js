import { fetch } from './fetch'
export function addApply(data){
    return fetch({
        url:'addApply',
        method:'post',
        data,
        modalShow:true
    })
}
export function getApply(data){
    return fetch({
        url:'getApply',
        method:'post',
        data
    })
}
export function agreeApply(data){
    return fetch({
        url:'agreeApply',
        method:'post',
        data
    })
}
export function deleteExistApply(data){
    return fetch({
        url:'deleteApply',
        method:'post',
        data
    })
}