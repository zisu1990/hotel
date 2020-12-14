//会员接口

import { post } from './http.js'

// 支付方式列表查询接口
export const paymethodLists = params => post('/paymethod/lists', params)

// 支付方式删除
export const paymethodDel = params => post('/paymethod/del', params)

// 支付方式增加
export const paymethodAdd = params => post('/paymethod/add', params)

// 支付方式编辑
export const paymethodEdit = params => post('/paymethod/edit', params)
