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
                <el-form-item label="客主姓名：">
                  <el-input disabled v-model="formReplenish.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="证件号：">
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
                <el-form-item label="原离店时间：">
                  <el-date-picker disabled style="width: 100%" v-model="formReplenish.end_time" type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item prop="goOutTime" label="续住日期：">
                  <el-date-picker style="width: 60%" @change="handlePickerChange($event)"
                    v-model="formReplenish.goOutTime" type="datetime" placeholder="选择日期时间">
                  </el-date-picker>
                  <el-input style="width: 40%" v-model="formReplenish.stayOverDay" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4"> </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item class="settingImprest" label="已付金额：">
                  <el-input disabled v-model="formReplenish.count_money"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item class="settingImprest" label="已付押金：">
                  <el-input disabled v-model="formReplenish.yajin_money"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="房间单价：">
                  <el-input v-model="formReplenish.price" disabled :style="{ width: '100%' }"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="待付金额：">
                  <el-input v-model="formReplenish.RoomSumMoney" disabled :style="{ width: '100%' }"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="会员卡支付：">
                  <el-select :disabled="disabledMeber" v-model="formReplenish.is_card_pay" style="width: 100%">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7" style="position: relative;">
                <el-form-item label="卡扣金额：">
                  <el-input :disabled="disabledCardKkNum" clearable v-model="formReplenish.payCardMoney"></el-input>
                  <span style="
                  font-size: 14px;
                  color: #005ab9;
                   position: absolute;
                   right:-100px;
                ">{{getBalance}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="待付方式：" prop="paymethod">
                  <el-select v-model="formReplenish.paymethods" style="width: 100%">
                    <el-option v-for="(item,index) in payForForhod" :key="index" :label="item.name" :value="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item prop="stayOverMoney" label="支付金额：">
                  <el-input clearable v-model="formReplenish.stayOverMoney"></el-input>
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
  // formReplenish
  import {
    orderRoom_order,
    settingInfo,
    orderMemberinfo,
    orderXuzhu
  } from '@/api/StayOver'
  import {
    getDayTime,
    getAllTime,
    isBefore
  } from '@/utils/moment.js'
  import {
    paymethod
  } from "@/api/member.js";
  import Moment from 'moment'
  export default {
    data() {
      var bookMoney = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("预订金额不能为空"));
        }
        setTimeout(() => {
          if (Number(value) < 0 || !Number(value)) {
            callback(new Error("请输入有效数字"));
          } else {
            callback();
          }
        }, 100);
      };

      return {
        // 表单参数
        formReplenish: {},
        //   表单规则
        rules: {},
        // 房间id，房号
        roomInfo: {},
        // 支付方式
        payForForhod: [],
        // 会员卡号是否禁用
        disabledMeber: true,
        // 卡扣是否禁用
        disabledCardKkNum: true,
        // 会员详情
        VipInfo: {
          balance: ""
        },
        // 计费详情
        settingInfo: {},
        rules: {
          stayOverMoney: [{
              required: true,
              message: "请输入预付金额",
              trigger: "blur"
            },
            {
              validator: bookMoney,
              trigger: "blur"
            }
          ],
          goOutTime: [{
            required: true,
            message: "请选择续住日期",
            trigger: "change"
          }]
        },
      };
    },
    computed: {
      Newis_card_pay() {
        return this.formReplenish.is_card_pay
      },
      Newmember_card() {
        return this.formReplenish.payCardMoney
      },
      getBalance() {
        return this.VipInfo.balance ? '余额' + this.VipInfo.balance + '元' : ''
      }
    },
    watch: {
      Newis_card_pay(val) {
        if (val == '否'||!val)
          this.disabledCardKkNum = true
        else
          this.disabledCardKkNum = false
        deep: true
      },
      Newmember_card(val) {
        if (!val) {
          this.disabledMeber = true
          this.formReplenish.is_card_pay = '否'
        } else
          this.disabledMeber = false
        deep: true
      },
    },
    created() {
      this.roomInfo.room_no = this.$route.query.room_no
      this.roomInfo.room_id = this.$route.query.id
      this.getRows()
    },
    methods: {
      getRows() {
        this.getPaymethodList()
        this.getMoneyWay()
        orderRoom_order(
          this.roomInfo
        ).then(res => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          if (res.code == 0) {
            let {
              data
            } = res
            console.log(res)
            this.formReplenish = data
            this.searchVip(data.tel)
          } else {
            this.message("error", res.message)
          }
        })
      },
      //充值方式
      getPaymethodList() {
        paymethod().then(res => {
          res = JSON.parse(res);
          // console.log(res, "获取充值列表");
          if (res.code === 0) {
            this.payForForhod = res.data;
          } else {
            this.message("error", res.message);
          }
        });
      },

      // inputchange
      handlePickerChange(e) {
        if (!e) {
          this.formReplenish.RoomSumMoney = '0'
        }
        if (!isBefore(this.formReplenish.end_time, e)) {
          this.message('error', '续住日期不能小于原离店日期')
          this.formReplenish.goOutTime = ''
          this.formReplenish.RoomSumMoney = '0'
          return
        }
        let formReplenish = this.formReplenish
        let price = formReplenish.price
        let end_time = formReplenish.end_time
        let settingInfo = this.settingInfo
        let HHend_time = Moment(e).format('HH:mm')
        let YYend_time = Moment(e).format('YYYY-MM-DD')
        let HHend_time1 = Moment(formReplenish.end_time).format('HH:mm')
        let YYend_time1 = Moment(formReplenish.end_time).format('YYYY-MM-DD')
        let hh = Number(Moment(formReplenish.end_time).format('HH'))
        let mm = Number(Moment(formReplenish.end_time).format('mm'))
        let hh1 = Number(settingInfo.tfend_time1.substring(0, 2))
        let mm1 = Number(settingInfo.tfend_time1.substring(3, 5))
        let VIPhh1 = Number(settingInfo.membertf_end_time1.substring(0, 2))
        let VIPmm1 = Number(settingInfo.membertf_end_time1.substring(3, 5))
        let hh2 = Number(Moment(e).format('HH'))
        let mm2 = Number(Moment(e).format('mm'))
        let totolMoneny = 0
        let diffDay = Moment(e).diff(Moment(YYend_time1), 'days')
        // 正常时间订房
        if (diffDay == 0) {
          // 非会员
          // console.log(HHend_time > settingInfo.tfend_time1)
          // console.log(HHend_time <= settingInfo.tfend_time2)
          // console.log(HHend_time1 <= settingInfo.tfend_time1)
          if (this.disabledMeber) {
            // 下午退房时间之内按小时收费
            if (HHend_time > settingInfo.tfend_time1 && HHend_time <= settingInfo.tfend_time2 && HHend_time1 <=
              settingInfo.tfend_time1) {
              // console.log('正常时间订房-下午退房时间之内按小时收费')
              if (hh2 - hh1 == 0) {
                if (mm2 > mm1) {
                  totolMoneny += Number(settingInfo.tf_money1)
                } else {}
              } else {
                if (mm2 > mm1) {
                  totolMoneny += Number(settingInfo.tf_money1) * ((hh2 - hh1) + 1)
                } else
                  totolMoneny += Number(settingInfo.tf_money1) * (hh2 - hh1)
              }
            } else if (HHend_time > settingInfo.tfend_time2 && HHend_time1 < settingInfo.tfend_time1) {
              // 下午退房时间之内按天收费
              totolMoneny += price * Number(settingInfo.tf_date)
            } else if (HHend_time > settingInfo.tfend_time2 && HHend_time1 > settingInfo.tfend_time1 && HHend_time1 <=
              settingInfo.tfend_time2) {
              let oldsum = 0
              if (hh - hh1 == 0) {
                if (mm > mm1) {
                  oldsum += Number(settingInfo.tf_money1)
                }
              } else {
                if (mm > mm1) {
                  oldsum += Number(settingInfo.tf_money1) * ((hh - hh1) + 1)
                } else
                  oldsum += Number(settingInfo.tf_money1) * (hh - hh1)
              }
              totolMoneny += (price * Number(settingInfo.tf_date)) - (oldsum)
            } else if (HHend_time > settingInfo.tfend_time1 && HHend_time <= settingInfo.tfend_time2 && HHend_time1 >
              settingInfo.tfend_time1) {
              if (hh2 - hh1 == 0) {
                if (mm2 > mm1 && mm < mm1) {
                  totolMoneny += Number(settingInfo.tf_money1)
                }
              } else {
                if (mm2 > mm1 && mm < mm1) {
                  totolMoneny += Number(settingInfo.tf_money1) * ((hh2 - hh1) + 1)
                } else {
                  totolMoneny += Number(settingInfo.tf_money1) * (hh - hh1)
                }
              }
            }
          } else {
            // 会员
            if (HHend_time > settingInfo.membertf_end_time1 && HHend_time <= settingInfo.membertf_end_time2 &&
              HHend_time1 <= settingInfo.membertf_end_time1) {
              // console.log('正常时间订房-下午退房时间之内按小时收费')
              if (hh2 - VIPhh1 == 0) {
                if (mm2 > VIPmm1) {
                  totolMoneny += Number(settingInfo.membertf_tf_money1)
                } else {}
              } else {
                if (mm2 > VIPmm1) {
                  totolMoneny += Number(settingInfo.membertf_tf_money1) * ((hh2 - VIPhh1) + 1)
                } else
                  totolMoneny += Number(settingInfo.membertf_tf_money1) * (hh2 - VIPhh1)
              }
            } else if (HHend_time > settingInfo.membertf_end_time2 && HHend_time1 < settingInfo.membertf_end_time1) {
              // 下午退房时间之内按天收费
              totolMoneny += price * Number(settingInfo.tf_date)
            } else if (HHend_time > settingInfo.membertf_end_time2 && HHend_time1 > settingInfo.membertf_end_time1 &&
              HHend_time1 <=
              settingInfo.membertf_end_time2) {
              let oldsum = 0
              if (hh - VIPhh1 == 0) {
                if (mm > VIPmm1) {
                  oldsum += Number(settingInfo.membertf_tf_money1)
                }
              } else {
                if (mm > VIPmm1) {
                  oldsum += Number(settingInfo.membertf_tf_money1) * ((hh - VIPhh1) + 1)
                } else
                  oldsum += Number(settingInfo.membertf_tf_money1) * (hh - VIPhh1)
              }
              totolMoneny += (price * Number(settingInfo.tf_date)) - (oldsum)
            } else if (HHend_time > settingInfo.membertf_end_time1 && HHend_time <= settingInfo.membertf_end_time2 &&
              HHend_time1 >
              settingInfo.membertf_end_time1) {
              if (hh2 - VIPhh1 == 0) {
                if (mm2 > VIPmm1 && mm < VIPmm1) {
                  totolMoneny += Number(settingInfo.membertf_tf_money1)
                }
              } else {
                if (mm2 > VIPmm1 && mm < VIPmm1) {
                  totolMoneny += Number(settingInfo.membertf_tf_money1) * ((hh2 - VIPhh1) + 1)
                } else {
                  totolMoneny += Number(settingInfo.membertf_tf_money1) * (hh - VIPhh1)
                }
              }
            }
            totolMoneny = (totolMoneny * Number(this.VipInfo.discount / 100)).toFixed(2)
          }
        } else {
          totolMoneny = price * (diffDay)
          // 非会员
          if (this.disabledMeber) {
            // 下午退房时间之内按小时收费
            if (HHend_time > settingInfo.tfend_time1 && HHend_time <= settingInfo.tfend_time2 && HHend_time1 <=
              settingInfo.tfend_time1) {
              // console.log('正常时间订房-下午退房时间之内按小时收费')
              if (hh2 - hh1 == 0) {
                if (mm2 > mm1) {
                  totolMoneny += Number(settingInfo.tf_money1)
                } else {}
              } else {
                if (mm2 > mm1) {
                  totolMoneny += Number(settingInfo.tf_money1) * ((hh2 - hh1) + 1)
                } else
                  totolMoneny += Number(settingInfo.tf_money1) * (hh2 - hh1)
              }
            } else if (HHend_time > settingInfo.tfend_time2 && HHend_time1 < settingInfo.tfend_time1) {
              // 下午退房时间之内按天收费
              totolMoneny += price * Number(settingInfo.tf_date)
            } else if (HHend_time > settingInfo.tfend_time2 && HHend_time1 > settingInfo.tfend_time1 && HHend_time1 <=
              settingInfo.tfend_time2) {
              let oldsum = 0
              if (hh - hh1 == 0) {
                if (mm > mm1) {
                  oldsum += Number(settingInfo.tf_money1)
                }
              } else {
                if (mm > mm1) {
                  oldsum += Number(settingInfo.tf_money1) * ((hh - hh1) + 1)
                } else
                  oldsum += Number(settingInfo.tf_money1) * (hh - hh1)
              }
              totolMoneny += (price * Number(settingInfo.tf_date)) - (oldsum)
            } else if (HHend_time > settingInfo.tfend_time1 && HHend_time <= settingInfo.tfend_time2 && HHend_time1 >
              settingInfo.tfend_time1) {
              if (hh2 - hh1 == 0) {
                if (mm2 > mm1 && mm < mm1) {
                  totolMoneny += Number(settingInfo.tf_money1)
                }
              } else {
                if (mm2 > mm1 && mm < mm1) {
                  totolMoneny += Number(settingInfo.tf_money1) * ((hh2 - hh1) + 1)
                } else {
                  totolMoneny += Number(settingInfo.tf_money1) * (hh - hh1)
                }
              }
            }
          } else {
            // 会员
            if (HHend_time > settingInfo.membertf_end_time1 && HHend_time <= settingInfo.membertf_end_time2 &&
              HHend_time1 <
              settingInfo.membertf_end_time1) {
              // console.log('正常时间订房-下午退房时间之内按小时收费')
              if (hh2 - VIPhh1 == 0) {
                if (mm2 > VIPmm1) {
                  totolMoneny += Number(settingInfo.membertf_tf_money1)
                } else {}
              } else {
                if (mm2 > VIPmm1) {
                  totolMoneny += Number(settingInfo.membertf_tf_money1) * ((hh2 - VIPhh1) + 1)
                } else
                  totolMoneny += Number(settingInfo.membertf_tf_money1) * (hh2 - VIPhh1)
              }
            } else if (HHend_time > settingInfo.membertf_end_time2 && HHend_time1 < settingInfo.membertf_end_time1) {
              // 下午退房时间之内按天收费
              totolMoneny += price * Number(settingInfo.tf_date)
            } else if (HHend_time > settingInfo.membertf_end_time2 && HHend_time1 > settingInfo.membertf_end_time1 &&
              HHend_time1 <=
              settingInfo.membertf_end_time2) {
              let oldsum = 0
              if (hh - VIPhh1 == 0) {
                if (mm > VIPmm1) {
                  oldsum += Number(settingInfo.membertf_tf_money1)
                }
              } else {
                if (mm > VIPmm1) {
                  oldsum += Number(settingInfo.membertf_tf_money1) * ((hh - VIPhh1) + 1)
                } else
                  oldsum += Number(settingInfo.membertf_tf_money1) * (hh - VIPhh1)
              }
              totolMoneny += (price * Number(settingInfo.tf_date)) - (oldsum)
            } else if (HHend_time > settingInfo.membertf_end_time1 && HHend_time <= settingInfo.membertf_end_time2 &&
              HHend_time1 >
              settingInfo.membertf_end_time1) {
              if (hh2 - VIPhh1 == 0) {
                if (mm2 > VIPmm1 && mm < VIPmm1) {
                  totolMoneny += Number(settingInfo.membertf_tf_money1)
                }
              } else {
                if (mm2 > VIPmm1 && mm < VIPmm1) {
                  totolMoneny += Number(settingInfo.membertf_tf_money1) * ((hh2 - VIPhh1) + 1)
                } else {
                  totolMoneny += Number(settingInfo.membertf_tf_money1) * (hh - VIPhh1)
                }
              }
            }
            totolMoneny = (totolMoneny * Number(this.VipInfo.discount / 100)).toFixed(2)
          }
        }
        console.log(this.formReplenish.end_time)
        formReplenish.stayOverDay = getDayTime(this.formReplenish.end_time, e)
        formReplenish.RoomSumMoney = totolMoneny
        this.$forceUpdate()

      },
      // 计费设置
      getMoneyWay() {
        settingInfo().then(res => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          // console.log(res)
          if (res.code == 0) {
            this.settingInfo = res.data
          } else {
            this.message("error", res.message)
          }
        })
      },
      // 提交表单
      submitForm() {
        this.$refs.formReplenish.validate((valid) => {
          if (valid) {
            let params = {
              room_no: this.roomInfo.room_no,
              end_time: this.formReplenish.end_time,
              now_end_time: getAllTime(this.formReplenish.goOutTime),
              datecount: this.formReplenish.stayOverDay,
              count_money: this.formReplenish.count_money,
              xuzhu_money: this.formReplenish.RoomSumMoney + '',
              is_card_pay: this.formReplenish.is_card_pay,
              card_money: this.formReplenish.payCardMoney,
              paymethod: this.formReplenish.paymethods,
              other_pay_money: this.formReplenish.stayOverMoney,
              room_id: this.roomInfo.room_id,
              order_id: this.formReplenish.id,
              member_card: this.formReplenish.member_card ? this.formReplenish.tel : '',
            }
            orderXuzhu(params).then(res => {
              res = typeof res == "string" ? JSON.parse(res) : res;
              // console.log('续住接口', res)
              if (res.code == 0) {
                this.message("success", res.message)
              } else {
                this.message("error", res.message)
              }
            })
          } else {
            // console.log("error submit!!");
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
          // console.log(res)
          if (res.code == 0) {
            if (res.data) {
              this.disabledMeber = false
              this.formReplenish.is_card_pay = '否'
              this.VipInfo = res.data
            }
          } else {
            this.message("error", res.message)
          }
        })
      }
    },
  };
</script>
<style scoped lang="less">
  .el-main {
    background: #fff;
  }
</style>