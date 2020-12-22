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
                  <el-input clearable v-model="formReplenish.cardNum" disabled></el-input>
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
                <el-form-item class="settingImprest" label="已交房费(元)：">
                  <el-input clearable v-model="formReplenish.count_money" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item class="settingImprest" label="押金(元)：">
                  <el-input v-model="formReplenish.yajin_money" disabled></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="7">
                <el-form-item label="会员卡支付：">
                  <el-select v-model="formReplenish.is_card_pay"  :disabled="disabledMember_card"  style="width: 100%"  >
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="卡扣金额：">
                  <el-input clearable v-model="formReplenish.card_money"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="预付方式：" prop="paymethod">
                  <el-select v-model="formReplenish.paymethod" style="width: 100%">
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
                <el-form-item class="settingImprest" label="补录房费(元)：" prop="bulu_money">
                  <el-input clearable v-model="formReplenish.bulu_money"></el-input>
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
<script>
import { paymethod } from "@/api/member.js";
import { KeSearch,MemberMoneySearch} from "@/api/Replenish.js";
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
      formReplenish: {
        room_no: this.$route.query.room_no,
        type: "",
        groupname: "",
        nationality: "",
        zhengjian: "",
        tel: "",
        datecount: "",
        zhengjian_no: "",
        name: "",
        member_card: "",
        address: "",
        start_time: "",
        end_time: "",
        nationality: "",
        payCardMoney: "",
        payWay: "",
        count_money: "",
        // bookMoney: "",
        bulu_money: "",
        yajin_money: ""
      },
      //   表单规则
      rules: {
        end_time: [
          { required: true, message: "请选择离店时间", trigger: "change" }
        ],
        payWay: [
          { required: true, message: "请选择预订支付方式", trigger: "change" }
        ],
        bulu_money: [{ validator: bookMoney, trigger: "blur" }]
      },

      // 房间Id
      roomID: "",

      // 支付方式
      payForForhod: [],

      disabledMember_card:false,
    };
  },
  computed:{
     Newmember_card() {
        return this.formReplenish.card_money
      },
  },

  watch:{
    Newmember_card(val) {
      console.log(val)
        if (val) {
          this.disabledMember_card = true
          // this.formReplenish.is_card_pay = '否'
        } else
          this.disabledMember_card = false
        deep: true
      },
  },

  created() {
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
          this.formReplenish.start_time = res.data.start_time;
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



    pickerEnd_time(v) {
      console.log(v);
      console.log(this.formReplenish.start_time);
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
        console.log(this.formReplenish.datecount);
      }
    },

    // 提交表单
    submitForm() {
      this.$refs.formReplenish.validate(valid => {
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