
import { post } from './http.js'

// 支付方式列表查询接口
export const customertypeLists = params => post('/customertype/lists', params)

// 支付方式添加接口
export const customertypeAdd = params => post('/customertype/add', params)

// 支付方式编辑接口
export const customertypeEdit = params => post('/customertype/edit', params)

// 支付方式删除接口
export const customertypeDel = params => post('/customertype/del', params)