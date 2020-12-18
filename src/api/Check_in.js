import { post } from './http.js'
// 国籍查询
export const nationalityIndex = params => post('/nationality/index', params)


// 客户类型
export const customertypeLists = params => post('/customertype/lists', params)



// 客户类型
export const zhengjianLists = params => post('/zhengjian/lists', params)


// 客户类型
export const orderYdroomtype = params => post('/order/ydroomtype', params)


// 预订会员查询
export const orderMemberinfo = params => post('/order/memberinfo', params)

//充值方式
export const paymethod = params => post('/paymethod/lists', params)

//计费设置详情接口
export const settingInfo = params => post('/setting/info', params)


// 入住接口
export const orderMoveinto = params => post('/order/moveinto', params)
