import { fetch } from './fetch'
export function getAuthorities(data){
    return fetch({
        url:'getAuthorities',
        method:'post',
        data
    })
}
export function deleteAuthority(data){
    return fetch({
        url:'deleteAuthority',
        method:'post',
        data
    })
}
export function changeAuthorityRole(data){
    return fetch({
        url:'changeAuthorityRole',
        method:'post',
        data,
        modalShow:true
    })
}