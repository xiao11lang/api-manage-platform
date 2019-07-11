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