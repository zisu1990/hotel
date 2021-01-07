<template>
  <el-container>
    <el-main>
      <h2>退房</h2>
      <div class="checkWarp">
        <el-row :gutter="20" type="flex" justify="center">
          <el-col :span="6">客户名称：{{roomOrderInfo.name}}</el-col>
          <el-col :span="6">客户类型：{{roomOrderInfo.type}}</el-col>
          <el-col :span="6">会员卡号：{{VipInfo.card_no?VipInfo.card_no:'无'}}</el-col>
          <el-col :span="6">会员卡金额：{{VipInfo.balance?VipInfo.balance+'元':'0元'}}</el-col>
        </el-row>
        <p class="chooseTitle">消费明细：</p>
        <el-table ref="multipleTable" :data="tuiInfo.room_list" tooltip-effect="dark" style="width: 100%" border
          @selection-change="handleSelectionChange($event)">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="room_no" label="房间号" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="start_time" label="入住时间" align="center"></el-table-column>
          <el-table-column prop="end_time" label="离店时间" align="center"></el-table-column>
          <el-table-column prop="datecount" label="天数" align="center"></el-table-column>
          <el-table-column prop="status" label="状态" align="center"></el-table-column>
        </el-table>
        <p class="chooseTitle">赔损明细：</p>
        <el-table ref="multipleTable1" :data="xiaoFeiTableData" tooltip-effect="dark" show-summary style="width: 100%"
          :summary-method="getSummaries" border @selection-change="handleSelectionChange1">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="room_no" label="房间号" align="center"></el-table-column>
          <el-table-column prop="customer_name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="create_time" show-overflow-tooltip label="录入时间" align="center"></el-table-column>
          <el-table-column prop="name" label="损坏物品" align="center"></el-table-column>
          <el-table-column prop="num" label="数量" align="center"> </el-table-column>
          <el-table-column prop="price" label="单价" align="center"> </el-table-column>
          <el-table-column prop="money" label="赔损金额" align="center"> </el-table-column>
          <el-table-column prop="status" label="状态" align="center"></el-table-column>
        </el-table>

        <el-form ref="checkOutForm" :model="checkOutForm" :rules="rules" label-width="140px">
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8">
              <el-form-item label="消费金额：">
                <el-input v-model="checkOutForm.xiaofei" :style="{width: '100%'}" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预交房费：">
                <el-input v-model="tuiInfo.count_money" :style="{width: '100%'}" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="待支付金额：">
                <el-input v-model="checkOutForm.ToBePaid" :style="{width: '100%'}" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8">
              <el-form-item label="押金抵扣：">
                <el-select @change="payforChange" v-model="checkOutForm.payfor" placeholder="请选择"
                  :style="{width: '100%'}">
                  <el-option label="是" value="是"></el-option>
                  <el-option label="否" value="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="	退押方式:">
                <el-select :disabled="yajinpayDisabled" v-model="checkOutForm.yajinpayMethod" placeholder="请选择"
                  :style="{width: '100%'}">
                  <el-option label="现金" value="现金"></el-option>
                  <el-option label="微信" value="微信"></el-option>
                  <el-option label="支付宝" value="支付宝"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="待退押金：">
                <el-input v-model="checkOutForm.yajin_money" :style="{width: '100%'}" disabled></el-input>
              </el-form-item>
            </el-col>

          </el-row>


          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8">
              <el-form-item label="会员卡支付：">
                <el-select :disabled="disabledMeber" v-model="checkOutForm.is_card_pay" style="width: 100%">
                  <el-option label="是" value="是"></el-option>
                  <el-option label="否" value="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="position: relative;">
              <el-form-item label="卡扣金额：">
                <el-input :disabled="disabledCardKkNum" clearable v-model="checkOutForm.payCardMoney"></el-input>
                <span style="
                  font-size: 14px;
                  color: #005ab9;
                   position: absolute;
                   right:-100px;
                ">{{getBalance}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结算方式：">
                <el-select v-model="checkOutForm.paymethod" style="width: 100%">
                  <el-option v-for="(item,index) in payForForhod" :key="index" :label="item.name" :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8">
              <el-form-item label="结算金额：" prop="SettlementAmount">
                <el-input v-model="checkOutForm.SettlementAmount" :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">

            </el-col>
            <el-col :span="8">
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center" class="btn">
            <el-form-item>
              <el-button>重置</el-button>
              <el-button type="primary" @click="submit">确认</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </div>

      <!-- 结账单打印 -->
      <el-dialog title="结账单" :visible.sync="OutDialogVisible" width="50%">
        <ul class="payForList">
          <li>
            <span>单据号：12345688</span>
            <span>房间号：8102</span>
            <span>同住房号：8103</span>
          </li>
          <li>
            <span>姓名：张三</span>
            <span>性别：男</span>
            <span>身份证号：340881199921004896</span>
          </li>
          <li>
            <span>入住时间：2020-11-04 14:47</span>
            <span>离店时间：2020-11-08 14:00</span>
          </li>
          <li>
            <span>会员卡号：NO.123456789</span>
            <span>消费总金额：￥2000（房费：￥1940, 赔损：￥60）</span>
          </li>
          <li>
            <span>消费清单</span>
            <el-table ref="multipleTable" :data="xiaoFeiTableData" tooltip-effect="dark" style="width: 100%" border>
              <el-table-column prop="roomNum" label="房间号" align="center"></el-table-column>
              <el-table-column prop="name" label="姓名" align="center"></el-table-column>
              <el-table-column prop="time" label="入住时间" align="center"></el-table-column>
              <el-table-column prop="days" label="天数" align="center"></el-table-column>
            </el-table>
          </li>
          <li>
            <span>赔损清单</span>
            <el-table ref="multipleTable1" :data="peiSunTableData" tooltip-effect="dark" style="width: 100%" border>
              <el-table-column prop="roomNum" label="房间号" align="center"></el-table-column>
              <el-table-column prop="name" label="姓名" align="center"></el-table-column>
              <el-table-column prop="time" label="录入时间" align="center"></el-table-column>
              <el-table-column prop="sunhuai" label="损坏物品" align="center"></el-table-column>
              <el-table-column prop="sum" label="数量" align="center"></el-table-column>
              <el-table-column prop="price" label="单价" align="center"></el-table-column>
              <el-table-column prop="peiPrice" label="赔损金额" align="center"></el-table-column>
            </el-table>
          </li>
          <li>
            <span>宾客电话：13156894556</span>
            <span>本酒店电话：0551-68686868</span>
            <span>打印时间：2020-11-04 14:47</span>
          </li>
        </ul>
        <div class="qianzi">客户签字：</div>

        <span slot="footer" class="dialog-footer" style="text-align:center;">
          <el-button @click="OutDialogVisible=false">暂不打印</el-button>
          <el-button type="primary" @click="OutDialogVisible=false">打印</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
  import {
    orderTui_info,
    orderMemberinfo,
    orderRoom_order,
    orderTui
  } from '@/api/Check_out.js'
  import {
    paymethod
  } from "@/api/member.js";
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
        //消费明细
        xiaoFeiTableData: [],
        // 房间信息
        xiaoFeimultipleSelection: [],
        multipleSelection: [],
        sunpei: "",
        // sunpeiMoney: "",
        // 押金倍数
        multipleNum: 0,
        // 退房信息
        tuiInfo: {},
        //赔损明细
        peiSunTableData: [{
          roomNum: 8107,
          name: "张三",
          time: "2020-11-11 10:20:45",
          sum: 1,
          sunhuai: "电吹风",
          price: 60,
          peiPrice: 60,
          status: "未支付"
        }],
        multipleSelection1: [],
        //   表单规则
        rules: {
          SettlementAmount: [{
              required: true,
              message: "请输入结算金额",
              trigger: "blur"
            },
            {
              validator: bookMoney,
              trigger: "blur"
            }
          ]
        },
        checkOutForm: {
          parForMoney: 2000,
          isadvanceMoney: "",
          paid: 3000,
          ToBePaid: 0,
          toBeReturned: 200,
          IsCardPayfor: "",
          CardPaid: "",
          SettlementAmount: "",
          yajindikou: 0
        },

        //退款收据弹框
        OutDialogVisible: false,
        // 房间信息
        roomInfo: {},
        // 是不是会员
        isVip: false,
        roomOrderInfo: {},
        // VipInfo
        VipInfo: {},
        // 支付方式
        payForForhod: {},
        disabledCardKkNum: true,
        disabledMeber: true,
        yajinpayDisabled: true
      };
    },
    computed: {
      NewtuiInfozhu_num() {
        return this.tuiInfo.zhu_num
      },
      Newis_card_pay() {
        return this.checkOutForm.is_card_pay
      },
      Newmember_card() {
        return this.checkOutForm.payCardMoney
      },
      getBalance() {
        return this.VipInfo.balance ? '余额' + this.VipInfo.balance + '元' : ''
      }
    },
    watch: {
      NewtuiInfozhu_num(val) {
        if (val > this.multipleSelection.length) {
          this.yajinpayDisabled = true
        } else {
          this.yajinpayDisabled = false
        }
      },
      Newis_card_pay(val) {
        if (val == '否' || !val)
          this.disabledCardKkNum = true
        else
          this.disabledCardKkNum = false
        deep: true
      },
      Newmember_card(val) {
        if (!val) {
          this.disabledMeber = true
          this.checkOutForm.is_card_pay = '否'
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
      // 提交
      submit() {
        let that = this

        console.log('roomOrderInfo', this.roomOrderInfo)
        console.log('multipleSelection', this.multipleSelection)
        console.log('xiaoFeimultipleSelection', this.xiaoFeimultipleSelection)
        this.$refs.checkOutForm.validate((valid) => {
          if (valid) {
            let roomOrderInfo = that.roomOrderInfo
            let checkOutForm = that.checkOutForm
            let params = {
              id: roomOrderInfo.id,
              room_info: that.setMultipleSelection(that.multipleSelection),
              sunpei_info: that.setxiaoFeimultipleSelection(that.xiaoFeimultipleSelection),
              is_pay_yajin: checkOutForm.payfor,
              use_yajin_money: checkOutForm.yajindikou,
              count_money: roomOrderInfo.count_money,
              dai_pay_money: checkOutForm.ToBePaid,
              tui_yajin_money: checkOutForm.yajin_money,
              is_card_pay: checkOutForm.is_card_pay,
              card_money: checkOutForm.payCardMoney,
              paymethod: checkOutForm.paymethod,
              other_pay_money: checkOutForm.SettlementAmount,
              member_card: roomOrderInfo.member_card,
              tui_paymethod: checkOutForm.yajinpayMethod
            }
            orderTui(params).then(res => {
              res = typeof res == "string" ? JSON.parse(res) : res;
              console.log(res)
              if (res.code == 0) {
                this.message("success", res.message)
                this.$router.back()
              } else {
                this.message("error", res.message)
              }
            })
          }
        })
      },
      setxiaoFeimultipleSelection(v) {
        let str = ""
        v.forEach(item => {
          if (item.status != '已支付') {
            str += `${item.id},${item.money};`
          }
        })
        return str.substring(0, str.length - 1)
      },
      setMultipleSelection(v) {
        let str = ""
        v.forEach(item => {
          str +=
            `${item.id},${item.room_id},${item.room_no},${item.chao_time},${item.chao_money},${item.datecount},${item.fangfei};`
        })
        return str.substring(0, str.length - 1)
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
      // 查询是否是会员
      searchVip(member_card) {
        orderMemberinfo({
          member_card
        }).then(res => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          console.log(res)
          if (res.code == 0) {
            if (res.data) {
              this.isVip = true
              this.VipInfo = res.data
            } else {
              this.isVip = false
            }
          } else {
            this.message("error", res.message)
          }
        })
      },
      // 退房查询
      checkOutInfo(v) {
        orderTui_info(v).then(res => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          console.log(res, 'orderTui_info')
          if (res.code == 0) {
            let {
              data
            } = res
            this.tuiInfo = data
            let talArr = []
            for (let v of data.sunpei) {
              let talCell = {}
              for (let item of v.wupin_info) {
                talCell = {
                  ...v,
                  ...item
                }
                talArr.push(talCell)
              }
              // this.xiaoFeiTableData = talArr
              this.sunpei = talArr
              console.log('sunpei', talArr)
            }
          } else {
            this.message("error", res.message)
          }
        })
      },
      // 计算消费明细总价
      getSummaries(param) {
        const {
          columns,
          data
        } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if (index !== 7) {
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index]
          } else {
            sums[index] = 'N/A';
          }
        });
        // this.sunpeiMoney = sums
        return sums;
      },
      // 查询信息
      getRows() {
        this.getPaymethodList()
        orderRoom_order(
          this.roomInfo
        ).then(res => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          console.log(res)
          if (res.code == 0) {
            let {
              data
            } = res
            this.roomOrderInfo = data
            this.checkOutForm.yajin_money = data.yajin_money
            let params = {
              ...this.roomInfo,
              order_id: data.id,
              member_card: data.tel
            }
            this.checkOutInfo(params)
            // this.searchVip(data.tel)
          } else {
            this.message("error", res.message)
          }
        })
      },
      payforChange() {
        let payfor = this.checkOutForm.payfor
        let ToBePaid = Number(this.checkOutForm.ToBePaid)
        let yajin_money = Number(this.roomOrderInfo.yajin_money)
        if (payfor == '是' && this.multipleNum == 0) {
          if (ToBePaid - yajin_money < 0) {
            this.multipleNum += 1
            this.checkOutForm.yajin_money = Math.abs(ToBePaid - yajin_money)
            this.checkOutForm.ToBePaid = 0
            this.checkOutForm.yajindikou = yajin_money - ToBePaid
          } else if (this.multipleNum + 1 == 1) {
            this.multipleNum += 1
            this.checkOutForm.ToBePaid -= yajin_money
            this.checkOutForm.yajin_money = 0
            this.checkOutForm.yajindikou = yajin_money
          }
        } else {
          if (this.multipleNum - 1 == 0) {
            if (ToBePaid - yajin_money < 0) {
              this.checkOutForm.ToBePaid = ToBePaid
              this.multipleNum -= 1
              this.checkOutForm.yajin_money = yajin_money
              this.checkOutForm.yajindikou = 0
            } else {
              this.multipleNum -= 1
              this.checkOutForm.ToBePaid += yajin_money
              this.checkOutForm.yajin_money = yajin_money
              this.checkOutForm.yajindikou = 0
            }
          }
        }

      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        let arr = []
        let sunpei = this.sunpei
        console.log('sunpei', sunpei)
        let sumMoeny = 0

        val.forEach(v => {
          sumMoeny += Number(v.fangfei) + Number(v.chao_money)
          if (!sunpei) {
            return
          }
          sunpei.forEach(item => {
            if (item.room_no == v.room_no) {
              sumMoeny += Number(item.money)
              arr.push(item)
            }
          });
        })
        this.xiaoFeiTableData = arr
        this.checkOutForm.xiaofei = sumMoeny
        this.$refs.multipleTable1.toggleAllSelection(true)
      },
      handleSelectionChange1(val) {
        this.xiaoFeimultipleSelection = val
        let multipleSelection = this.multipleSelection
        let daifuSum = 0
        multipleSelection.forEach(v => {
          daifuSum += Number(v.chao_money)
        })
        val.forEach(item => {
          if (item.status != '已支付') {
            daifuSum += Number(item.money)
          }
        });
        this.checkOutForm.ToBePaid = daifuSum
      }
    }
  };
</script>


<style lang="less" scoped>
  .el-main {
    background: #fff;

    h2 {
      margin-top: 20px;
      font-size: 26px;
      color: #005ab9;
      font-weight: normal;
    }

    .checkWarp {
      width: 70%;
      margin-left: 15%;
      margin-top: 40px;

      .el-col {
        text-align: left;
      }

      .chooseTitle {
        text-align: left;
        margin: 30px 0 10px;
      }

      .el-form {
        margin-top: 30px;
      }
    }

    .payForList li {
      text-align: left;
      padding: 20px;
      border-bottom: 1px solid #f3f3f3;
      font-size: 18px;

      span,
      p {
        padding: 0 20px;
      }

      .el-table {
        margin: 20px 20px 0;
      }
    }

    /deep/.el-dialog__footer {
      text-align: center;
    }

    .qianzi {
      text-align: right;
      margin: 40px 200px 40px 0;
    }

    .btn {
      margin-top: 30px;

      .el-button {
        width: 100px;
      }
    }
  }
</style>