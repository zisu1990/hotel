import { post } from './http.js'

// 国籍列表
export const nationalityIndex = params => post('/nationality/index', params)

// 国籍编辑
export const nationalityEdit = params => post('/nationality/edit', params)

// 国籍新增
export const nationalityAdd = params => post('/nationality/add', params)

// 国籍删除
export const nationalityDel = params => post('/nationality/del', params)
