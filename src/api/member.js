//会员接口

import {  post } from './http.js'

// 会员列表查询接口
export const memberList = params => post('/member/index', params)



//会员等级列表查询
export const memberlevel = params => post('/memberlevel/sitelists', params)


// 国籍查询
export const native = params => post('/nationality/index', params)

//会员新增接口
export const addMember = params => post('/member/add', params)

//会员修改
export const editMember = params => post('/member/edit', params)