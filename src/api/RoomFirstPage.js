import { post } from './http.js'

// 查询房态列表
export const roomstateList = params => post('/roomstate/lists', params)


// 查询房态总数
export const roomsRoomcount = params => post('/room/roomcount', params)

//房间列表
export const roomLists = params => post('/room/lists', params)

// 获取房型列表
export const roomtypeLists = params => post('/roomtype/lists', params)

// 修改房型
export const roomModify = params => post('/room/modify', params)

// 消息列表
export const noticeIndex = params => post('/notice/index', params)

// 消息单个读取接口
export const noticeReadone = params => post('/notice/readone', params)

// 消息全部读取接口
export const noticeReadall = params => post('/notice/readall', params)