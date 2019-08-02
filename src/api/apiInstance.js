import { fetch } from './fetch'
export function addApiInstance(data){
    return fetch({
        url:'addApiInstance',
        method:'post',
        data:data
    })
}