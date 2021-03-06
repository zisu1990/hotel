//会员接口
import {  post } from './http.js'

// 会员列表查询接口
export const memberList = params => post('/member/index', params)


//会员等级列表查询
export const memberlevel = params => post('/memberlevel/sitelists', params)

//改变会员状态member/modifystatus
export const memberStatus = params => post('/member/modifystatus', params)

// 国籍查询
export const native = params => post('/nationality/index', params)

//会员新增接口
export const addMember = params => post('/member/add', params)

//会员修改
export const editMember = params => post('/member/edit', params)

//会员删除
export const deleteMember = params => post('/member/del', params)


//充值方式
export const paymethod = params => post('/paymethod/lists', params)


//会员充值
export const memberAccount = params => post('/memberaccount/add', params)


//会员等级查询列表
export const memberLevelList = params => post('/memberlevel/siteindex', params)


//会员充值优惠查询
export const memberDiscountList = params => post('/memberdiscount/index', params)


// 增加会员充值优惠
export const memberDiscountAdd = params => post('/memberdiscount/add', params)

// 会员充值删除
export const memberDiscountDel= params => post('/memberdiscount/del', params)


// 会员充值编辑
export const memberDiscountEdit= params => post('/memberdiscount/edit', params)



//会员充值赠送金额
export const memberGiveMoney= params => post('/memberaccount/give_money', params)