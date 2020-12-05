import { post } from './http.js'

// 房间新增
export const roomtypeAdd = params => post('/roomtype/add', params)


// 房间列表
export const roomtypeLists = params => post('/roomtype/lists', params)


// 房间查询
export const roomtypeIndex = params => post('/roomtype/index', params)

// 房间查询
export const roomtypeDel = params => post('/roomtype/del', params)

// 房间编辑
export const roomtypeEdit= params => post('/roomtype/edit', params)


// 房间状态修改
export const roomtypeModifystatus= params => post('/roomtype/modifystatus', params)