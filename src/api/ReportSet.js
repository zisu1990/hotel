import {  post } from './http.js'


// 报表查询
export const tongjiList = params => post('/tongji/index', params)


// 报表增加
export const tongjiAdd = params => post('/tongji/add', params)


// 报表编辑
export const tongjiEdit = params => post('/tongji/edit', params)


// 报表删除
export const tongjiDel = params => post('/tongji/del', params)