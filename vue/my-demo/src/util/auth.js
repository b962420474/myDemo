import Cookies from 'js-cookie'
const TokenKey = 'loginToken'
export function setToken(token){
    return Cookies.set(TokenKey, token)
}
export function getToken(){
    return Cookies.get(TokenKey)
}
export function removeToken(token){
    return Cookies.remove(TokenKey)
}