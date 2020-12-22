<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :offset="3" :span="18">
          <el-row>
            <p class="title">续住登记</p>
          </el-row>

          <el-form ref="formReplenish" label-width="130px" :model="formReplenish" :rules="rules">
            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="房号：">
                  <el-input disabled v-model="formReplenish.room_no"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7"> </el-col>
              <el-col :span="7"> </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="客户类型：">
                  <el-input disabled v-model="formReplenish.type"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="团体名称：">
                  <el-input disabled v-model="formReplenish.groupname"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="国籍：">
                  <el-input disabled v-model="formReplenish.nationality"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="证件类型：">
                  <el-input disabled v-model="formReplenish.zhengjian"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="联系电话：">
                  <el-input disabled v-model="formReplenish.tel"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="会员卡号：">
                  <el-input disabled v-model="formReplenish.member_card"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="客主姓名：" prop="username">
                  <el-input disabled v-model="formReplenish.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="证件号：" prop="IDcardNum">
                  <el-input disabled v-model="formReplenish.zhengjian_no"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-button style="width: 40%; margin-left: -150px" type="success" round>住客登记查询</el-button>
              </el-col>
            </el-row>

            <el-row>
              <el-form-item label="证件地址：">
                <el-input disabled v-model="formReplenish.address"></el-input>
              </el-form-item>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="原离店时间：" prop="goOutTime">
                  <el-date-picker style="width: 100%" v-model="formReplenish.end_time" type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="续住日期：" prop="goInTime">
                  <el-date-picker style="width: 60%" v-model="formReplenish.goOutTime" type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
                  <el-input style="width: 40%" v-model="formReplenish.nationality" placeholder="请输入天数"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4"> </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item class="settingImprest" label="已预付款(元)：">
                  <el-input clearable v-model="formReplenish.haveImprest"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item class="settingImprest" label="应交预付款(元)：" prop="noHaveImprest">
                  <el-input clearable v-model="formReplenish.noHaveImprest"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="会员卡支付：">
                  <el-select v-model="formReplenish.isVipPay" style="width: 100%">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="卡扣金额：">
                  <el-input clearable v-model="formReplenish.payCardMoney"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="预付方式：" prop="payWay">
                  <el-select v-model="formReplenish.payWay" style="width: 100%">
                    <el-option label="现金" value="xianjin"></el-option>
                    <el-option label="支付宝" value="zhifubao"></el-option>
                    <el-option label="微信" value="weixin"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item prop="bookMoney" label="预付金额：">
                  <el-input clearable v-model="formReplenish.bookMoney"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row style="margin-top: 30px">
              <el-form-item>
                <el-button style="width: 100px" @click="resetForm">重置</el-button>
                <el-button style="width: 100px" size="medium" type="primary" @click="submitForm">确认</el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
</template>
</template>
<script>
  // formReplenish
  import {
    orderRoom_order
  } from '@/api/StayOver'
  export default {
    data() {
      var bookMoney = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("预订金额不能为空"));
        }
        setTimeout(() => {
          if (!Number.isInteger(+value)) {
            callback(new Error("请输入数字值"));
          } else {
            callback();
          }
        }, 100);
      };
      return {
        // 表单参数
        formReplenish: {
          roomCard: "",
          clientType: "",
          groupName: "",
          nationality: "",
          IDtype: "",
          phoneNum: "",
          cardNum: "",
          username: "",
          IDcardNum: "",
          IDaddress: "",
          goOutTime: "",
          goInTime: "",
          nationality: "",
          payCardMoney: "",
          payWay: "",
          bookMoney: "",
        },
        //   表单规则
        rules: {
        },
        roomInfo: {},
      };
    },
    created() {
      this.roomInfo.room_no = this.$route.query.room_no
      console.log('tag', this.$route.query.room_no)
      this.roomInfo.room_id = this.$route.query.id
      this.getRows()
    },
    methods: {
      getRows() {
        orderRoom_order(
          this.roomInfo
        ).then(res => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          console.log(res)
          if (res.code == 0) {
            let {
              data
            } = res
            this.formReplenish = data

          } else {
            this.message("error", res.message)
          }
        })
      },
      // 提交表单
      submitForm() {
        this.$refs.formReplenish.validate((valid) => {
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
        this.$refs.formReplenish.resetFields();
      },

    },
  };
</script>
<style scoped lang="less">
  .el-main {
    background: #fff;
  }
</style>