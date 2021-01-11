import {  post } from './http.js'


// 证件查询
export const zhengJianList = params => post('/zhengjian/lists', params)


// 报表增加
export const zhengJianAdd = params => post('/zhengjian/add', params)


// 报表编辑
export const zhengJianEdit = params => post('/zhengjian/edit', params)


// 报表删除
export const zhengJianjiDel = params => post('/zhengjian/del', params)