import { post } from './http.js'



// 通过房间号查询客主信息
export const KeSearch = params => post('/order/room_order', params)


//查询会员卡金额
export const MemberMoneySearch = params => post('/order/memberinfo', params)

// 补录
export const BuLu = params => post('/order/bulu', params)

