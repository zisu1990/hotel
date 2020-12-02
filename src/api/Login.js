import {  post } from './http.js'

// 登录接口
const loginVerify = data => post('login/index', data)

export default {
    loginVerify,
}