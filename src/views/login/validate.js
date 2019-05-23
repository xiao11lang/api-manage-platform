export function useNameValidate(name) {
  const nameReg = /^([\u4E00-\u9FA5]|[a-zA-Z0-9_]){2,10}$/;
  return nameReg.test(name)
}
export function usePasswordValidate(pass) {
  let passReg = /^([a-zA-Z0-9]){6,16}$/;
  return passReg.test(pass)
}
