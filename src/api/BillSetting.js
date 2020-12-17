import {  post } from './http.js'


// logo上传接口
export const SetLogo = params => post('/setting/upload', params)

// 计费详情接口
export const GetInfo = params => post('/setting/info', params)



//提交计费设置
export const SetBill = params => post('/setting/setting', params)
