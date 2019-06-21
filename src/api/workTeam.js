import {fetch} from './fetch'
export function getTeamInfo(data){
    return fetch({
        method:'get',
        url:'/getTeamInfo',
        data
    })
}
export function checkExist(data){
    return fetch({
        method:'post',
        url:'/getWorkTeamExist',
        data
    })
}