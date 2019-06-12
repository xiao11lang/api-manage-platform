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
export function update(data){
    return fetch({
        method:'post',
        url:'/updateInfo',
        data
    })
}
export function changePass(data){
    return fetch({
        method:'post',
        url:'/changePass',
        data
    })
}