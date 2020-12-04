import {  post } from './http.js'
import qs from 'qs'
// 登录接口
export const loginVerify = params => post('/login/index', params)


// 验证码
export const loginCaptcha = data => post('/login/captcha', data)
