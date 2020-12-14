import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'; //导入登录组件


import RoomSerive from '../views/Room/RoomSerive.vue'

import Booking from '../views/Booking/Booking.vue';
import RoomBooking from '../views/Room/RoomBooking.vue';
import Check_in from '../views/Room/Check_in.vue';
import Replenishuser from '../views/Room/Replenishuser.vue';
import StayOver from '../views/Room/StayOver.vue';
import RoomChange from '../views/Room/RoomChange.vue';
import RoomFirstPage from '../views/Room/RoomFirstPage.vue';
import RoomCard from '../views/Room/RoomCard.vue';
import DamageRecad from '../views/Room/DamageRecad.vue';
import ShiftWorkPage from '../views/Room/ShiftWorkPage.vue';
import CheckOut from '../views/Room/Check_out.vue';
import BookPayType from '../views/BookPayType/BookPayType.vue';
import ClientType from '../views/ClientType/ClientType.vue';

import Guest from '../views/Guest/Guest.vue';

import MemberManage from '../views/MemberManage/MemberManage.vue';

import BillSetting from '../views/BillSetting/BillSetting.vue';

import Device from '../views/Device/Device.vue';

import RoomType from '../views/RoomType/RoomType.vue';

import RoomManage from '../views/RoomManage/RoomManage.vue';

import GuestInfo from '../views/GuestInfo/GuestInfo.vue';

import Log from '../views/Log/Log.vue';

import MemberSetting from '../views/MemberSetting/MemberSetting.vue';

import GoodsManage from '../views/GoodsManage/GoodsManage.vue';

import DataReport from '../views/DataReport/DataReport.vue';


Vue.use(VueRouter)
// {
//   path:'/index',
//   name:'index',
//   component:()=>import('@/views/index.vue'),
//   meta:{
//     title:'系统首页',
//     hideclose:true,//不可以关闭
//   }
// },
const routes = [{
  path: '/',
  name: 'home',
  redirect: '/login',
  component: Home,
  meta: {
    title: '首页'
  },
  children: [
    {
      path: '/room',//客房业务
      name: 'room',
      component: RoomSerive,
      redirect: '/RoomFirstPage',
      meta: {
        title: '客房业务',
        hideclose: true, //不可以关闭
      },
      children: [
        {
          path: '/RoomFirstPage', //首页
          component: RoomFirstPage,
          meta: {
            title: '客房业务',
            hideclose: true, //不可以关闭
          }
        },
        {
          path: '/ShiftWorkPage', //换班结算
          component: ShiftWorkPage,
          meta: {
            title: '换班结算',
          }
        },
        {
          path: '/DamageRecad', //损赔录入
          component: DamageRecad,
          meta: {
            title: '损赔录入',
          }
        },
        {
          path: '/RoomBooking', //客房预订
          component: RoomBooking,
          meta: {
            title: '客房预订'
          }
        },
        {
          path: '/Check_in', //入住
          component: Check_in,
          meta: {
            title: '入住登记'
          }
        },
        {
          path: '/Replenishuser', //补录住客
          component: Replenishuser,
          meta: {
            title: '补录住客'
          }
        },
        {
          path: '/StayOver', //续住登记
          component: StayOver,
          meta: {
            title: '续住登记'
          }
        },

        {
          path: '/RoomChange', //换房登记
          component: RoomChange,
          meta: {
            title: '换房登记'
          }
        },
        {
          path: '/RoomCard', //房卡管理
          component: RoomCard,
          meta: {
            title: '房卡管理'
          }
        },
        {

          path: '/CheckOut', //退房
          component: CheckOut,
          meta: {
            title: '退房'
          }
        }
      ]
    },

    {
      path: '/Booking', //预订查询
      component: Booking,
      meta: {
        title: '预订查询'
      }
    },

    {
      path: '/Guest', //住客查询
      component: Guest,
      meta: {
        title: '住客查询'
      }
    },
    {
      path: '/MemberManage', //会员管理
      component: MemberManage,
      meta: {
        title: '会员管理'
      }
    },
    {
      path: '/BillSetting', //计费设置
      component: BillSetting,
      meta: {
        title: '计费设置'
      }
    },
    {
      path: '/Device', //设备管理
      component: Device,
      meta: {
        title: '设备管理',
      }
    },
    {
      path: '/RoomType', //房间类型管理
      component: RoomType,
      meta: {
        title: '房间类型管理'
      }
    },
    {
      path: '/RoomManage', //房间管理
      component: RoomManage,
      meta: {
        title: '房间管理'
      }
    },
    {
      path: '/GuestInfo', //客史信息
      component: GuestInfo,
      meta: {
        title: '客史信息'
      }
    },
    {
      path: '/Log', //操作日志
      component: Log,
      meta: {
        title: '操作日志'
      }
    },
    {
      path: '/MemberSetting', //会员设置
      component: MemberSetting,
      meta: {
        title: '会员设置'
      }
    },
    {
      path: '/GoodsManage', //物件管理
      component: GoodsManage,
      meta: {
        title: '物件管理'
      }
    },
    {
      path: '/DataReport', //数据统计
      component: DataReport,
      meta: {
        title: '数据统计'
      }
    },
    {
      path: '/BookPayType', //预订支付方式
      component: BookPayType,
      meta: {
        title: '预订支付方式设置'
      }
    },
    {
      path: '/ClientType', //预订支付方式
      component: ClientType,
      meta: {
        title: '客户类型设置'
      }
    },
  ]
},
{
  path: '/login',
  component: Login
},

]

const router = new VueRouter({
  routes
})

export default router