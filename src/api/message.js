import {fetch} from './fetch'
export function getMessage(data){
    return fetch({
        method:'post',
        url:'/getMessage',
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