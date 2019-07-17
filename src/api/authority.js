import { fetch } from './fetch'
export function getAuthorities(data){
    return fetch({
        url:'getAuthorities',
        method:'post',
        data
    })
}
