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
export function getInfo(){
    return fetch({
        url:'/getInfo',
        method:'get'
    })
}
export function update(data){
    return fetch({
        method:'post',
        url:'/updateInfo',
        data,
        modalShow:true
    })
}
export function changePass(data){
    return fetch({
        method:'post',
        url:'/changePass',
        data,
        modalShow:true
    })
}
export function uploadAvatar(data){
    return fetch({
        method:'post',
        url:'/uploadAvatar',
        data,
        modalShow:true
    })
}
export function changeWorkTeam(data){
    return fetch({
        method:'post',
        url:'/changeWorkTeam',
        data
    })
}