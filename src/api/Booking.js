import { post } from './http.js'



// 预订查询
export const orderIndex = params => post('/order/index', params)


//取消预订
export const orderCancel = params => post('/order/cancel', params)






