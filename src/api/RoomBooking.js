import { post } from './http.js'

// 客户类型
export const customerType = params => post('/customertype/lists', params)

