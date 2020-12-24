<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :offset="3" :span="18">
          <el-row>
            <p class="title">换房登记</p>
          </el-row>
          <el-form ref="formRoomChange" label-width="130px" :model="formRoomChange" :rules="rules">
            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="客户类型：">
                  <el-input disabled v-model="formRoomChange.type"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="团体名称：">
                  <el-input disabled v-model="formRoomChange.groupname"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="国籍：">
                  <el-input disabled v-model="formRoomChange.nationality"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7" style="display: flex; align-content: center">
                <el-form-item label="证件类型：">
                  <el-input disabled v-model="formRoomChange.zhengjian"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="联系电话：">
                  <el-input disabled v-model="formRoomChange.tel"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="会员卡号：">
                  <el-input disabled v-model="formRoomChange.member_card"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="客主姓名：">
                  <el-input disabled v-model="formRoomChange.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="证件号：">
                  <el-input disabled v-model="formRoomChange.zhengjian_no"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="已付金额(元)：">
                  <el-input disabled v-model="formRoomChange.count_money"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="原房价(元)：">
                  <el-input disabled v-model="formRoomChange.price"></el-input>
                </el-form-item>

              </el-col>
              <el-col :span="7">
                <el-form-item label="原客房类型：">
                  <el-input disabled v-model="formRoomChange.roomtype"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="原房间号：">
                  <el-input disabled v-model="formRoomChange.room_no"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <p class="chooseTitle">可选房型：</p>
            <div class="chooseRoom">
              <div style="text-align:center;padding-bottom:20px;color:#999" v-show="!roomType.length">
                ---------无房间---------</div>
              <el-row :gutter="20" type="flex" justify="left">
                <el-col :span="8">
                  <el-checkbox-group @change="handleChangeRoomType" v-model="checkRoomType">
                    <el-checkbox v-for="(v, i) in roomType" :key="i" :label="v.name">
                      {{ v.name }}({{ v.kx_count }}/{{ v.count }})
                    </el-checkbox>
                  </el-checkbox-group>
                </el-col>

                <el-col :span="16" class="chooseRoomRight">
                  <div class="floorItem" v-for="(v, i) in louceng" :key="i">
                    <p>{{ v.floor }}：</p>
                    <ul>
                      <!-- :class="setColor(f,index)" -->

                      <li class="fangjian" v-for="(f, index) in v.item" :class="{'activeBlue':isActiveArr==f.id}"
                        ref="roomSetCorlor" @click="chooseRoom(f)" :key="index">
                        <span>{{ f.room_no }}</span>
                        <span>{{ f.roomtype }}</span>
                      </li>
                    </ul>
                  </div>
                </el-col>
              </el-row>
            </div>



            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="新客房类型：" prop="newRoomType">
                  <el-input disabled v-model="formRoomChange.newRoomType"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="新房号(元)：" prop="newRoomNum">
                  <el-input disabled v-model="formRoomChange.newRoomNum"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="新房价(元)：" prop="newRoomPrice">
                  <el-input disabled v-model="formRoomChange.newRoomPrice"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="离店时间：">
                  <el-input disabled v-model="formRoomChange.end_time"></el-input>
                </el-form-item>

              </el-col>
              <el-col :span="7">
                <el-form-item label="会员卡支付：">
                  <el-select :disabled="disabledMeber" v-model="formRoomChange.isVipPay" style="width: 100%">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="卡扣金额：">
                  <el-input :disabled="disabledCardKkNum" v-model="formRoomChange.cardKkNum"></el-input>
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
                <el-form-item label="应交换房金额：">
                  <el-input disabled v-model="formRoomChange.huan_money"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="待付方式：" prop="paymethod">
                  <el-select v-model="formRoomChange.paymethod" style="width: 100%">
                    <el-option v-for="(item,index) in payForForhod" :key="index" :label="item.name" :value="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="待付金额：" prop="bookMoney">
                  <el-input clearable v-model="formRoomChange.bookMoney"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="优惠金额：">
                  <el-input disabled v-model="formRoomChange.VIPyouhui"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">

              </el-col>
              <el-col :span="7">

              </el-col>
            </el-row>

            <el-row type="flex" style="margin-top: 20px" justify="start">
              <el-col :span="22">
                <el-form-item label="备注：" prop="remark">
                  <el-input type="textarea" v-model="formRoomChange.remark" placeholder="填写备注"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="start">
              <el-col :span="12">
                <p class="handleStaff">
                  <span>操作员：店小二</span>
                  <span>操作时间：2020-11-11 15:20</span>
                </p>
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
  import {
    orderRoom_order,
    orderMemberinfo,
    orderYdroomtype,
    paymethod,
    roomInfo,
    orderHuan
  } from '@/api/RoomChange.js';
  import {
    getAllTime
  } from '@/utils/moment.js'
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
        formRoomChange: {},
        // 会员信息
        VipInfo: {},
        // 是否是会员支付
        disabledMeber: true,
        // 卡扣金额是否禁用
        disabledCardKkNum: true,
        //   表单规则
        rules: {
          paymethod: [{
            required: true,
            message: "请选择待付方式",
            trigger: "change"
          }],
          bookMoney: [{
              required: true,
              message: "请输入预付订金",
              trigger: "blur"
            },
            {
              validator: bookMoney,
              trigger: "blur"
            }
          ]
        },
        // 支付方式
        payForForhod: [],
        // 房间id，房号
        roomInfo: {},
        checkRoomType: [],
        // 选中房间
        isActiveArr: '',
        roomType: [],
        louceng: [],
        chooseRoomInfo: "",
        changeRoomInfo: ""
      };
    },
    created() {
      this.roomInfo.room_no = this.$route.query.room_no
      this.roomInfo.room_id = this.$route.query.id
      this.getRows()
    },
    computed: {
      Newis_card_pay() {
        return this.formRoomChange.isVipPay
      },
      Newmember_card() {
        return this.formRoomChange.cardKkNum
      },
      getBalance() {
        return this.VipInfo.balance ? '余额' + this.VipInfo.balance + '元' : ''
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
          this.disabledMeber = true
          this.formRoomChange.isVipPay = '否'
        } else
          this.disabledMeber = false
        deep: true
      },
    },
    methods: {
      getRows() {
        this.getPaymethodList()
        orderRoom_order(
          this.roomInfo
        ).then(res => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          // console.log(res)
          if (res.code == 0) {
            let {
              data
            } = res
            this.formRoomChange = data
            this.searchVip(data.tel)
            this.roomList(data.start_time, data.end_time, )
          } else {
            this.message("error", res.message)
          }
        })
      },
      // 提交表单
      submitForm() {
        this.$refs.formRoomChange.validate((valid) => {
          if (valid) {
            let formRoomChange = this.formRoomChange
            let changeRoomInfo = this.changeRoomInfo
            if (!this.isActiveArr) {
              return this.message('warning', '请选择房间')
            }
            // console.log('formRoomChange', formRoomChange)
            // console.log('changeRoomInfo', this.formRoomChange)
            // console.log('VipInfo', this.VipInfo)
            console.log('room_id', changeRoomInfo)
            let params = {
              count_money: formRoomChange.count_money,
              paymethod: formRoomChange.paymethod,
              is_card_pay: formRoomChange.isVipPay,
              end_time: formRoomChange.end_time,
              member_card: formRoomChange.tel,
              card_money: formRoomChange.cardKkNum,
              other_pay_money: formRoomChange.bookMoney,
              huan_money: formRoomChange.huan_money,
              beizhu: formRoomChange.remark,
              roomtype: formRoomChange.roomtype,
              room_no: formRoomChange.room_no,
              price: formRoomChange.price,
              new_room_type: formRoomChange.newRoomType,
              new_room_no: formRoomChange.newRoomNum,
              new_room_price: formRoomChange.newRoomPrice,
              new_floor: changeRoomInfo.floor,
              new_room_id: changeRoomInfo.id,
              room_id: formRoomChange.room_id,
              discount_money: formRoomChange.VIPyouhui,
              order_id: formRoomChange.id,
            }
            orderHuan(params).then(res => {
              res = typeof res == "string" ? JSON.parse(res) : res;
              console.log(res)
              if (res.code == 0) {
                this.message("success", res.message)
              } else {
                this.message("error", res.message)
              }
            })
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      // 重置表单
      resetForm() {
        this.$refs.formRoomChange.resetFields();
      },
      // 可选房型查询
      handleChangeRoomType() {
        orderYdroomtype({
          start_time: getAllTime(this.formRoomChange.start_time),
          roomtype: this.setCheckRoomTypeStr(this.checkRoomType),
          end_time: getAllTime(this.formRoomChange.end_time)
        }).then(res => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          // console.log(res)
          if (res.code == 0) {
            this.$forceUpdate()
            this.roomType = res.data
            this.louceng = res.room_list
          } else {
            this.$forceUpdate()
            this.message("error", res.message)
          }
        })
      },
      // 房间
      roomList(st, et) {
        orderYdroomtype({
          start_time: getAllTime(st),
          end_time: getAllTime(et)
        }).then(res => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          // console.log(res)
          if (res.code == 0) {
            this.roomType = res.data
            this.louceng = res.room_list
            this.$forceUpdate()

          } else {
            this.message("error", res.message)
            this.$forceUpdate()

          }
        })
      },
      setCheckRoomTypeStr(v) {
        let str = ""
        v.forEach(element => {
          str += element + ","
        });
        str = str.substring(0, str.length - 1)
        // console.log(str)
        return str
      },
      // 点击房间处理房间信息
      chooseRoom(v) {
        if (v.id == this.isActiveArr) {
          this.formRoomChange.newRoomType = ''
          this.formRoomChange.newRoomNum = ''
          this.formRoomChange.newRoomPrice = ''
          this.formRoomChange.huan_money = ''
          this.formRoomChange.bookMoney = ''
          this.formRoomChange.VIPyouhui = ''
          this.formRoomChange.cardKkNum = ''
          this.changeRoomInfo = ''
          this.isActiveArr = ""
          return
        }
        this.isActiveArr = v.id
        this.chooseRoomInfo = v
        roomInfo({
          id: v.id
        }).then(res => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          if (res.code == 0) {
            let {
              data
            } = res
            this.formRoomChange.newRoomType = data.roomtype
            this.formRoomChange.newRoomNum = data.room_no
            this.formRoomChange.newRoomPrice = data.price
            this.changeRoomInfo = data
            if (!this.disabledMeber) {
              this.formRoomChange.huan_money = this.VipNewMoney(data.price, this.formRoomChange.price)
              this.formRoomChange.VIPyouhui = (data.price - this.formRoomChange.huan_money).toFixed(2)
            } else {
              this.formRoomChange.huan_money = (Number(data.price) - Number(this.formRoomChange.price)).toFixed(2)
            }
            this.$forceUpdate()
          } else {
            this.message("error", res.message)
          }
        })
      },
      // 会员优惠金额补差价
      VipNewMoney(newPrice, oldPice) {
        let sum = 0
        if (Number(newPrice) - Number(oldPice) > 0) {
          sum = (newPrice - oldPice) * Number(this.VipInfo.discount / 100)
        }
        return sum.toFixed(2)
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
          // console.log(res)
          if (res.code == 0) {
            if (res.data) {
              this.disabledMeber = false
              this.VipInfo = res.data
              this.formRoomChange.member_card = res.data.card_no
            }
          } else {
            this.message("error", res.message)
          }
        })
      }
    },
  };
