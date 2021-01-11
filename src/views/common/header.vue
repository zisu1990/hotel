<template>
  <div class="header">
    <div class="logo">
      <img src="@/assets/logo.png" alt srcset>
      <span>轻游酒店业务管理系统</span>
    </div>
      <el-dropdown @command="handleCloseBtn" class="_dropdown">
        <span class="el-dropdown-link">
          {{adminName}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="changeWord">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>


    <el-dialog title="修改密码" :visible.sync="changeWorDialogVisible" width="30%">
      <el-form ref="ruleForm" :model="chanword" label-width="100px" :rules="rules">
        <el-form-item label="原密码：">
          <el-input v-model="chanword.jiu" placeholder="请输入原密码" disabled></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="pass">
          <el-input v-model="chanword.pass" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="checkPass">
          <el-input v-model="chanword.checkPass" placeholder="请确认新密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="changeWorDialogVisible=false" style=" margin-left: -100px !important;">取消</el-button>
          <el-button type="primary" @click="submitForm">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import {
    systemAdmin,
    editPassWord
  } from "@/api/system";
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.chanword.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.chanword.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        changeWorDialogVisible: false, //是否隐藏弹框
        adminName: "admin",
        // 修改密码
        chanword: {
          jiu: "******",
          pass: "",
          checkPass: ""
        },
        rules: {
          pass: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          checkPass: [{
            validator: validatePass2,
            trigger: 'blur'
          }],
        }
      };
    },
    created() {
      this.getAdmin();
    },
    methods: {
      handleCloseBtn(command) {
        if (command == "changeWord") {
          this.changeWorDialogVisible = true;
        } else if (command == "logout") {
          window.sessionStorage.clear(); //清除token
          this.$router.push("/login");
        }
      },
      getAdmin() {
        systemAdmin().then(res => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          console.log(res, "系统用户");
          if (res.code == 0) {
            this.adminName = res.data.name;
          } else {
            this.message("error", res.message);
          }
        });
      },
      submitForm() {
        this.$refs.ruleForm.validate(valite => {
          if (valite) {
            let params = {
              password: this.chanword.pass,
              com_password: this.chanword.checkPass
            }
            editPassWord(params).then(res => {
              res = typeof res == "string" ? JSON.parse(res) : res;
              console.log(res, "修改密码");
              if (res.code == 0) {
                this.changeWorDialogVisible = false;
                this.message('success', res.message)
              } else {
                this.message("error", res.message);
              }
            });

          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    }
  };
</script>

<style lang="less" scoped>
._dropdown{
  height: 60px;
}
  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    // font-size: 22px;
    color: #0863c3;
    background-color: #fff;
    border-bottom: 1px solid #f2f2f2;
    height: 90px;
    line-height: 90px;
    padding: 0 20px;
    box-sizing: border-box;

    .logo {
      display: flex;

      img {
        width: 60px;
        height: 60px;
        margin-top: 15px;
        margin-right: 15px;
      }

      span {
        font-size: 28px;
        color: #0863c3;
      }
    }

    .el-dropdown-link {
      cursor: pointer;
      color: #0863c3;
    }

    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
</style>