import { post } from './http.js'

// 物件查询
export const GoodsList = params => post('/thing/index', params)


// 物件新增
export const GoodsAdd = params => post('/thing/add', params)


//物件修改
export const GoodsEdit = params => post('/thing/edit', params)


//物件删除
export const GoodsDel = params => post('/thing/del', params)
