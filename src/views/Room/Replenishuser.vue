<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :offset="3" :span="18">
          <el-row>
            <p class="title">补录住客</p>
          </el-row>

          <el-form ref="formReplenish" label-width="130px" :model="formReplenish" :rules="rules">
            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="房号：">
                  <el-input clearable v-model="formReplenish.room_no" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7"></el-col>
              <el-col :span="7"></el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="客户类型：">
                  <el-input clearable v-model="formReplenish.type" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="团体名称：">
                  <el-input clearable v-model="formReplenish.groupname" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="国籍：">
                  <el-input clearable v-model="formReplenish.nationality" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="证件类型：">
                  <el-input clearable v-model="formReplenish.zhengjian" disabled></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="7">
                <el-form-item label="联系电话：">
                  <el-input clearable v-model="formReplenish.tel" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="会员卡号：">
                  <el-input clearable v-model="formReplenish.cardNum" :disabled="disabledMeber"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="客主姓名：">
                  <el-input clearable v-model="formReplenish.name" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="证件号：">
                  <el-input clearable v-model="formReplenish.zhengjian_no" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-button style="width: 40%; margin-left: -150px" type="success" round>住客登记查询</el-button>
              </el-col>
            </el-row>

            <el-row>
              <el-form-item label="证件地址：">
                <el-input clearable v-model="formReplenish.address" disabled></el-input>
              </el-form-item>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="入住时间：">
                  <el-date-picker
                    style="width: 100%"
                    v-model="formReplenish.start_time"
                    type="datetime"
                    disabled
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="离店时间：" prop="end_time">
                  <el-date-picker
                    style="width: 60%"
                    v-model="formReplenish.end_time"
                    type="datetime"
                    placeholder="选择日期时间"
                    @change="pickerEnd_time"
                  ></el-date-picker>
                  <el-input
                    style="width: 40%"
                    v-model="formReplenish.datecount"
                    placeholder="请输入天数"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4"></el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item class="settingImprest" label="已付金额(元)：">
                  <el-input clearable v-model="formReplenish.count_money" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item class="settingImprest" label="已付押金(元)：">
                  <el-input v-model="formReplenish.yajin_money" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item class="settingImprest" label="房间单价(元)：">
                  <el-input v-model="formReplenish.price" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item class="settingImprest" label="待付金额(元)：">
                  <el-input v-model="formReplenish.price" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="会员卡支付：">
                  <el-select
                    v-model="formReplenish.is_card_pay"
                    :disabled="disabledMeber"
                   
                    style="width: 100%"
                  >
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="卡扣金额：">
                  <el-input
                    clearable
                    v-model="formReplenish.card_money"
                    :disabled="disabledMeber"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="预付方式：" prop="paymethod">
                  <el-select
                    v-model="formReplenish.paymethod"
                    placeholder="请选择预付方式"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="(item,index) in payForForhod"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item class="settingImprest" label="支付金额(元)：" prop="bulu_money">
                  <el-input clearable v-model="formReplenish.bulu_money"></el-input>
                </el-form-item>
              </el-col>
                     <el-col :span="7">
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
<script>
import { paymethod } from "@/api/member.js";
import { KeSearch, BuLu } from "@/api/Replenish.js";
import {orderMemberinfo} from '@/api/StayOver'
import { getAllTime, getDayTime } from "@/utils/moment.js";
import Moment from "moment";
export default {
  data() {
    var bookMoney = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("输入金额不能为空"));
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
      formReplenish: {},
      //   表单规则
      rules: {
        end_time: [
          { required: true, message: "请选择离店时间", trigger: "change" }
        ],
        paymethod: [
          { required: true, message: "请选择预订支付方式", trigger: "change" }
        ],
        bulu_money: [{ validator: bookMoney, trigger: "blur" }]
      },

      // 房间Id
      roomID: "",

      // 支付方式
      payForForhod: [],

      // 会员卡号是否禁用
      disabledMeber: true,
    };
  },


  created() {
     this.formReplenish.room_no = this.$route.query.room_no
      this.formReplenish.room_id = this.$route.query.id
    this.getKeInfo();
    this.getPaymethodList();
  },
  methods: {
    // 查询客主信息
    getKeInfo() {
      let parmas = {
        room_no: this.$route.query.room_no,
        room_id: this.$route.query.id
      };
      KeSearch(parmas).then(res => {
        res = typeof res == "string" ? JSON.parse(res) : res;
        console.log(res, "获取客主信息");
        if (res.code === 0) {
          this.formReplenish = res.data;
          this.searchVip(res.data.tel)
        }
      });
    },

    //充值方式
    getPaymethodList() {
      paymethod().then(res => {
        res = JSON.parse(res);
        console.log(res, "获取充值列表");
        if (res.code === 0) {
          this.payForForhod = res.data;
        } else {
          this.message("error", res.message);
        }
      });
    },

    // 选择结束时间
    pickerEnd_time(v) {
      // console.log(v);
      // console.log(this.formReplenish.start_time);
      let endtime = getAllTime(v);
      if (this.formReplenish.start_time) {
        if (endtime < this.formReplenish.start_time) {
          this.message("warning", "预离时间不能小于预到时间");
          this.formReplenish.end_time = "";
          return;
        }
        this.formReplenish.datecount = getDayTime(
          this.formReplenish.start_time,
          v
        );
        // console.log(this.formReplenish.datecount);
      }
    },

    // 提交表单
    submitForm() {
      this.$refs.formReplenish.validate(valid => {
        let parmas = {
          room_no: this.formReplenish.room_no,
          paymethod: this.formReplenish.paymethod,
          is_card_pay: this.formReplenish.is_card_pay,
          end_time: this.formReplenish.end_time,
          member_card: this.formReplenish.paymethod,
          card_money: this.formReplenish.card_money,
          other_pay_money: this.formReplenish.other_pay_money,
          bulu_money: this.formReplenish.bulu_money,
          datecount: this.formReplenish.datecount,
          room_id: this.formReplenish.room_id,
          discount_money: this.formReplenish.discount_money,
          order_id: this.formReplenish.id,
          count_money: this.formReplenish.count_money
        };
        if (valid) {
          BuLu(parmas).then(res => {
            res = JSON.parse(res);
            console.log(res, "补录成功");
          });
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

          
      // 查询是否是会员
      searchVip(member_card) {
        orderMemberinfo({
          member_card
        }).then(res => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          // console.log(res,'会员余额')
          if (res.code == 0) {
            if (res.data) {
              this.disabledMeber = false
              this.formReplenish.is_card_pay = '否'
            }
          } else {
            this.message("error", res.message)
          }
        })
      }
  }
};
</script>
<style  lang="less" scoped>
.el-main {
  background: #fff;
}
.title {
  font-size: 26px;
  width: 100%;
  margin-bottom: 40px;
  margin-top: 20px;
  color: #005ab9;
}
</style>