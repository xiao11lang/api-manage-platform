import { useState, useCallback} from 'react'
export function useInputChange(init){
    const [value,setValue]=useState(init)
    const onChange=useCallback((e)=>{
        setValue(e.target.value)
    },[])
    return {value,onChange}
}