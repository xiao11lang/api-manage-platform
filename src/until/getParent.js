export default function getParent(root, child) {
    let res
    if (Array.isArray(root)) {
      root.forEach(item => {
        if (item.children) {
          item.children.forEach(ite => {
            if (ite.key === child.key) {
              res = item
            } else {
              res = getParent(item.children, child)
            }
          })
        }
      })
      return res
    }
  }