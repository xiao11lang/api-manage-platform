import { useState, useCallback} from 'react'
export function useSelectChange(init){
    const [value,setValue]=useState(init)
    const onChange=useCallback((v)=>{
        setValue(v)
    },[])
    return {value,onChange}
}