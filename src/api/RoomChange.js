import { post } from './http.js'

// 房间信息
export const orderRoom_order = params => post('/order/room_order', params)

// 预订会员查询
export const orderMemberinfo = params => post('/order/memberinfo', params)

// 可选房型查询
export const orderYdroomtype = params => post('/order/ydroomtype', params)
