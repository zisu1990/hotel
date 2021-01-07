import {  post } from './http.js'


//接班人员列表
export const banUserList = params => post('/huanban/userlist', params)


// 交班明细

export const banInfo = params => post('/huanban/info', params)


//确认交班
export const banAdd= params => post('/huanban/add', params)