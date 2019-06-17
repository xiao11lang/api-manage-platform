import {fetch} from './fetch'
export function getMessage(data){
    return fetch({
        method:'post',
        url:'/getMessage',
        data
    })
}
export function getMesCount(data){
    return fetch({
        method:'post',
        url:'/getMesCount',
        data
    })
}
export function getMessageList(data){
    return fetch({
        method:'post',
        url:'/getMessageList',
        data
    })
}
export function changeMesState(data){
    return fetch({
        method:'post',
        url:'/changeMesState',
        data
    })
}