<template>
  <el-container v-cloak>
    <el-main>
      <el-row>
        <el-col :offset="3" :span="18">
          <el-row>
            <p class="title">客房预订</p>
          </el-row>
          <el-form ref="formLabelAlign" :label-position="labelPosition" label-width="130px" :model="formLabelAlign"
            :rules="rules">
            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="客户类型：" prop="type">
                  <el-select v-model="formLabelAlign.type" style="width: 100%">
                    <el-option v-for="(item,index) in keHuType" :key="index" :label="item.name" :value="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
                <!-- @change="selectKeHuType($event)" -->
              </el-col>
              <el-col :span="7">
                <el-form-item label="团体名称：" v-show="tuanti">
                  <el-input clearable v-model="formLabelAlign.groupname"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="国籍：" prop="nationality">
                  <!-- @change="selectNative($event)" -->
                  <el-select v-model="formLabelAlign.nationality" style="width: 100%">
                    <el-option v-for="(item,index) in nativeList" :key="index" :label="item.name" :value="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="会员卡号：">
                  <el-input clearable @blur="handleChangeIsVIP" @clear="handleClearInput"
                    v-model="formLabelAlign.member_card"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="预订人：" prop="name">
                  <el-input clearable v-model="formLabelAlign.name"></el-input>
                </el-form-item>
              </el-col>
              <!--  @clear="handleClearInput" @blur="handleChangeIsVIPTel" -->
              <el-col :span="7">
                <el-form-item label="联系电话：" prop="tel">
                  <el-input clearable v-model="formLabelAlign.tel"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="预到时间：" prop="start_time">
                  <el-date-picker style="width: 100%" @change="pickerStart_time" :editable="false"
                    v-model="formLabelAlign.start_time" type="datetime" placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="setEndDay" :span="10">
                <el-form-item label="预离时间：" prop="end_time">
                  <el-date-picker style="width: 60%" :editable="false" @change="pickerEnd_time"
                    v-model="formLabelAlign.end_time" type="datetime" placeholder="选择日期时间">
                  </el-date-picker>
                  <el-input style="width: 40%" readonly v-model="formLabelAlign.datecount"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="lastDate" :span="4">
                <el-form-item> </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-row>
                <el-col :span="7">
                  <p class="roomTittle">房间选择：</p>
                </el-col>
              </el-row>
              <el-table stripe :header-cell-style="tableStyle" :data="roomTableData" style="width: 100%"
                max-height="500px" show-summary :summary-method="getSumMoney">
                <el-table-column align="center" prop="name" label="房间类型">
                </el-table-column>
                <el-table-column align="center" prop="price" label="房间单价(元)">
                </el-table-column>
                <el-table-column align="center" prop="count" label="剩余房间数">
                </el-table-column>
                <el-table-column align="center" prop="sum" label="预订房间数">
                  <template slot-scope="scope">
                    <div class="roomSetting">
                      <el-button icon="el-icon-minus" size="mini" @click="handleReduce(scope.$index, scope.row)">
                      </el-button>
                      <el-input @input="handleSum(scope.$index, scope.row)" v-model="scope.row.sum">
                      </el-input>
                      <el-button icon="el-icon-plus" size="mini" @click="handleAdd(scope.$index, scope.row)">
                      </el-button>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="suMoney" label="房间费用(元)">
                </el-table-column>
              </el-table>

            </el-row>
            <el-row type="flex" style="margin-top: 20px" justify="center">
              <el-col :span="6">
                <el-form-item label="房费总金额：" prop="count_money">
                  <el-input disabled v-model="formLabelAlign.RoomSumMoney"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="加收金额（元）：">
                  <el-input disabled v-model="formLabelAlign.chargeAmount" :style="{ width: '100%' }"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="优惠金额（元）：">
                  <el-input disabled v-model="formLabelAlign.couponMoney" :style="{ width: '100%' }"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" style="margin-top: 20px" justify="center">
              <el-col :span="6">
                <el-form-item label="预订支付方式：" prop="paymethod">
                  <el-select v-model="formLabelAlign.paymethod" style="width: 100%" @change="selectPay($event)">
                    <el-option v-for="(item,index) in payForForhod" :key="index" :label="item.name" :value="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="会员卡支付：">
                  <el-select :disabled="disabledMember_card" v-model="formLabelAlign.is_card_pay" style="width: 100%">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="卡扣金额：">
                  <el-input :style="{ width: '100%' }" clearable :disabled="disabledCardKkNum"
                    v-model="formLabelAlign.cardKkNum">
                  </el-input>
                  <span v-show="VIPInfo" style="
                  font-size: 14px;
                  color: #005ab9;
                  padding-top: 10px;
                  padding-left: 5px;
                ">余额：{{VIPInfo.balance}}元</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="center">
              <el-col :span="6">
                <el-form-item label="其他支付金额：" prop="bookMoney">
                  <el-input clearable v-model="formLabelAlign.bookMoney"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6"> </el-col>
              <el-col :span="6">
              </el-col>
            </el-row>

            <el-row type="flex" style="margin-top: 20px" justify="center">
              <el-col :span="22">
                <el-form-item label="备注：">
                  <el-input type="textarea" v-model="formLabelAlign.beizhu"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top: 30px">
              <el-form-item>
                <el-button style="width: 100px" @click="resetForm">重置</el-button>
                <el-button style="width: 100px" size="medium" @click="submitForm" type="primary">确认</el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
  import {
    native,
    paymethod
  } from "@/api/member.js"; //国籍列表
  import {
    roomtypeLists
  } from "@/api/RoomType.js"; //房间类型
  import {
    customerType,
    orderYdroomtype,
    orderAdd,
    orderMemberinfo,
    settingInfo
  } from "@/api/RoomBooking.js";
  import {
    getAllTime,
    getDayTime,
    isBefore,
  } from '@/utils/moment.js'
  import Moment from 'moment'
  export default {
    data() {
      var checkPhone = (rule, value, callback) => {
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
        if (!value) {
          return callback(new Error("电话号码不能为空"));
        }
        setTimeout(() => {
          if (!Number.isInteger(+value)) {
            callback(new Error("请输入数字值"));
          } else {
            if (phoneReg.test(value)) {
              callback();
            } else {
              callback(new Error("电话号码格式不正确"));
            }
          }
        }, 100);
      };
      var count_money = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("房费总金额不能为空"));
        }
        setTimeout(() => {
          if (Number(value) < 0 || !Number(value)) {
            callback(new Error("请输入有效数字"));
          } else {
            callback();
          }
        }, 100);
      };
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
        // 表单值
        tuanti: true,
        formLabelAlign: {
          RoomSumMoney: 0,
          chargeAmount: 0,
          couponMoney: 0
        },
        VIPInfo: "",
        // 会员卡支付disabled
        disabledMember_card: true,
        // 卡扣金额disabled
        disabledCardKkNum: true,
        // 表单label对齐方式
        labelPosition: "right",
        // 表单验证规则
        rules: {
          name: [{
              required: true,
              message: "请输入预订人名称",
              trigger: "blur"
            },
            {
              min: 2,
              max: 5,
              message: "长度在 2 到 5 个字符",
              trigger: "blur"
            },
          ],
          tel: [{
              required: true,
              message: "请输入电话号码",
              trigger: "blur"
            },
            {
              validator: checkPhone,
              trigger: "blur"
            }
          ],
          start_time: [{
            required: true,
            message: "请选择日期",
            trigger: "change"
          }, ],
          end_time: [{
            required: true,
            message: "请选择日期",
            trigger: "change"
          }],
          paymethod: [{
            required: true,
            message: "请选择预订支付方式",
            trigger: "change"
          }],
          bookMoney: [{
            validator: bookMoney,
            trigger: "blur"
          }],
          type: [{
            required: true,
            message: "请选择客户类型",
            trigger: "change"
          }],
          nationality: [{
            required: true,
            message: "请选择客户类型",
            trigger: "change"
          }],
          count_money: [{
            validator: count_money,
            trigger: "blur"
          }]
        },
        // 多选框
        checked: "",
        // 表格样式
        tableStyle: {
          textAlign: "center",
        },
        // 表格对应的数据
        roomTableData: [],

        // 国籍列表
        nativeList: [],
        // 支付方式
        payForForhod: [],
        // 计费详情
        settingInfo: "",
        //客户类型
        keHuType: [],
        // 监听table变化
        tableChangeSum: 0,
      };
    },
    mounted() {},
    created() {
      this.getNativeList();
      this.getPaymethodList();
      this.getRoomType();
      this.getCustomerType()
      this.getMoneyWay()
    },
    computed: {
      Newis_card_pay() {
        return this.formLabelAlign.is_card_pay
      },
      Newmember_card() {
        return this.formLabelAlign.member_card
      }
    },
    watch: {
      Newis_card_pay(val) {
        if (val == '否')
          this.disabledCardKkNum = true
        else
          this.disabledCardKkNum = false
        deep: true
      },
      Newmember_card(val) {
        if (!val) {
          this.disabledMember_card = true
          this.formLabelAlign.is_card_pay = '否'
        } else
          this.disabledMember_card = false
        deep: true
      },
      tableChangeSum() {
        this.getTablePice(this.roomTableData)
      },
    },
    methods: {
      // 提交表单
      submitForm() {
        let that = this
        that.setTableRoomPrice(this.roomTableData)
        this.$refs.formLabelAlign.validate((valid) => {
          if (valid) {
            let formLabelAlign = this.formLabelAlign
            if (!that.setTableRoomPrice(this.roomTableData)) {
              return this.message('error', '请选择预订房间')
            }
            let params = {
              type: formLabelAlign.type,
              groupname: formLabelAlign.groupname,
              member_card: formLabelAlign.member_card,
              name: formLabelAlign.name,
              tel: formLabelAlign.tel,
              nationality: formLabelAlign.nationality,
              start_time: getAllTime(formLabelAlign.start_time),
              end_time: getAllTime(formLabelAlign.end_time),
              datecount: formLabelAlign.datecount,
              roomtype_info: that.setTableRoomPrice(this.roomTableData),
              beizhu: formLabelAlign.beizhu,
              count_money: formLabelAlign.RoomSumMoney,
              is_card_pay: formLabelAlign.is_card_pay,
              card_money: formLabelAlign.cardKkNum,
              paymethod: formLabelAlign.paymethod,
              other_pay_money: formLabelAlign.bookMoney,
              jia_money: ormLabelAlign.chargeAmount,
              discount_money: ormLabelAlign.couponMoney,
            }
            orderAdd(params).then(res => {
              res = typeof res == "string" ? JSON.parse(res) : res;
              // console.log(res)
              if (res.code == 0) {
                if (!res.data) {
                  return this.message("error", '添加失败请稍后再试')
                }
                this.message("success", res.message)
                this.$router.back()
              } else {
                this.message("error", res.message)
              }
            })
          }
        });
      },
      // 计费设置
      getMoneyWay() {
        settingInfo().then(res => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          console.log(res)
          if (res.code == 0) {
            this.settingInfo = res.data
          } else {
            this.message("error", res.message)
          }
        })
      },
      // 获取房间名房间数
      setTableRoomPrice(v) {
        let str = ""
        let arr = []
        arr = v.filter(v => v.sum != 0)
        arr.forEach(v => str += `${v.name},${v.sum};`)
        str = str.substring(0, str.length - 1)
        console.log(str)
        return str
      },
      // 重置表单
      resetForm() {
        this.$refs.formLabelAlign.resetFields();
      },
      // 根据身份证查询是否会员
      handleChangeIsVIP() {
        if (this.formLabelAlign.member_card == '') {
          return
        }
        if (this.formLabelAlign.tel) {
          orderMemberinfo({
            member_card: this.formLabelAlign.tel
          }).then(res => {
            res = typeof res == "string" ? JSON.parse(res) : res;
            console.log(res)
            if (res.code == 0) {
              let {
                data
              } = res
              this.VIPInfo = data
              console.log(this.VIPInfo)
              // console.log(data)
              if (!data) {
                return this.message("error", '会员账号与手机号不匹配')
              } else if (data) {
                let card_no = data.card_no
                console.log(card_no)
                // this.message("success", res.message)
                // this.formLabelAlign.member_card = data.card_no
                // this.$forceUpdate()
                if (card_no == this.formLabelAlign.member_card) {
                  this.message("success", 操作成功)
                } else {
                  return this.message("error", '会员账号与手机号不匹配')
                }
              }
            } else {
              this.message("error", '会员账号与手机号不匹配')
            }
          })
        } else {
          orderMemberinfo({
            member_card: this.formLabelAlign.member_card
          }).then(res => {
            res = typeof res == "string" ? JSON.parse(res) : res;
            if (res.code == 0) {
              let {
                data
              } = res
              if (!data) {
                this.formLabelAlign.member_card = ''
                return this.message("error", '请输入正确的会员卡号')
              } else {
                this.message("success", res.message)
                this.formLabelAlign.tel = data.mobile
                this.$forceUpdate()
              }
            } else {
              this.formLabelAlign.member_card = ''
              this.message("error", res.message)
            }
          })
        }
      },
      // 清空会员手机
      handleClearInput() {
        this.formLabelAlign.member_card = ''
        this.formLabelAlign.tel = ''
      },
      // 根据手机号查询是否会员
      // handleChangeIsVIPTel() {
      //   orderMemberinfo({
      //     member_card: this.formLabelAlign.tel
      //   }).then(res => {
      //     res = typeof res == "string" ? JSON.parse(res) : res;
      //     if (res.code == 0) {
      //       let {
      //         data
      //       } = res
      //       // console.log(data)
      //       if (!data) {
      //         this.formLabelAlign.tel = ''
      //         this.formLabelAlign.member_card = ''
      //         return this.message("error", '请输入正确的会员卡号')
      //       } else {
      //         this.message("success", res.message)
      //         this.formLabelAlign.member_card = data.card_no
      //         this.$forceUpdate()
      //       }
      //     } else {
      //       this.formLabelAlign.member_card = ''
      //       this.formLabelAlign.tel = ''
      //       this.message("error", res.message)
      //     }
      //   })
      // },
      // 开始日期change
      pickerStart_time(v) {
        if (this.formLabelAlign.end_time) {
          if (v > this.formLabelAlign.end_time) {
            this.message('warning', '预到时间不能大于预离时间')
            this.formLabelAlign.start_time = ""
            return
          }
          this.tableChangeSum += 1
          this.formLabelAlign.datecount = getDayTime(v, this.formLabelAlign.end_time)
          orderYdroomtype({
            start_time: getAllTime(v),
            end_time: getAllTime(this.formLabelAlign.end_time)
          }).then(res => {
            res = typeof res == "string" ? JSON.parse(res) : res;
            if (res.code == 0) {
              this.$forceUpdate()
              this.roomTableData = res.data
            } else {
              this.$forceUpdate()

              this.message("error", res.message)
            }
          })
        }
      },
      // 结束日期change
      pickerEnd_time(v) {
        if (this.formLabelAlign.start_time) {
          if (v < this.formLabelAlign.start_time) {
            this.message('warning', '预离时间不能小于预到时间')
            this.formLabelAlign.end_time = ""
            return
          }
          this.tableChangeSum += 1
          this.formLabelAlign.datecount = getDayTime(this.formLabelAlign.start_time, v)
          orderYdroomtype({
            start_time: getAllTime(this.formLabelAlign.start_time),
            end_time: getAllTime(v)
          }).then(res => {
            res = typeof res == "string" ? JSON.parse(res) : res;
            console.log(res, '1111111111')
            if (res.code == 0) {
              this.roomTableData = res.data
              this.$forceUpdate()

            } else {
              this.message("error", res.message)
              this.$forceUpdate()

            }
          })
        }
      },
      // 加，减，总
      handleAdd(i, t) {
        let roomTableData = this.roomTableData[i];
        if (Number(roomTableData.sum) < 0) {
          return this.message('warning', '请输入正确的数字')
        }
        if (roomTableData.sum >= t.count) {
          return this.message('warning', '预订房间数不能大于剩余房间数')
        }
        this.tableChangeSum += 1
        roomTableData.sum = Number(roomTableData.sum) + 1;
        roomTableData.suMoney = roomTableData.sum * roomTableData.price
        // roomTableData.sum = Number(roomTableData.sum) + 1;
        // roomTableData.suMoney += roomTableData.price;
      },
      handleReduce(i, t) {
        let roomTableData = this.roomTableData[i];
        if (roomTableData.sum - 1 < 0) {
          this.$message({
            message: "输入的值不能小于0",
            type: "warning",
          });
          return;
        } else {
          this.tableChangeSum += 1
          roomTableData.sum -= 1;
          roomTableData.suMoney = roomTableData.sum * roomTableData.price
        }
      },
      // 设置最后一行合计
      getSumMoney({
        columns,
        data
      }) {
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 1 || index === 2) {
            return;
          }
          const values = data.map((item) => Number(item[column.property]));
          if (!values.every((value) => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index];
          } else {
            sums[index] = "结算";
          }
        });
        return sums;

      },

      //获取input值
      handleSum(i, t) {
        let roomTableData = this.roomTableData[i];
        if (!roomTableData.sum && roomTableData.sum != 0) {
          roomTableData.suMoney = 0
          this.$message({
            message: "请输入数字",
            type: "warning",
          });
          return;
        }
        if (roomTableData.sum < 0) {
          roomTableData.suMoney = 0
          this.$message({
            message: "输入的值不能小于0",
            type: "warning",
          });
          return;
        }
        if (roomTableData.sum > t.count) {
          roomTableData.suMoney = 0
          roomTableData.sum = 0
          this.$message({
            message: "预订房间数不能大于剩余房间数",
            type: "warning",
          });
          return;
        }
        this.tableChangeSum += 1
        roomTableData.suMoney = roomTableData.price * roomTableData.sum;
      },
      // 获取table总价格并调用计算费用
      getTablePice(v) {
        let sum = 0
        v.forEach(v => {
          sum += v.suMoney ? Number(v.suMoney) : 0
        });
        this.getTableMoeny(sum)
      },
      // 计算费用
      getTableMoeny(v) {
        let checkInForm = this.formLabelAlign
        let settingInfo = this.settingInfo
        let HHstart_time = Moment(checkInForm.start_time).format('HH:mm:ss')
        let HHend_time = Moment(checkInForm.end_time).format('HH:mm:ss')
        let YYstart_time = Moment(checkInForm.start_time).format('YYYY-MM-DD')
        let YYend_time = Moment(checkInForm.end_time).format('YYYY-MM-DD')
        let chargeAmount = 0
        let couponMoney = 0
        let diffDay = Moment(YYend_time).diff(Moment(YYstart_time), 'days')
        // 需要支付的房费
        let totolMoneny = 0
        // 凌晨订房
        if (HHstart_time >= settingInfo.yzstart_time && HHstart_time < settingInfo.yzend_time) {
          //根据时间当天的房费
          totolMoneny = v * Number(settingInfo.yz_date) + v
          chargeAmount += v * Number(settingInfo.yz_date)
          // console.log(v * Number(settingInfo.yz_date))
          // console.log(v)
          // 当天
          if (diffDay == 0) {
            // console.log('凌晨订房-结束时间当天')
            // 非会员
            console.log('disabledMember_card', this.disabledMember_card)
            if (this.disabledMember_card) {
              // console.log('凌晨订房-结束时间当天-非会员')
              // 下午退房时间之内按小时收费
              if (HHend_time > settingInfo.tfend_time1 && HHend_time <= settingInfo.tfend_time2) {
                // console.log('凌晨订房-结束时间当天-非会员-下午退房时间之内按小时收费')
                let hh = Number(Moment(checkInForm.end_time).format('HH'))
                let mm = Number(Moment(checkInForm.end_time).format('mm'))
                let hh1 = Number(settingInfo.tfend_time1.substring(0, 2))
                let mm2 = Number(settingInfo.tfend_time1.substring(3, 5))


                if (hh1 - hh == 0) {
                  // console.log('凌晨订房-结束时间当天-非会员-下午退房时间之内按小时收费-超过十几分钟')
                  totolMoneny += Number(settingInfo.tf_money1)
                  chargeAmount += Number(settingInfo.tf_money1)
                } else {
                  // console.log(mm , mm2)
                  // console.log(mm > mm2)
                  if (mm > mm2) {
                    // console.log('凌晨订房-结束时间当天-非会员-下午退房时间之内按小时收费-几个小时')
                    totolMoneny += Number(settingInfo.tf_money1) * ((hh - hh1) + 1)
                    chargeAmount += Number(settingInfo.tf_money1) * ((hh - hh1) + 1)
                    // console.log(hh1 - hh)
                    // console.log(Number(settingInfo.tf_money1))
                  } else {
                    // console.log('凌晨订房-结束时间当天-非会员-下午退房时间之内按小时收费-小时')
                    totolMoneny += Number(settingInfo.tf_money1) * (hh - hh1)
                    chargeAmount += Number(settingInfo.tf_money1) * (hh - hh1)
                  }
                }
              } else if (HHend_time > settingInfo.tfend_time2) {
                // 下午退房时间之内按天收费
                totolMoneny += v * Number(settingInfo.tf_date)
                chargeAmount += v * Number(settingInfo.tf_date)
              }
            } else {
              // 会员
              if (HHend_time > settingInfo.tfend_time1 && HHend_time <= settingInfo.membertf_end_time2) {
                let hh = Number(Moment(checkInForm.end_time).format('HH'))
                let mm = Number(Moment(checkInForm.end_time).format('mm'))
                let hh1 = Number(settingInfo.membertf_end_time1.substring(0, 2))
                let mm2 = Number(settingInfo.membertf_end_time1.substring(3, 5))
                if (hh - hh1 == 0) {
                  if (mm > mm2) {
                    totolMoneny += Number(settingInfo.membertf_tf_money1)
                    chargeAmount += Number(settingInfo.membertf_tf_money1)
                    couponMoney += Number(settingInfo.tf_money1) - Number(settingInfo.membertf_tf_money1)
                    console.log('totolMoneny', totolMoneny)
                  } else {}
                } else {
                  if (mm > mm2) {
                    totolMoneny += Number(settingInfo.membertf_tf_money1) * ((hh - hh1) + 1)
                    chargeAmount += Number(settingInfo.membertf_tf_money1) * ((hh - hh1) + 1)
                    // console.log('totolMoneny', totolMoneny)
                    // console.log('chargeAmount', Number(settingInfo.membertf_tf_money1) * ((hh - hh1) + 1))
                    // console.log('tf_money1', Number(settingInfo.tf_money1) * ((hh - hh1) + 1))
                    // console.log('membertf_tf_money1', Number(settingInfo.membertf_tf_money1) * ((hh - hh1) + 1))
                    couponMoney += Number(settingInfo.tf_money1) * ((hh - hh1) + 1) - Number(settingInfo
                      .membertf_tf_money1) * ((hh - hh1) + 1)
                  } else {
                    totolMoneny += Number(settingInfo.membertf_tf_money1) * (hh - hh1)
                    chargeAmount += Number(settingInfo.membertf_tf_money1) * (hh - hh1)
                    couponMoney += Number(settingInfo.tf_money1) * (hh - hh1) - Number(settingInfo
                      .membertf_tf_money1) * (hh - hh1)
                  }
                }
              } else {
                totolMoneny += v * Number(settingInfo.membertf_tf_date)
                chargeAmount += v * Number(settingInfo.membertf_tf_date)
                couponMoney = v * Number(settingInfo.tf_date) - v * Number(settingInfo
                  .membertf_tf_date)
              }
            }

          } else {
            // console.log(HHend_time > settingInfo.tfend_time1)
            // console.log(HHend_time <= settingInfo.tfend_time2)
            totolMoneny += v * (Number(diffDay))
            if (HHend_time > settingInfo.tfend_time1 && HHend_time <= settingInfo.membertf_end_time2) {
              // console.log(123)
              // 非会员
              if (this.disabledMember_card) {
                // 下午退房时间之内按小时收费
                if (HHend_time > settingInfo.tfend_time1 && HHend_time <= settingInfo.membertf_end_time2) {
                  let hh = Number(Moment(checkInForm.end_time).format('HH'))
                  let mm = Number(Moment(checkInForm.end_time).format('mm'))
                  let hh1 = Number(settingInfo.tfend_time1.substring(0, 2))
                  let mm2 = Number(settingInfo.tfend_time1.substring(3, 5))
                  if (hh - hh1 == 0) {
                    if (mm > mm2) {
                      totolMoneny += Number(settingInfo.tf_money1)
                      chargeAmount += Number(settingInfo.tf_money1)
                    } else {}
                  } else {
                    if (mm > mm2) {
                      totolMoneny += Number(settingInfo.tf_money1) * ((hh - hh1) + 1)
                      chargeAmount += Number(settingInfo.tf_money1) * ((hh - hh1) + 1)
                    } else {
                      totolMoneny += Number(settingInfo.tf_money1) * (hh - hh1)
                      chargeAmount += Number(settingInfo.tf_money1) * (hh - hh1)
                    }
                  }
                } else if (HHend_time > settingInfo.membertf_end_time2) {
                  // 下午退房时间之内按天收费
                  totolMoneny += v * Number(settingInfo.tf_date)
                  chargeAmount += v * Number(settingInfo.tf_date)
                }
              } else {
                // 会员
                if (HHend_time > settingInfo.membertf_end_time1 && HHend_time <= settingInfo.membertf_end_time2) {
                  let hh = Number(Moment(checkInForm.end_time).format('HH'))
                  let mm = Number(Moment(checkInForm.end_time).format('mm'))
                  let hh1 = Number(settingInfo.membertf_end_time1.substring(0, 2))
                  let mm2 = Number(settingInfo.membertf_end_time1.substring(3, 5))
                  if (hh - hh1 == 0) {
                    if (mm > mm2) {
                      totolMoneny += Number(settingInfo.membertf_tf_money1)
                      chargeAmount += Number(settingInfo.membertf_tf_money1)
                      couponMoney += Number(settingInfo.tf_money1) - Number(settingInfo.membertf_tf_money1)
                    } else {}
                  } else {
                    if (mm > mm2) {
                      totolMoneny += Number(settingInfo.membertf_tf_money1) * ((hh - hh1) + 1)
                      chargeAmount += Number(settingInfo.membertf_tf_money1) * ((hh - hh1) + 1)
                      couponMoney += Number(settingInfo.tf_money1) * ((hh - hh1) + 1) - Number(settingInfo
                        .membertf_tf_money1) * ((hh - hh1) + 1)
                    } else {
                      totolMoneny += Number(settingInfo.membertf_tf_money1) * (hh - hh1)
                      chargeAmount += Number(settingInfo.membertf_tf_money1) * (hh - hh1)
                      couponMoney += Number(settingInfo.tf_money1) * (hh - hh1) - Number(settingInfo
                        .membertf_tf_money1) * (hh - hh1)
                    }
                  }
                } else {
                  totolMoneny += v * Number(settingInfo.membertf_tf_date)
                  chargeAmount += v * Number(settingInfo.membertf_tf_date)
                }
              }
            }
          }
        } else {
          // 正常时间订房
          if (diffDay == 0) {
            totolMoneny = v * (diffDay + 1)
          } else {
            totolMoneny = v * (diffDay)
            // 非会员
            if (this.disabledMember_card) {
              // 下午退房时间之内按小时收费
              if (HHend_time > settingInfo.tfend_time1 && HHend_time <= settingInfo.tfend_time2) {
                // console.log('正常时间订房-下午退房时间之内按小时收费')
                let hh = Number(Moment(checkInForm.end_time).format('HH'))
                let mm = Number(Moment(checkInForm.end_time).format('mm'))
                let hh1 = Number(settingInfo.tfend_time1.substring(0, 2))
                let mm2 = Number(settingInfo.tfend_time1.substring(3, 5))
                if (hh - hh1 == 0) {
                  if (mm > mm2) {
                    totolMoneny += Number(settingInfo.tf_money1)
                    chargeAmount += Number(settingInfo.tf_money1)

                  } else {}
                } else {
                  if (mm > mm2) {
                    totolMoneny += Number(settingInfo.tf_money1) * ((hh - hh1) + 1)
                    chargeAmount += Number(settingInfo.tf_money1) * ((hh - hh1) + 1)
                  } else {
                    totolMoneny += Number(settingInfo.tf_money1) * (hh - hh1)
                    chargeAmount += Number(settingInfo.tf_money1) * (hh - hh1)
                  }
                }
              } else if (HHend_time > settingInfo.tfend_time2) {
                // 下午退房时间之内按天收费
                totolMoneny += v * Number(settingInfo.tf_date)
                chargeAmount += v * Number(settingInfo.tf_date)
              } else {}
            } else {
              // 会员
              if (HHend_time > settingInfo.membertf_end_time1 && HHend_time <= settingInfo.membertf_end_time2) {
                let hh = Number(Moment(checkInForm.end_time).format('HH'))
                let mm = Number(Moment(checkInForm.end_time).format('mm'))
                let hh1 = Number(settingInfo.membertf_end_time1.substring(0, 2))
                let mm2 = Number(settingInfo.membertf_end_time1.substring(3, 5))
                if (hh - hh1 == 0) {
                  if (mm > mm2) {
                    totolMoneny += Number(settingInfo.membertf_tf_money1)
                    chargeAmount += Number(settingInfo.membertf_tf_money1)
                    couponMoney += Number(settingInfo.tf_money1) - Number(settingInfo.membertf_tf_money1)
                  } else {}
                } else {
                  if (mm > mm2) {
                    totolMoneny += Number(settingInfo.membertf_tf_money1) * ((hh - hh1) + 1)
                    chargeAmount += Number(settingInfo.membertf_tf_money1) * ((hh - hh1) + 1)
                    couponMoney = Number(settingInfo.tf_money1) * ((hh - hh1) + 1) - Number(settingInfo
                      .membertf_tf_money1) * ((hh - hh1) + 1)
                    console.log(couponMoney)
                  } else {
                    totolMoneny += Number(settingInfo.membertf_tf_money1) * (hh - hh1)
                    chargeAmount += Number(settingInfo.membertf_tf_money1) * (hh - hh1)
                    couponMoney = Number(settingInfo.tf_money1) * (hh - hh1) - Number(settingInfo
                      .membertf_tf_money1) * (hh - hh1)
                  }
                }
              } else if (HHend_time > settingInfo.membertf_end_time2) {
                totolMoneny += v * Number(settingInfo.membertf_tf_date)
                chargeAmount += v * Number(settingInfo.membertf_tf_date)
                couponMoney = v * Number(settingInfo.tf_date) * Number(settingInfo.membertf_tf_date)
              }
            }
          }
        }
        if (!totolMoneny) {
          this.formLabelAlign.RoomSumMoney = 0
        } else {
          this.formLabelAlign.RoomSumMoney = Number(totolMoneny).toFixed(2)
          this.formLabelAlign.chargeAmount = Number(chargeAmount.toFixed(2))
          this.formLabelAlign.couponMoney = Number(couponMoney.toFixed(2))
          console.log('RoomSumMoney', Number(totolMoneny).toFixed(2))
          console.log('chargeAmount', chargeAmount.toFixed(2))
          console.log('RoomSumMoney', couponMoney.toFixed(2))
          console.log('formLabelAlign', this.formLabelAlign.RoomSumMoney)
          if (!this.disabledMember_card) {
            this.formLabelAlign.RoomSumMoney = Number(totolMoneny).toFixed(2) * (Number(this.VIPInfo.discount) / 100)
          }
        }
      },
      //获取国籍列表
      getNativeList() {
        native().then(res => {
          res = JSON.parse(res);
          // console.log(res, "获取国籍列表");
          if (res.code === 0) {
            this.nativeList = res.data.list;
          } else {
            this.message("error", res.message);
          }
        });
      },


      // //选中国籍的值
      // selectNative(e) {
      //   this.formLabelAlign.nationality = e;
      // },

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

      //选中充值的方式
      selectPay(e) {
        this.formLabelAlign.paymethod = e;

      },


      //获取客户类型
      getCustomerType() {
        customerType().then(res => {
          res = JSON.parse(res);
          // console.log(res, "获取客户列表");
          if (res.code === 0) {
            this.keHuType = res.data;
          } else {
            this.message("error", res.message);
          }
        });
      },

      //选中客户类型
      // selectKeHuType(e) {
      //   console.log(e)
      //   this.formLabelAlign.type = e;
      //   if (e == '1') {
      //     this.tuanti = false
      //   } else {
      //     this.tuanti = true
      //   }
      // },


      //获取所有房间类型
      getRoomType() {
        roomtypeLists().then(res => {
          res = JSON.parse(res);
          // console.log(res, "获取所有房间类型");
          if (res.code === 0) {
            // this.payForForhod = res.data;
          } else {
            this.message("error", res.message);
          }
        });
      }
    },
  };
