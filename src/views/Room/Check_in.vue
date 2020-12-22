<template>
  <el-container>
    <el-main>
      <h2>入住登记</h2>
      <div class="checkWarp">
        <el-form :rules="rules" ref="checkInForm" :model="checkInForm" label-width="140px">
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8">
              <el-form-item label="客户类型：" prop="personType">
                <el-select v-model="checkInForm.personType" placeholder="选择客客户类型" :style="{ width: '100%' }">
                  <el-option v-for="(item,index) in keHuType" :key="index" :label="item.name" :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="团体名称：">
                <el-input v-model="checkInForm.teamName" placeholder="请输入团体名称" clearable :style="{ width: '100%' }">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="国籍：" prop="native">
                <el-select v-model="checkInForm.native" placeholder="选择国籍" :style="{ width: '100%' }">
                  <el-option v-for="(item,index) in nativeList" :key="index" :label="item.name" :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8" style="display: flex; align-content: center">
              <el-form-item label="证件类型：" prop="certificate">
                <el-select v-model="checkInForm.certificate" placeholder="选择证件类型" :style="{ width: '100%' }">
                  <el-option v-for="(item, index) in certificateOptions" :key="index" :label="item.name"
                    :value="item.name"></el-option>
                </el-select>
              </el-form-item>
              <el-button type="primary" class="duCard">读身份证</el-button>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话：" prop="tel">
                <el-input v-model="checkInForm.tel" placeholder="请输入联系电话" clearable :style="{ width: '100%' }">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="会员卡号：">
                <el-input v-model="checkInForm.vipNumber" @clear="handleClearInput" @blur="handleChangeIsVIP"
                  placeholder="请输入会员卡号" clearable :style="{ width: '100%' }">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8">
              <el-form-item label="客主姓名：" prop="name">
                <el-input v-model="checkInForm.name" placeholder="请输入客主姓名" clearable :style="{ width: '100%' }">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码：" prop="idNumber">
                <el-input v-model="checkInForm.idNumber" placeholder="请输入证件号码" clearable :style="{ width: '100%' }">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button type="success" round class="checkIn-search" @click="ResidentsDialogVisible = true">住客登记查询
              </el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="24">
              <el-form-item label="证件地址：" prop="adderss">
                <el-input v-model="checkInForm.adderss" placeholder="请输入证件地址" clearable :style="{ width: '100%' }">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8">
              <el-form-item label="入住时间：" prop="start_time">
                <el-date-picker @change="pickerStart_time" v-model="checkInForm.start_time" type="datetime"
                  placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="离店时间：" prop="end_time">
                <el-date-picker @change="pickerEnd_time"  v-model="checkInForm.end_time"
                  type="datetime" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-input v-model="checkInForm.datecount" placeholder clearable :style="{ width: '40%' }" class="days">
                </el-input>
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
          <p class="chooseTitle">已选客房：</p>
          <el-row>
            <el-col :span="24">
              <el-table stripe show-summary :summary-method="getSumMoney" :header-cell-style="tableStyle"
                :cell-style="tableStyle" :data="roomTableData" style="width: 100%; margin-top: 10px" max-height="500px">
                <el-table-column align="center" prop="roomtype" label="房间类型" width="150px"></el-table-column>
                <el-table-column align="center" prop="room_no" label="房间号"></el-table-column>
                <el-table-column align="center" prop="price" label="房间单价(元)"></el-table-column>
                <el-table-column align="center" prop="kx_count" label="房间总额(元)"></el-table-column>
                <el-table-column align="center" label="操作">
                  <template v-slot="scope">
                    <el-button icon="el-icon-delete" circle type="danger"
                      @click="handleReduce(scope.$index, scope.row)"></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" justify="left">
            <el-col :span="8">
              <el-form-item label="房费总金额（元）：">
                <el-input v-model="checkInForm.RoomSumMoney" disabled :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="加收金额（元）：">
                <el-input disabled v-model="checkInForm.chargeAmount" :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="优惠金额（元）：">
                <el-input disabled v-model="checkInForm.couponMoney" :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" justify="left">
            <el-col :span="8">
              <el-form-item prop="payfor" label="付款方式：">
                <el-select v-model="checkInForm.payfor" placeholder="选择支付方式" :style="{ width: '100%' }">
                  <el-option v-for="(item,index) in payForForhod" :key="index" :label="item.name" :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="付款金额（元）：" prop="paymentAmount">
                <el-input v-model="checkInForm.paymentAmount" :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="押金（元）：" prop="deposit">
                <el-input v-model="checkInForm.deposit" :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" justify="left">
            <el-col :span="16" style="display: flex; align-content: center">
              <el-form-item label="会员卡支付：">
                <el-select :disabled="disabledMember_card" v-model="checkInForm.isCardPayfor" placeholder="选择支付方式"
                  :style="{ width: '100%' }">
                  <el-option label="是" value="是"></el-option>
                  <el-option label="否" value="否"></el-option>
                </el-select>
              </el-form-item>
              <span v-show="VIPInfo" style="
                  font-size: 14px;
                  color: #005ab9;
                  padding-top: 10px;
                  padding-left: 5px;
                ">余额：{{VIPInfo.balance}}元</span>
            </el-col>
            <el-col :span="8">
              <el-form-item label="卡扣金额（元）：">
                <el-input :disabled="disabledCardKkNum" v-model="checkInForm.cardPayfor" :style="{ width: '100%' }">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" justify="center" class="btn">
            <el-button>重置</el-button>
            <el-button type="primary" @click="submitForm">确认</el-button>
          </el-row>
        </el-form>
      </div>

      <!-- 住客登记查询 -->
      <el-dialog title="住客登记查询" :visible.sync="ResidentsDialogVisible" width="50%" center>
        <el-table :data="ResidentsTableData" style="width: 100%" border>
          <el-table-column prop="roomNum" label="房间号" width="80" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" width="100" align="center"></el-table-column>
          <el-table-column prop="sex" label="性别" width="80" align="center"></el-table-column>
          <el-table-column prop="cardType" label="证件类型" width="80" align="center"></el-table-column>

          <el-table-column prop="address" label="证件地址" align="center"></el-table-column>
          <el-table-column prop="operation" label="操作" align="center" width="80">
            <template>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ResidentsDialogVisible = false">取 消</el-button>
          <el-button type="success">读取身份证</el-button>
          <el-button type="primary" @click="ResidentsDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>


    </el-main>
  </el-container>
