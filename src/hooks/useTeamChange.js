import {useContext} from 'react'
import { UserCtx } from '../App';
export function useTeamChange(){
    const {userInfo,setUserInfo}=useContext(UserCtx)
    return (id)=>setUserInfo(Object.assign({},userInfo,{workTeamId:id}))
}