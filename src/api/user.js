import {fetch} from './fetch'
export function register(data){
    return fetch({
        method:'post',
        url:'/register',
        data
    })
}
export function login(data){
    return fetch({
        method:'post',
        url:'/login',
        data
    })
}