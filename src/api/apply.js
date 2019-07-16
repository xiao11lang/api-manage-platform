import { fetch } from './fetch'
export function addApply(data){
    return fetch({
        url:'addApply',
        method:'post',
        data
    })
}
export function getApply(){
    return fetch({
        url:'getApply',
        method:'get',
    })
}
export function agreeApply(data){
    return fetch({
        url:'agreeApply',
        method:'post',
        data
    })
}