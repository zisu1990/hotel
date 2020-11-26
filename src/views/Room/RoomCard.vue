<template>
  <el-container>
    <el-main>
      <el-row >
        <el-col :offset="3" :span="18">
          <el-row>
            <p class="title">房卡管理</p>
          </el-row>

          <el-form
            :rules="rules"
            ref="formRoomCard"
            :model="formRoomCard"
            label-width="130px"
          >
            <el-row type="flex" justify="space-between">
              <el-col :span="6">
                <el-form-item label="房号：">
                  <el-input
                    clearable
                    v-model="formRoomCard.roomName"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="客户名称：">
                  <el-input
                    clearable
                    v-model="formRoomCard.userName"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="客户类型：">
                  <el-select
                    v-model="formRoomCard.clientType"
                    style="width: 100%"
                  >
                    <el-option label="散客" value="sanke"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="6">
                <el-form-item label="房卡编号：">
                  <el-input
                    clearable
                    v-model="formRoomCard.roomCardNum"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="房卡状态：">
                  <el-input
                    clearable
                    v-model="formRoomCard.roomState"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6"> </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="入住时间：" prop="goInTime">
                  <el-date-picker
                    style="width: 100%"
                    v-model="formRoomCard.goInTime"
                    type="datetime"
                    placeholder="选择日期时间"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="离店时间：" prop="goOutTime">
                  <el-date-picker
                    style="width: 100%"
                    v-model="formRoomCard.goOutTime"
                    type="datetime"
                    placeholder="选择日期时间"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6"> </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="房卡起始期：" prop="roomCardSart">
                  <el-date-picker
                    style="width: 100%"
                    v-model="formRoomCard.roomCardSart"
                    type="datetime"
                    placeholder="选择日期时间"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="房卡有效期：" prop="roomCardEnd">
                  <el-date-picker
                    style="width: 100%"
                    v-model="formRoomCard.roomCardEnd"
                    type="datetime"
                    placeholder="选择日期时间"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6"> </el-col>
            </el-row>

            <el-row type="flex" justify="start">
              <el-col :span="12">
                <p class="handleStaff">
                  <span>操作员：店小二</span>
                  <span> 操作时间：2020-11-11 15:20 </span>
                </p>
              </el-col>
            </el-row>

            <el-row justify="center" style="margin-top: 30px">
              <el-form-item>
                <el-col :span="6">
                  <el-button style="width: 100px" @click="resetForm"
                    >读卡</el-button
                  >
                </el-col>
                <el-col :span="6">
                  <el-button style="width: 100px" @click="resetForm"
                    >清卡</el-button
                  >
                </el-col>
                <el-col :span="6">
                  <el-button
                    style="width: 100px"
                    size="medium"
                    type="success"
                    @click="submitForm"
                    >写卡</el-button
                  >
                </el-col>
              </el-form-item>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      formRoomCard: {
        roomName: "",
        clientType: "",
        userName: "",
        roomCardNum: "",
        roomState: "",
        roomCardSart: "",
        roomCardEnd: "",
      },
      rules: {
        goInTime: [
          { required: true, message: "请选择入住时间", trigger: "change" },
        ],
        goOutTime: [
          { required: true, message: "请选择离店时间", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    // 提交表单
    submitForm() {
      this.$refs.formRoomCard.validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm() {
      this.$refs.formRoomCard.resetFields();
    },
  },
};
</script>
<style lang="less" scoped>
.el-main{
  background: #fff;
}
</style>