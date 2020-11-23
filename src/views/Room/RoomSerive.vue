<template>
  <el-container>
    <el-main>Main</el-main>
    <el-aside width="230px">
      <span>营业实况/房间检索</span>
      <div class="roomType">
        <b></b>
        <span>房态</span>
      </div>
    </el-aside>
  </el-container>
</template>


<script>
export default {
  data() {
    return {
      Navshow: true
    };
  }
};
</script>

<style lang="less" scoped>
.el-aside {
  background-color: #fff;
  text-align: center;
  padding: 20px 10px;
  box-sizing: border-box;
  .roomType {
    b {
      width: 2px;
      height: 10px;
      background: #f00;
    }
  }
}

.el-main {
  margin-right: 20px;
  background-color: #fff;
}
</style>








   