import { post } from './http.js'
// 房间管理


// 新增
export const roomAdd = params => post('/room/add', params)
// 删除
export const roomDel = params => post('/room/del', params)
// 编辑
export const roomEdit = params => post('/room/edit', params)
// 查询
export const roomIndex = params => post('/room/index', params)
// 上传模板
export const roomUpload = params => post('/room/upload', params)
// 状态修改
export const roomModifystatus = params => post('/room/modifystatus', params)
// 详情
export const roomInfo = params => post('/room/info', params)