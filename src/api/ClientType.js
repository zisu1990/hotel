
import { post } from './http.js'

// 支付方式列表查询接口
export const customertypeLists = params => post('/customertype/lists', params)
