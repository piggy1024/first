import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const TokenSaltedPwdKey = 'S'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setSaltedPwd(pwd) {
  return Cookies.set(TokenSaltedPwdKey, pwd)
}
export function getSaltedPwd() {
  return Cookies.get(TokenSaltedPwdKey)
}

export function removeSaltedPwd() {
  return Cookies.remove(TokenSaltedPwdKey)
}

