import {  post } from './http.js'


// 客史查询接口
export const GuestLists = params => post('/order/orderhistory', params)