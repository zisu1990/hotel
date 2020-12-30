
import {  post } from './http.js'

// 系统用户
export const systemAdmin = params => post('/user/info', params)


//x修改密码
export const editPassWord = params => post('/user/modifypwd', params)