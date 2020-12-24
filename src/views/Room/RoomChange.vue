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
                <el-form-item label="离店时间：">
                  <el-input disabled v-model="formRoomChange.end_time"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="已付金额(元)：">
                  <el-input disabled v-model="formRoomChange.count_money"></el-input>
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

            <el-row type="flex" justify="space-between">

              <el-col :span="7">
                <el-form-item label="原房价(元)：">
                  <el-input disabled v-model="formRoomChange.price"></el-input>
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

                      <li class="fangjian" v-for="(f, index) in v.item"
                        :class="{'activeBlue':isActiveArr.indexOf(f.id)!=-1}" ref="roomSetCorlor" @click="chooseRoom(f)"
                        :key="index">
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
                  <el-select v-model="formRoomChange.newRoomType" style="width: 100%">
                    <el-option label="三人间" value="three"></el-option>
                    <el-option label="两人间" value="two"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="新房号(元)：" prop="newRoomNum">
                  <el-input clearable v-model="formRoomChange.newRoomNum"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="新房价(元)：" prop="newRoomPrice">
                  <el-input clearable v-model="formRoomChange.newRoomPrice"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
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
              <el-col :span="7">
                <el-form-item label="预付款方式：" prop="payWay">
                  <el-select v-model="formRoomChange.payWay" style="width: 100%">
                    <el-option label="现金" value="xianjin"></el-option>
                    <el-option label="支付宝" value="zhifubao"></el-option>
                    <el-option label="微信" value="weixin"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="预付订金额：" prop="bookMoney">
                  <el-input clearable v-model="formRoomChange.bookMoney"></el-input>
                </el-form-item>
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
    orderYdroomtype
  } from '@/api/RoomChange.js';
  export default {
    data() {
      var bookMoney = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("预付定金额不能为空"));
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
        formRoomChange: {},
        // 会员信息
        VipInfo: {},
        // 是否是会员支付
        disabledMeber: true,
        // 卡扣金额是否禁用
        disabledCardKkNum: true,
        //   表单规则
        rules: {},
        // 房间id，房号
        roomInfo: {},
        checkRoomType: [],
        // 选中房间
        isActiveArr: [],
        roomType: [],
        louceng: [],
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
        orderRoom_order(
          this.roomInfo
        ).then(res => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          console.log(res)
          if (res.code == 0) {
            let {
              data
            } = res
            this.formRoomChange = data
            this.searchVip(data.tel)
          } else {
            this.message("error", res.message)
          }
        })
      },
      // 提交表单
      submitForm() {
        this.$refs.formRoomChange.validate((valid) => {
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
        this.$refs.formRoomChange.resetFields();
      },
      // 可选房型查询
      handleChangeRoomType() {
        orderYdroomtype({
          start_time: getAllTime(this.checkInForm.start_time),
          roomtype: this.setCheckRoomTypeStr(this.checkRoomType),
          end_time: getAllTime(this.checkInForm.end_time)
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
      setCheckRoomTypeStr(v) {
        let str = ""
        v.forEach(element => {
          str += element + ","
        });
        str = str.substring(0, str.length - 1)
        // console.log(str)
        return str
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