import {  post } from './http.js'

// 登录接口
export const loginVerify = data => post('/login/index', data)


// 验证码
export const loginCaptcha = data => post('/login/captcha', data)
