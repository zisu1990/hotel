import { post } from './http.js'

// 物件查询
export const GoodsList = params => post('/thing/lists', params)

