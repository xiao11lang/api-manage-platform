import {fetch} from './fetch'
export function getMessage(data){
    return fetch({
        method:'post',
        url:'/getMessage',
        data
    })
}