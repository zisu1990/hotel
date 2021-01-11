import { post } from './http.js'

// 客户类型
export const customerType = params => post('/customertype/lists', params)

//空房间总数
export const orderYdroomtype = params => post('/order/ydroomtype', params)

// 预订房间
export const orderAdd = params => post('/order/add', params)

// 预订会员查询
export const orderMemberinfo = params => post('/order/memberinfo', params)

//计费设置详情接口
export const settingInfo = params => post('/setting/info', params)
