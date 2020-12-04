
import {  post } from './http.js'

// 登录接口
export const Log = params => post('/logs/index', params)