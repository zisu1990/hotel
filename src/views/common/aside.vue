<template>
  <div class="sidebar">
    <el-menu
      ref="navListRef"
      :default-active="$route.path"
      class="el-menu-vertical-demo menu"
      active-text-color="#FFFF"
      unique-opened
      router
    >
      <el-menu-item
        :class="{ 'is-active': $store.state.navIsActive }"
        index="/RoomFirstPage"
      >
        <span slot="title">客房业务</span>
      </el-menu-item>

      <el-menu-item index="/Booking">
        <span slot="title">预订查询</span>
      </el-menu-item>
      <el-menu-item index="/Guest">
        <span>住客查询</span>
      </el-menu-item>
      <el-menu-item index="/MemberManage">
        <span>会员管理</span>
      </el-menu-item>
      <el-menu-item index="/BillSetting">
        <span>计费设置</span>
      </el-menu-item>
      <el-menu-item index="/Device">
        <span>设备管理</span>
      </el-menu-item>
      <el-menu-item index="/RoomType">
        <span>房间类型管理</span>
      </el-menu-item>
      <el-menu-item index="/RoomManage">
        <span>房间管理</span>
      </el-menu-item>
      <el-menu-item index="/GuestInfo">
        <span>客史信息</span>
      </el-menu-item>
      <el-menu-item index="/Log">
        <span>操作日志</span>
      </el-menu-item>
      <el-menu-item index="/MemberSetting">
        <span>会员设置</span>
      </el-menu-item>
      <el-menu-item index="/GoodsManage">
        <span>物件管理</span>
      </el-menu-item>
      <el-menu-item index="/DataReport">
        <span>数据统计</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
// import bus from './bus';
export default {
  mounted() {
    // console.log('tag', this.$store.state.navIsActive)
  },
  watch: {
    "$store.state.navIsActive": function (v) {
      //你需要执行的代码
      console.log("tag", v);
    },
  },
};
</script>
<style lang="less" scoped>
.sidebar {
  display: flex;
  flex-flow: column nowrap;
  text-align: left;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 260px;
  }
  .el-menu-item.is-active {
    font-size: 18px !important;

    background: linear-gradient(7deg, #005ab9 0%, #005ab9 27%, #1b79dd 100%);
    border-radius: 0px 10px 10px 0px;
    margin-left: 10px;
    text-align: center;
    padding: 0 !important;
    transition: 400ms ease-out;
    z-index: 1000;
    color: #ffff;
  }
  .el-menu-item {
    width: 260px;
    height: 54px;
    padding-left: 82px !important;
    font-size: 16px;
  }
}
</style>