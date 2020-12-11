import { post } from './http.js'

// 客户类型
export const customerType = params => post('/customertype/lists', params)

//空房间总数
export const orderYdroomtype = params => post('/order/ydroomtype', params)

// 预订房间
export const orderAdd = params => post('/order/add', params)

