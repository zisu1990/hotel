import {  post } from './http.js'


//接班人员
export const banUserList = params => post('/huanban/userlist', params)

