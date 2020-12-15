import { post } from './http.js'
// 国籍查询
export const nationalityIndex = params => post('/nationality/index', params)


// 客户类型
export const customertypeLists = params => post('/customertype/lists', params)



// 客户类型
export const zhengjianLists = params => post('/zhengjian/lists', params)


// 客户类型
export const orderYdroomtype = params => post('/order/ydroomtype', params)