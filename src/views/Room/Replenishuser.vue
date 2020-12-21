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
                  <el-select v-model="formReplenish.is_card_pay" style="width: 100%">
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
import { KeSearch } from "@/api/Replenish.js";
import { getAllTime, getDayTime } from "@/utils/moment.js";
import Moment from "moment";
export default {
  data() {
    const idCardValidity = (rule, code, callback) => {
      var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
      };
      var tip = "";
      var pass = true;
      if (
        !code ||
        !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
          code
        )
      ) {
        tip = "身份证号格式错误";
        pass = false;
      } else if (!city[code.substr(0, 2)]) {
        // tip = "地址编码错误"
        tip = "身份证输入错误";
        pass = false;
      } else {
        // 18位身份证需要验证最后一位校验位
        if (code.length === 18) {
          code = code.split("");
          // ∑(ai×Wi)(mod 11)
          // 加权因子
          var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          // 校验位
          var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
          var sum = 0;
          var ai = 0;
          var wi = 0;
          for (var i = 0; i < 17; i++) {
            ai = code[i];
            wi = factor[i];
            sum += ai * wi;
          }
          var last = parity[sum % 11];
          if (parity[sum % 11] != code[17]) {
            // tip = "校验位错误"
            tip = "身份证输入错误";
            pass = false;
          }
        }
      }
      if (!pass) {
        callback(new Error(tip));
      } else {
        callback();
      }
    };
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
        count_money:"",
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
        bookMoney: [{ validator: bookMoney, trigger: "blur" }]
      },

      // 房间Id
      roomID: "",


      // 支付方式
      payForForhod: []
    };
  },

  created() {
    this.getKeInfo();
    this.getPaymethodList()
  },
  methods: {
    // 查询客主信息
    getKeInfo(){
      let parmas={
        room_no:this.$route.query.room_no,
        room_id:this.$route.query.id
      }
      KeSearch(parmas).then( res =>{
       res = typeof res == "string" ? JSON.parse(res) : res;
       console.log(res, "获取客主信息");
      })
    },
    //获取国籍列表
    getNativeList() {
      native().then(res => {
        res = typeof res == "string" ? JSON.parse(res) : res;
        console.log(res, "获取客主信息");
        if (res.code === 0) {
          this.formReplenish = res.data;
          this.formReplenish.start_time=res.data.start_time;
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

    pickerEnd_time(v){
      console.log(v)
      console.log(this.formReplenish.start_time)
      let endtime = getAllTime(v)
      if(this.formReplenish.start_time){
        if(endtime < this.formReplenish.start_time){
            this.message('warning', '预离时间不能小于预到时间')
            this.formReplenish.end_time = ""
            return
        }
        this.formReplenish.datecount = getDayTime(this.formReplenish.start_time,v)
        console.log( this.formReplenish.datecount)
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