</template>

<script>
  import {
    nationalityIndex,
    customertypeLists,
    zhengjianLists,
    orderYdroomtype,
    orderMemberinfo,
    paymethod,
    settingInfo,
    orderMoveinto
  } from '@/api/Check_in.js'
  import {
    getAllTime,
    getDayTime,
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
      return {
        // 国籍列表
        nativeList: [],
        // 支付方式
        payForForhod: [],
        //客户类型
        keHuType: [],
        checkInForm: {
          personType: "",
          teamName: "",
          certificate: "",
          tel: "",
          vipNumber: "",
          name: "",
          idNumber: "",
          adderss: "",
          end_time: "",
          start_time: "",
          datecount: "",
          RoomSumMoney: "",
          deposit: "",
          couponMoney: "",
          payfor: "",
          paymentAmount: "",
          isCardPayfor: "",
          cardPayfor: "",
          chargeAmount: "",
        },
        checkRoomType: [],
        checkInRef: {
          personType: [],
          teamName: []
        },
        nativeOptions: [],
        certificateOptions: [],
        roomType: [],
        louceng: [],
        // 表单验证
        rules: {
          personType: [{
            required: true,
            message: "请选择客户类型",
            trigger: "change"
          }],
          // teamName: [{
          //   required: true,
          //   message: "请输入团体名称",
          //   trigger: "blur"
          // }, {
          //   min: 2,
          //   max: 5,
          //   message: "长度在 2 到 5 个字符",
          //   trigger: "blur"
          // }],
          native: [{
            required: true,
            message: "请选择国籍",
            trigger: "change"
          }],
          certificate: [{
            required: true,
            message: "请选择证件类型",
            trigger: "change"
          }],
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
          name: [{
            required: true,
            message: "请输入客主姓名",
            trigger: "blur"
          }, {
            min: 2,
            max: 5,
            message: "长度在 2 到 5 个字符",
            trigger: "blur"
          }],
          idNumber: [{
            required: true,
            message: "请输入证件号码",
            trigger: "blur"
          }],
          adderss: [{
            required: true,
            message: "请输入证件地址",
            trigger: "blur"
          }, {
            min: 5,
            message: "请输入最少5 个字符",
            trigger: "blur"
          }],
          start_time: [{
            required: true,
            message: "请选择入住时间",
            trigger: "change"
          }],
          end_time: [{
            required: true,
            message: "请选择离店时间",
            trigger: "change"
          }],
          deposit: [{
            required: true,
            message: "请输入押金金额",
            trigger: "blur"
          }],
          payfor: [{
            required: true,
            message: "请选择预付方式",
            trigger: "change"
          }],
          paymentAmount: [{
            required: true,
            message: "请输入付款金额",
            trigger: "blur"
          }],
        },
        // 是否是会员卡支付disabled
        disabledMember_card: true,
        // 卡扣金额disabled
        disabledCardKkNum: true,
        // 会员详情
        VIPInfo: "",
        // 选中房间
        isActiveArr: [],

        // 表格对应的数据
        roomTableData: [],
        // 表格样式
        tableStyle: {
          textAlign: "center"
        },
        // 计费详情
        settingInfo: "",
        // 弹框住客登记、
        ResidentsDialogVisible: false,
        // 住客登记表格
        ResidentsTableData: [],

      };
    },
    created() {
      this.getRows()
    },
    mounted() {
      // console.log('tag', this.$route.query)
    },
    // computed(){
    //   setColor(){

    //   }
    // // },
    // watch: {
    //   isActiveArr(val) {
    //     let roomSetCorlor = this.$refs.roomSetCorlor
    //     console.log(roomSetCorlor.id)
    //     val.forEach((v, i) => {})
    //   },
    // },
    computed: {
      Newis_card_pay() {
        return this.checkInForm.isCardPayfor
      },
      Newmember_card() {
        return this.checkInForm.cardPayfor
      },
      NewRoomSumMoney() {
        return this.checkInForm.RoomSumMoney
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
          this.checkInForm.is_card_pay = '否'
        } else
          this.disabledMember_card = false
        deep: true
      },
      NewRoomSumMoney(val) {
        if (!this.disabledMember_card && this.VIPInfo) {
          let couponMoney = this.checkInForm.couponMoney ? this.checkInForm.couponMoney : 0
          couponMoney += (val / Number(this.VIPInfo.discount / 100)) - val
          this.checkInForm.couponMoney = couponMoney
        }
      }
    },
    methods: {
      // setColor(f) {
      //   let str = ''
      //   try {
      //     this.isActiveArr.forEach(v => {
      //       if (f.id == v.id) {
      //         str = 'activeBlue'
      //       }
      //     })
      //     return str
      //   } catch (e) {
      //     return str
      //   }
      // },
      getRows() {
        this.getNativeList()
        this.getCustomerType()
        this.getCredentials()
        this.getPaymethodList()
        this.getMoneyWay()
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
      // 提交表单
      submitForm() {
        let checkInForm = this.checkInForm
        // console.log(checkInForm)
        let setTableRoomPrice = this.setTableRoomPrice(this.roomTableData)
        this.$refs.checkInForm.validate(valite => {
          if (valite) {
            if (!setTableRoomPrice) {
              return this.message('error', '请选择预订房间')
            }
            let arr = [checkInForm.idNumber, checkInForm.paymentAmount, checkInForm.deposit]
            let blooen = arr.every(item => Number(item) >= 0)
            if (!blooen) {
              return this.message('error', '请选择检查输入的数值是否正确')
            }
            let params = {
              type: checkInForm.personType,
              groupname: checkInForm.teamName,
              nationality: checkInForm.native,
              zhengjian: checkInForm.certificate,
              tel: checkInForm.tel,
              member_card: checkInForm.vipNumber,
              name: checkInForm.name,
              zhengjian_no: checkInForm.idNumber,
              address: checkInForm.adderss,
              start_time: getAllTime(checkInForm.start_time),
              end_time: getAllTime(checkInForm.end_time),
              datecount: checkInForm.datecount,
              roomtype_info: setTableRoomPrice,
              count_money: checkInForm.RoomSumMoney,
              yajin_money: checkInForm.deposit,
              is_card_pay: checkInForm.isCardPayfor,
              card_money: checkInForm.cardPayfor,
              paymethod: checkInForm.payfor,
              other_pay_money: checkInForm.paymentAmount,
              jia_money: checkInForm.chargeAmount,
            }
            orderMoveinto(params).then(res => {
              res = typeof res == "string" ? JSON.parse(res) : res;
              console.log(res)
              if (res.code == 0) {
                this.message("success", res.message)
              } else {
                this.message("error", res.message)
              }
            })
          } else {
            return false
          }
        })
      },
      // 获取房间名房间数
      setTableRoomPrice(v) {
        console.log(v)
        let str = ""
        v.forEach(item => {
          str += `${item.id},${item.roomtype},${item.room_no},${item.price},${item.floor};`
        });
        str = str.substring(0, str.length - 1)
        console.log('tag', str)
        return str
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
      //获取客户类型
      getCustomerType() {
        customertypeLists().then(res => {
          res = JSON.parse(res);
          // console.log(res, "获取客户列表");
          if (res.code === 0) {
            this.keHuType = res.data;
          } else {
            this.message("error", res.message);
          }
        });
      },

      //获取国籍列表
      getNativeList() {
        nationalityIndex().then(res => {
          res = JSON.parse(res);
          // console.log(res, "获取国籍列表");
          if (res.code === 0) {
            this.nativeList = res.data.list;
          } else {
            this.message("error", res.message);
          }
        });
      },
      // 获取证件类型
      getCredentials() {
        zhengjianLists().then(res => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          // console.log(res)
          if (res.code == 0) {
            this.certificateOptions = res.data
          } else {
            this.message("error", res.message)
          }
        })
      },



      // 开始日期change
      pickerStart_time(v) {
        if (!v) {
          this.roomType = ""
          this.louceng = ""
          return
        }
        if (this.checkInForm.end_time) {
          if (v > this.checkInForm.end_time) {
            this.message('warning', '遇到时间不能大于预离时间')
            this.checkInForm.start_time = ""
            return
          }
          this.checkInForm.datecount = getDayTime(v, this.checkInForm.end_time)
          orderYdroomtype({
            start_time: getAllTime(v),
            end_time: getAllTime(this.checkInForm.end_time)
          }).then(res => {
            res = typeof res == "string" ? JSON.parse(res) : res;
            console.log(res)
            if (res.code == 0) {
              this.$forceUpdate()
              this.roomType = res.data
              this.louceng = res.room_list
            } else {
              this.$forceUpdate()
              this.message("error", res.message)
            }
          })

        }
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


      // 结束日期change
      pickerEnd_time(v) {
        console.log(v)
        if (!v) {
          this.roomType = ""
          this.louceng = ""
        }
        // console.log("kaishi" + getAllTime(this.checkInForm.start_time) + "结束日期change" + getAllTime(v))
        if (this.checkInForm.start_time) {
          if (v < this.checkInForm.start_time) {
            this.message('warning', '预离时间不能小于遇到时间')
            this.checkInForm.end_time = ""
            return
          }
          this.checkInForm.datecount = getDayTime(this.checkInForm.start_time, v)
          orderYdroomtype({
            start_time: getAllTime(this.checkInForm.start_time),
            end_time: getAllTime(v)
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
        }
      },
      // // 加，减，总
      // handleAdd(i, t) {
      //   let roomTableData = this.roomTableData[i];
      //   roomTableData.sum += 1;
      //   roomTableData.suMoney += roomTableData.pric;
      // },
      // 设置最后一行合计
      getSumMoney({
        columns,
        data
      }) {
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 1 || index === 4) {
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

        if (sums[2] != '结算') {
          let checkInForm = this.checkInForm
          let settingInfo = this.settingInfo
          let HHstart_time = Moment(checkInForm.start_time).format('HH:mm')
          let HHend_time = Moment(checkInForm.end_time).format('HH:mm')
          let YYstart_time = Moment(checkInForm.start_time).format('YYYY-MM-DD')
          let YYend_time = Moment(checkInForm.end_time).format('YYYY-MM-DD')
          let chargeAmount
          let couponMoney
          // let settingInfo = this.settingInfo
          // let start_time = Moment(this.checkInForm.start_time).format('X')
          // let end_time = Moment(this.checkInForm.end_time).format('X')
          // let strDate = Moment.unix(start_time).format("YYYY MM DD HH:mm")
          // let endDate = Moment.unix(end_time).format("YYYY MM DD HH:mm")

          // // 夜间入住时间段
          // let yzstart_time = Moment(settingInfo.yzstart_time).format('X')
          // let yzend_time = Moment(settingInfo.yzend_time).format('X')

          // console.log(yzend_time - yzstart_time)
          // if (sums[2] != '结算' && start_time && end_time) {
          //   if (end_time - start_time < yzend_time - yzstart_time) {

          //   }
          let diffDay = Moment(YYend_time).diff(Moment(YYstart_time), 'days')
          // 需要支付的房费
          let totolMoneny
          // 凌晨订房
          if (HHstart_time >= settingInfo.yzstart_time && HHstart_time < settingInfo.yzend_time) {
            // console.log('凌晨订房')
            //根据时间当天的房费
            totolMoneny = sums[2] * Number(settingInfo.yz_date) + sums[2]
            // console.log(sums[2] * Number(settingInfo.yz_date))
            // console.log(sums[2])
            // 当天

            if (diffDay == 0) {
              // console.log('凌晨订房-结束时间当天')
              // 非会员
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
                    chargeAmount = Number(settingInfo.tf_money1)
                  } else {
                    // console.log(mm , mm2)
                    // console.log(mm > mm2)
                    if (mm > mm2) {
                      // console.log('凌晨订房-结束时间当天-非会员-下午退房时间之内按小时收费-几个小时')
                      totolMoneny += Number(settingInfo.tf_money1) * ((hh - hh1) + 1)
                      chargeAmount = Number(settingInfo.tf_money1) * ((hh - hh1) + 1)
                      // console.log(hh1 - hh)
                      // console.log(Number(settingInfo.tf_money1))
                    } else {
                      // console.log('凌晨订房-结束时间当天-非会员-下午退房时间之内按小时收费-小时')
                      totolMoneny += Number(settingInfo.tf_money1) * (hh - hh1)
                      chargeAmount = Number(settingInfo.tf_money1) * (hh - hh1)
                    }
                  }
                } else if (HHend_time > settingInfo.tfend_time2) {
                  // 下午退房时间之内按天收费
                  totolMoneny += sums[2] * Number(settingInfo.tf_date)
                  chargeAmount = sums[2] * Number(settingInfo.tf_date)
                }
              } else {
                // 会员
                if (HHend_time > settingInfo.tfend_time1 && HHend_time <= settingInfo.membertf_end_time2) {
                  let hh = Number(Moment(checkInForm.end_time).format('HH'))
                  let mm = Number(Moment(checkInForm.end_time).format('mm'))
                  let hh1 = Number(settingInfo.tfend_time1.substring(0, 2))
                  let mm2 = Number(settingInfo.tfend_time1.substring(3, 5))
                  if (hh - hh1 == 0) {
                    if (mm > mm2) {
                      totolMoneny += Number(settingInfo.membertf_tf_money1)
                      chargeAmount = Number(settingInfo.membertf_tf_money1)
                      couponMoney = Number(settingInfo.tf_money1) - Number(settingInfo.membertf_tf_money1)
                    } else {}
                  } else {
                    if (mm > mm2) {
                      totolMoneny += Number(settingInfo.membertf_tf_money1) * ((hh - hh1) + 1)
                      chargeAmount = Number(settingInfo.membertf_tf_money1) * ((hh - hh1) + 1)
                      couponMoney = Number(settingInfo.tf_money1) * ((hh - hh1) + 1) - Number(settingInfo
                        .membertf_tf_money1) * ((hh - hh1) + 1)
                    } else {
                      totolMoneny += Number(settingInfo.membertf_tf_money1) * (hh - hh1)
                      chargeAmount = Number(settingInfo.membertf_tf_money1) * (hh - hh1)
                      couponMoney = Number(settingInfo.tf_money1) * (hh - hh1) - Number(settingInfo
                        .membertf_tf_money1) * (hh - hh1)
                    }
                  }
                } else {
                  totolMoneny += sums[2] * Number(settingInfo.membertf_tf_date)
                  chargeAmount = sums[2] * Number(settingInfo.membertf_tf_date)
                  couponMoney = sums[2] * Number(settingInfo.tf_date) - sums[2] * Number(settingInfo.membertf_tf_date)
                }
              }

            } else {
              // console.log(HHend_time > settingInfo.tfend_time1)
              // console.log(HHend_time <= settingInfo.tfend_time2)
              totolMoneny += sums[2] * (Number(diffDay))
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
                        totolMoneny += Number(settingInfo.membertf_tf_money1)
                      } else {}
                    } else {
                      if (mm > mm2) {
                        totolMoneny += Number(settingInfo.tf_money1) * ((hh - hh1) + 1)
                      } else {
                        totolMoneny += Number(settingInfo.tf_money1) * (hh - hh1)
                      }
                    }
                  } else if (HHend_time > settingInfo.membertf_end_time2) {
                    // 下午退房时间之内按天收费
                    totolMoneny += sums[2] * Number(settingInfo.tf_date)
                  }
                } else {
                  // 会员
                  if (HHend_time > settingInfo.membertf_end_time1 && HHend_time <= settingInfo.membertf_end_time2) {
                    let hh = Moment(checkInForm.end_time).format('HH')
                    let mm = Moment(checkInForm.end_time).format('mm')
                    let hh1 = settingInfo.membertf_end_time1.substring(0, 2)
                    let mm2 = Number(settingInfo.membertf_end_time1.substring(3, 5))
                    if (hh - hh1 == 0) {
                      if (mm > mm2) {
                        totolMoneny += Number(settingInfo.membertf_tf_money1)
                      } else {}
                    } else {
                      if (mm > mm2) {
                        totolMoneny += Number(settingInfo.membertf_tf_money1) * ((hh - hh1) + 1)
                      } else {
                        totolMoneny += Number(settingInfo.membertf_tf_money1) * (hh - hh1)
                      }
                    }
                  } else {
                    totolMoneny += sums[2] * Number(settingInfo.membertf_tf_date)
                  }
                }
                //  totolMoneny = sums[2] * settingInfo.yz_date
              }
            }
            // checkInForm.RoomSumMoney = sums[2] + sums[2] * settingInfo.yz_date
            // checkInForm.chargeAmount = sums[2] * settingInfo.yz_date
          } else {
            // 正常时间订房
            if (diffDay == 0) {
              totolMoneny = sums[2] * (diffDay + 1)
            } else {
              totolMoneny = sums[2] * (diffDay)
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
                      chargeAmount = Number(settingInfo.tf_money1)

                    } else {}
                  } else {
                    if (mm > mm2) {
                      totolMoneny += Number(settingInfo.tf_money1) * ((hh - hh1) + 1)
                      chargeAmount = Number(settingInfo.tf_money1) * ((hh - hh1) + 1)
                    } else {
                      totolMoneny += Number(settingInfo.tf_money1) * (hh - hh1)
                      chargeAmount = Number(settingInfo.tf_money1) * (hh - hh1)
                    }
                  }
                } else if (HHend_time > settingInfo.tfend_time2) {
                  // 下午退房时间之内按天收费
                  totolMoneny += sums[2] * Number(settingInfo.tf_date)
                  chargeAmount = sums[2] * Number(settingInfo.tf_date)
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
                      chargeAmount = Number(settingInfo.membertf_tf_money1)
                      couponMoney = Number(settingInfo.tf_money1) - Number(settingInfo.membertf_tf_money1)
                    } else {}
                  } else {
                    if (mm > mm2) {
                      totolMoneny += Number(settingInfo.membertf_tf_money1) * ((hh - hh1) + 1)
                      chargeAmount = Number(settingInfo.membertf_tf_money1) * ((hh - hh1) + 1)
                      couponMoney = Number(settingInfo.tf_money1) * ((hh - hh1) + 1) - Number(settingInfo
                        .membertf_tf_money1) * ((hh - hh1) + 1)
                      console.log(couponMoney)
                    } else {
                      totolMoneny += Number(settingInfo.membertf_tf_money1) * (hh - hh1)
                      chargeAmount = Number(settingInfo.membertf_tf_money1) * (hh - hh1)
                      couponMoney = Number(settingInfo.tf_money1) * (hh - hh1) - Number(settingInfo
                        .membertf_tf_money1) * (hh - hh1)
                    }
                  }
                } else if (HHend_time > settingInfo.membertf_end_time2) {
                  totolMoneny += sums[2] * Number(settingInfo.membertf_tf_date)
                  chargeAmount = sums[2] * Number(settingInfo.membertf_tf_date)
                  couponMoney = sums[2] * Number(settingInfo.tf_date) * Number(settingInfo.membertf_tf_date)
                }
              }
            }
          }
          if (!totolMoneny) {
            this.checkInForm.RoomSumMoney = 0
          } else {
            this.checkInForm.RoomSumMoney = Number(totolMoneny).toFixed(2)
            this.checkInForm.chargeAmount = chargeAmount
            this.checkInForm.couponMoney = couponMoney
            if (!this.disabledMember_card) {
              this.checkInForm.RoomSumMoney = Number(totolMoneny).toFixed(2) * (Number(this.VIPInfo.discount) / 100)
            }
          }
        } else {
          this.checkInForm.RoomSumMoney = 0
          this.checkInForm.chargeAmount = 0
          this.checkInForm.couponMoney = 0
        }


        return sums;
        // this.checkInForm.RoomSumMoney -= this.checkInForm.RoomSumMoney * (Number(this.VIPInfo.discount) / 100)
        // this.checkInForm.couponMoney += this.checkInForm.RoomSumMoney * (Number(this.VIPInfo.discount) / 100)
      },
      handleReduce(i, v) {
        let roomTableData = this.roomTableData;
        roomTableData.splice(i, 1);
        this.isActiveArr.forEach((item, i) => {
          if (v.id === item) {
            this.isActiveArr.splice(i, 1)
          }
        })
      },

      //打印
      dayin() {
        this.payforDialogVisible = false;
        this.GateCardDialogVisible = false;
      },
      budayin() {
        this.payforDialogVisible = false;
        this.GateCardDialogVisible = false;
      },
      // 根据身份证查询是否会员
      handleChangeIsVIP() {
        if (this.checkInForm.vipNumber == '') {
          return
        }
        if (this.checkInForm.tel) {
          orderMemberinfo({
            member_card: this.checkInForm.vipNumber
          }).then(res => {
            res = typeof res == "string" ? JSON.parse(res) : res;
            console.log(res)
            if (res.code == 0) {
              let {
                data
              } = res
              // console.log(data)
              if (!data) {
                this.disabledMember_card = true
                return this.message("error", '会员账号与手机号不匹配')
              } else if (data) {
                let card_no = data.card_no
                this.VIPInfo = data
                console.log(card_no)
                // this.message("success", res.message)
                // this.formLabelAlign.member_card = data.card_no
                // this.$forceUpdate()
                if (card_no == this.checkInForm.vipNumber) {
                  this.disabledMember_card = false
                  this.message("success", 操作成功)
                } else {
                  this.disabledMember_card = true
                  return this.message("error", '会员账号与手机号不匹配')
                }
              }
            } else {
              this.disabledMember_card = true
              this.message("error", '会员账号与手机号不匹配')
            }
          })
        } else {
          orderMemberinfo({
            member_card: this.checkInForm.vipNumber
          }).then(res => {
            res = typeof res == "string" ? JSON.parse(res) : res;
            console.log(res)

            if (res.code == 0) {
              let {
                data
              } = res

              if (!data) {
                this.checkInForm.vipNumber = ''
                this.disabledMember_card = true
                return this.message("error", '请输入正确的会员卡号')
              } else {
                this.VIPInfo = data
                this.message("success", res.message)
                this.checkInForm.tel = data.mobile
                this.disabledMember_card = false
                this.$forceUpdate()
              }
            } else {
              this.disabledMember_card = true
              this.checkInForm.vipNumber = ''
              this.message("error", res.message)
            }
          })
        }
      },
      // 处理房价
      setRoomPrice(val) {
        let checkInForm = this.checkInForm
        let settingInfo = this.settingInfo
        let HHstart_time = Moment(checkInForm.start_time).format('HH:mm')
        let HHend_time = Moment(checkInForm.end_time).format('HH:mm')
        let YYstart_time = Moment(checkInForm.start_time).format('YYYY-MM-DD')
        let YYend_time = Moment(checkInForm.end_time).format('YYYY-MM-DD')
        let chargeAmount
        let couponMoney
        let diffDay = Moment(YYend_time).diff(Moment(YYstart_time), 'days')
        // 需要支付的房费
        let totolMoneny
        let v = Number(val)
        console.log(v)
        if (HHstart_time >= settingInfo.yzstart_time && HHstart_time < settingInfo.yzend_time) {
          console.log('凌晨订房')
          //根据时间当天的房费
          totolMoneny = v * Number(settingInfo.yz_date) + v
          // console.log(sums[2] * Number(settingInfo.yz_date))
          // console.log(sums[2])
          // 当天

          if (diffDay == 0) {
            console.log('凌晨订房-结束时间当天')
            // 非会员
            if (this.disabledMember_card) {
              console.log('凌晨订房-结束时间当天-非会员')
              // 下午退房时间之内按小时收费
              if (HHend_time > settingInfo.tfend_time1 && HHend_time <= settingInfo.tfend_time2) {
                // console.log('凌晨订房-结束时间当天-非会员-下午退房时间之内按小时收费')
                let hh = Number(Moment(checkInForm.end_time).format('HH'))
                let mm = Number(Moment(checkInForm.end_time).format('mm'))
                let hh1 = Number(settingInfo.tfend_time1.substring(0, 2))
                let mm2 = Number(settingInfo.tfend_time1.substring(3, 5))


                if (hh1 - hh == 0) {
                  console.log('凌晨订房-结束时间当天-非会员-下午退房时间之内按小时收费-超过十几分钟')
                  totolMoneny += Number(settingInfo.tf_money1)
                } else {
                  // console.log(mm , mm2)
                  // console.log(mm > mm2)
                  if (mm > mm2) {
                    // console.log('凌晨订房-结束时间当天-非会员-下午退房时间之内按小时收费-几个小时')
                    totolMoneny += Number(settingInfo.tf_money1) * ((hh - hh1) + 1)
                    // console.log(hh1 - hh)
                    // console.log(Number(settingInfo.tf_money1))
                  } else {
                    // console.log('凌晨订房-结束时间当天-非会员-下午退房时间之内按小时收费-小时')
                    totolMoneny += Number(settingInfo.tf_money1) * (hh - hh1)
                  }
                }
              } else if (HHend_time > settingInfo.tfend_time2) {
                // 下午退房时间之内按天收费
                totolMoneny += v * Number(settingInfo.tf_date)
              }
            } else {
              // 会员
              if (HHend_time > settingInfo.tfend_time1 && HHend_time <= settingInfo.tfend_time2) {
                let hh = Number(Moment(checkInForm.end_time).format('HH'))
                let mm = Number(Moment(checkInForm.end_time).format('mm'))
                let hh1 = Number(settingInfo.tfend_time1.substring(0, 2))
                let mm2 = Number(settingInfo.tfend_time1.substring(3, 5))
                if (hh - hh1 == 0) {
                  if (mm > mm2) {
                    totolMoneny += Number(settingInfo.membertf_tf_money1)
                  } else {}
                } else {
                  if (mm > mm2) {
                    totolMoneny += Number(settingInfo.membertf_tf_money1) * ((hh - hh1) + 1)
                  } else {
                    totolMoneny += Number(settingInfo.membertf_tf_money1) * (hh - hh1)
                  }
                }
              } else {
                totolMoneny += v * Number(settingInfo.membertf_tf_date)
              }
            }

          } else {
            // console.log(HHend_time > settingInfo.tfend_time1)
            // console.log(HHend_time <= settingInfo.tfend_time2)
            totolMoneny += v * (Number(diffDay))
            if (HHend_time > settingInfo.tfend_time1 && HHend_time <= settingInfo.tfend_time2) {
              // console.log(123)
              // 非会员
              if (this.disabledMember_card) {
                // 下午退房时间之内按小时收费
                if (HHend_time > settingInfo.tfend_time1 && HHend_time <= settingInfo.tfend_time2) {
                  let hh = Number(Moment(checkInForm.end_time).format('HH'))
                  let mm = Number(Moment(checkInForm.end_time).format('mm'))
                  let hh1 = Number(settingInfo.tfend_time1.substring(0, 2))
                  let mm2 = Number(settingInfo.tfend_time1.substring(3, 5))
                  if (hh - hh1 == 0) {
                    if (mm > mm2) {
                      totolMoneny += Number(settingInfo.membertf_tf_money1)
                    } else {}
                  } else {
                    if (mm > mm2) {
                      totolMoneny += Number(settingInfo.tf_money1) * ((hh - hh1) + 1)
                    } else {
                      totolMoneny += Number(settingInfo.tf_money1) * (hh - hh1)
                    }
                  }
                } else if (HHend_time > settingInfo.tfend_time2) {
                  // 下午退房时间之内按天收费
                  totolMoneny += v * Number(settingInfo.tf_date)
                }
              } else {
                // 会员
                if (HHend_time > settingInfo.tfend_time1 && HHend_time <= settingInfo.membertf_end_time2) {
                  let hh = Moment(checkInForm.end_time).format('HH')
                  let mm = Moment(checkInForm.end_time).format('mm')
                  let hh1 = settingInfo.membertf_end_time1.substring(0, 2)
                  let mm2 = Number(settingInfo.tfend_time1.substring(3, 5))
                  if (hh - hh1 == 0) {
                    if (mm > mm2) {
                      totolMoneny += Number(settingInfo.membertf_tf_money1)
                    } else {}
                  } else {
                    if (mm > mm2) {
                      totolMoneny += Number(settingInfo.membertf_tf_money1) * ((hh - hh1) + 1)
                    } else {
                      totolMoneny += Number(settingInfo.membertf_tf_money1) * (hh - hh1)
                    }
                  }
                } else {
                  totolMoneny += v * Number(settingInfo.membertf_tf_date)
                }
              }
              //  totolMoneny = sums[2] * settingInfo.yz_date
            }
          }
          // checkInForm.RoomSumMoney = sums[2] + sums[2] * settingInfo.yz_date
          // checkInForm.chargeAmount = sums[2] * settingInfo.yz_date
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

                  } else {}
                } else {
                  if (mm > mm2) {
                    totolMoneny += Number(settingInfo.tf_money1) * ((hh - hh1) + 1)
                  } else {
                    totolMoneny += Number(settingInfo.tf_money1) * (hh - hh1)
                  }
                }
              } else if (HHend_time > settingInfo.tfend_time2) {
                // 下午退房时间之内按天收费
                totolMoneny += v * Number(settingInfo.tf_date)
              } else {}
            } else {
              // 会员
              if (HHend_time > settingInfo.tfend_time1 && HHend_time <= settingInfo.membertf_end_time2) {
                let hh = Number(Moment(checkInForm.end_time).format('HH'))
                let mm = Number(Moment(checkInForm.end_time).format('mm'))
                let hh1 = Number(settingInfo.tfend_time1.substring(0, 2))
                let mm2 = Number(settingInfo.tfend_time1.substring(3, 5))
                if (hh - hh1 == 0) {
                  if (mm > mm2) {
                    totolMoneny += Number(settingInfo.membertf_tf_money1)
                  } else {}
                } else {
                  if (mm > mm2) {
                    totolMoneny += Number(settingInfo.membertf_tf_money1) * ((hh - hh1) + 1)
                  } else {
                    totolMoneny += Number(settingInfo.membertf_tf_money1) * (hh - hh1)
                  }
                }
              } else if (HHend_time > settingInfo.membertf_end_time2) {
                totolMoneny += v * Number(settingInfo.membertf_tf_date)
              }
            }
          }
        }
        console.log(totolMoneny)
        return totolMoneny
      },
      // 清空会员手机
      handleClearInput() {
        this.checkInForm.vipNumber = ''
        this.checkInForm.tel = ''
        this.disabledMember_card = true
        this.checkInForm.is_card_pay = '否'
      },
      chooseRoom(v) {
        // activeBlue
        // item.className = "activeBlue";
        // let data = {
        //   homeName: v.roomType,
        //   roomNum: item.floorNo,
        //   pric: 200
        // };
        let roomTableData = this.roomTableData
        let len = -1
        try {
          roomTableData.forEach((item, index) => {
            if (item.id == v.id) {
              len = index
              throw new Error("end")
            } else {
              len = -1
            }
          })
        } catch (e) {}
        if (len >= 0) {
          roomTableData.splice(len, 1)
          this.isActiveArr.splice(len, 1)
          // console.log(this.isActiveArr)
          this.$forceUpdate()
          return
        }
        v.kx_count = this.setRoomPrice(v.price)
        console.log('tag', v.kx_count)
        roomTableData.push(v);
        this.isActiveArr.push(v.id);
        this.$forceUpdate()
        // let arrItem = {
        //   id: v.id,
        //   floor: v.floor
        // }
        // this.isActiveArr.push(arrItem);
        // this.isActiveArr.push(item);
        // {
        //   homeName: "单人间",
        //   roomNum: 8102,
        //   pric: 200,
        // }

        // console.log(this.isActiveArr);
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

      .checkIn-search {
        margin-left: -150px;
      }

      .duCard {
        height: 40px;
        line-height: 40px;
        margin-left: 5px;
        padding: 0 5px;
      }

      .days {
        margin-left: -350px;
      }

      .chooseTitle {
        text-align: left;
      }

      .chooseRoom {
        min-height: 30px;
        background: #f9f9f9;
        padding: 20px 20px 0;
        margin: 10px 0 20px;

        /deep/.el-checkbox {
          text-align: left;
          display: block;
          margin-bottom: 20px;
        }

        .chooseRoomRight {
          max-height: 280px;
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

            .fangjian {
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

      .btn {
        margin-top: 30px;

        .el-button {
          width: 100px;
        }
      }

      .el-table {
        margin-bottom: 30px;
      }

      .roomSetting {
        display: flex;
        justify-content: center;

        .el-input {
          width: 45px;
        }
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
    }

    /deep/.el-dialog__footer {
      text-align: center;
    }

    .qianzi {
      text-align: right;
      margin: 40px 200px 40px 0;
    }


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
</style>