</script>
<style lang="less" scoped>
  .el-main {
    background: #fff;
  }

  .chooseTitle {
    text-align: left;

  }

  div /deep/.activeBlue {
    border: 1px solid #f00 !important;
    color: #f00 !important;
    padding: 5px 10px !important;
    margin: 0 10px 10px 0 !important;

    span {
      display: block !important;
      font-size: 14px !important;
      cursor: pointer !important;
    }
  }

  .chooseRoom {
    background: #f9f9f9;
    padding: 20px 20px 0;
    margin: 10px 0 20px;

    /deep/.el-checkbox {
      text-align: left;
      display: block;
      margin-bottom: 20px;
    }

    .chooseRoomRight {
      height: 280px;
      overflow-y: auto;
    }

    .floorItem {
      text-align: left;

      p {
        margin-bottom: 10px;
      }

      ul {
        display: flex;

        flex-wrap: wrap;

        li {
          padding: 5px 10px;
          border: 1px solid #333;
          margin: 0 10px 10px 0;

          span {
            display: block;
            color: #333;
            font-size: 14px;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>

<style scoped>
  /* .el-form-item {
  margin-bottom: 35px !important;
} */
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 256px;
  }

  div /deep/.el-checkbox {
    font-size: 18px;
  }

  div /deep/.el-checkbox__inner {
    width: 20px;
    height: 20px;
  }

  div /deep/.el-checkbox__inner::after {
    height: 11px;
    left: 8px;
    top: 2px;
  }

  div /deep/.el-checkbox__label {
    font-size: 18px;
    line-height: 20px;
  }

  .duCard {
    height: 40px;
    line-height: 40px;
    margin-left: 5px;
    padding: 0 5px;
  }
</style>