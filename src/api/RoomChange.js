import { post } from './http.js'

// 房间信息
export const orderRoom_order = params => post('/order/room_order', params)

// 预订会员查询
export const orderMemberinfo = params => post('/order/memberinfo', params)

// 可选房型查询
export const orderYdroomtype = params => post('/order/ydroomtype', params)

//充值方式
export const paymethod = params => post('/paymethod/lists', params)

// 房间详情接口
export const roomInfo = params => post('/room/info', params)
// 房间详情接口
export const orderHuan = params => post('/order/huan', params)