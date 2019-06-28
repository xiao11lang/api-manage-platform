import {fetch} from './fetch'
export function checkExist(data){
    return fetch({
        method:'post',
        url:'/getWorkTeamExist',
        data
    })
}
export function initTeam(){
    return fetch({
        method:'get',
        url:'/initWorkTeam'
    })
}
export function getTeamList(data){
    return fetch({
        method:'post',
        url:'/getTeamList',
        data
    })
}
export function changeTeamName(data){
    return fetch({
        method:'post',
        url:'/changeTeamName',
        data,
        modalShow:true
    })
}
export function changeUserRole(data){
    return fetch({
        method:'post',
        url:'/changeUserRole',
        data,
        modalShow:true
    })
}
export function deleteTeam(data){
    return fetch({
        method:'post',
        url:'/deleteTeam',
        data
    })
}