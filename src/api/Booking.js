import { post } from './http.js'



// 预订查询
export const orderIndex = params => post('/order/index', params)


//取消预订
export const orderCancel = params => post('/order/cancel', params)

// 预订详情接口
export const orderInfo = params => post('/order/info', params)

// 可选房型查询
export const orderYdroomtype = params => post('/order/roomtype', params)

//计费设置详情接口
export const settingInfo = params => post('/setting/info', params)

//计费设置详情接口
export const orderMemberinfo = params => post('/order/memberinfo', params)
//充值方式
export const paymethod = params => post('/paymethod/lists', params)

//充值方式
export const orderlivein = params => post('/order/livein', params)








