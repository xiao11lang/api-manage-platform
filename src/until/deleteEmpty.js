export default function deleteEmpty(data) {
  if (typeof data==='object'&&data!=null) {
    Object.keys(data).forEach(key => {
      if(Array.isArray(data[key])){
        data[key].forEach((item)=>{
          if(item.children){
            item.children=item.children.slice(0,item.children.length-1)
          }
        })
      }
      deleteEmpty(data[key])
    })
  }
  return data
}
