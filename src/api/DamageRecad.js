import { post } from './http.js'

// 物件查询
export const GoodsList = params => post('/thing/lists', params)

//充值方式
export const paymethod = params => post('/paymethod/lists', params)


// 通过房间号查询客主信息
export const KeSearch = params => post('/order/room_order', params)

// 赔损录入
export const orderSunpei = params => post('/order/sunpei', params)
