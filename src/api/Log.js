
import {  post } from './http.js'

// 日志接口
export const Log = params => post('/logs/index', params)