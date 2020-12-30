import { post } from './http.js'

// 退房信息
export const orderTui_info = params => post('/order/tui_info', params)

// 预订会员查询
export const orderMemberinfo = params => post('/order/memberinfo', params)


// 房间信息
export const orderRoom_order = params => post('/order/room_order', params)