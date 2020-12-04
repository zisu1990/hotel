import { post } from './http.js'

// 房间新增
export const roomtypeAdd = params => post('/roomtype/add', params)


// 房间列表
export const roomtypeLists = params => post('/roomtype/lists', params)


// 房间查询
export const roomtypeIndex = params => post('/roomtype/index', params)

// 房间查询
export const roomtypeDel = params => post('/roomtype/del', params)