</script>
<style scoped lang="less">
  * {
    margin: auto;
  }

  // .setEndDay{
  //   .el-form-item__content{
  //     .el-select{
  //       display: inline-block !important;
  //     }
  //   }
  // }
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

  .roomTittle {
    font-size: 18px;
    text-align: left;
    color: #005ab9;
    margin-bottom: 20px;
  }

  .content {
    background: #eeee;
    padding: 30px 0;
  }

  .checkedbox {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .el-checkbox {
    margin-bottom: 30px;
  }

  .floor {
    display: flex;
    flex-flow: row wrap;
  }

  .checkedroom {
    .checkedroom-item {
      display: flex;
      justify-content: start;

      span {
        display: block;
      }
    }

    .flooRoom {
      font-size: 14px;
      border: 1px solid rgb(38, 37, 39);
      border-radius: 10px;
      width: 80px;
      padding: 5px 10px;
      margin: 5px;

      p:nth-child(1) {
        text-align: left;
      }

      p:nth-child(2) {
        text-align: right;
      }
    }
  }

  .roomSetting {
    display: flex;
    justify-content: flex-start;
    padding: 0 40px;

    .el-input {
      width: 50px;
    }
  }

  // .lastDate {
  //   .el-form-item {
  //     /deep/.el-form-item__content {
  //       margin-left: 0 !important;
  //       .el-select {
  //         width: 40%;
  //         margin-right: 300px !important;
  //       }
  //     }
  //   }
  // }
</style>