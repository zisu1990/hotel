import {  post } from './http.js'

// 操作日志
export const LogList = params => post('/logs/index', params)


