import {  post } from './http.js'

// 登录接口
export const loginVerify = params => post('/login/index', params)


// 验证码
export const loginCaptcha = params => post('/login/captcha', params)