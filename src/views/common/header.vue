<template>
  <div class="header">
    <div>
      <span>轻游酒店业务管理系统</span>
    </div>
    <el-dropdown @command="handleCloseBtn" class="_dropdown">
      <span class="el-dropdown-link">
        admin
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="changeWord">修改密码</el-dropdown-item>
        <el-dropdown-item command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dialog title="修改密码" :visible.sync="changeWorDialogVisible" width="30%">
      <el-form ref="changeWordRef" :model="chanword" label-width="100px">
        <el-form-item label="原密码：">
          <el-input v-model="chanword.oldWord" placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码：">
          <el-input v-model="chanword.newWord" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：">
          <el-input v-model="chanword.sureWord" placeholder="请确认新密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="changeWorDialogVisible=false" style=" margin-left: -100px !important;">取消</el-button>
          <el-button type="primary" @click="changeWorDialogVisible=false">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      changeWorDialogVisible: false,//是否隐藏弹框

      // 修改密码
      chanword: {
        oldWord: "",
        newWord: "",
        sureWord: ""
      }
    };
  },
  methods: {
    handleCloseBtn(command) {
      if (command == "changeWord") {
        this.changeWorDialogVisible = true;
      } else if (command == "logout") {
        window.sessionStorage.clear(); //清除token
        this.$router.push("/login");
      }
    }
  }
};
</script>
 
<style lang="less" scoped>
.header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  // font-size: 22px;
  color: #fff;
  background-color: #11c26d;
  height: 90px;
  line-height: 90px;
  padding: 0 20px;
  box-sizing: border-box;
  .el-dropdown-link {
    cursor: pointer;
    color: #fff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>