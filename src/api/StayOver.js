import { post } from './http.js'

// 房间信息
export const orderRoom_order = params => post('/order/room_order', params)
