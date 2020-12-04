export function saveToken(v) {
    return sessionStorage.setItem("token", v)
}
export function getToken() {
    return sessionStorage.getItem("token")
}
export function removeToken() {
    return sessionStorage.removeItem("token")
}
