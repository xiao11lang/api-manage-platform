export default function deleteEmpty(data) {
  if (typeof data==='object') {
    Object.keys(data).forEach(key => {
      if (data[key].children) {
        data[key].children = data[key].children.slice(
          0,
          data[key].children.length - 1
        )
      } else {
        deleteEmpty(data[key])
      }
    })
  }
  return data
}
