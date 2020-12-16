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
              <el-form-item label="团体名称：" prop="teamName">
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
                <el-input v-model="checkInForm.vipNumber" placeholder="请输入会员卡号" clearable :style="{ width: '100%' }">
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
                <el-date-picker @change="pickerEnd_time" v-model="checkInForm.end_time" type="datetime"
                  placeholder="选择日期"></el-date-picker>
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
                    <li class="fangjian" v-for="(f, index) in v.item" @click="chooseRoom(f)" :key="index">
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
              <el-table stripe :header-cell-style="tableStyle" :cell-style="tableStyle" :data="roomTableData"
                style="width: 100%; margin-top: 10px" max-height="500px">
                <el-table-column prop="roomtype" label="房间类型" width="150px"></el-table-column>
                <el-table-column prop="room_no" label="房间号"></el-table-column>
                <el-table-column prop="price" label="房间单价(元)"></el-table-column>

                <el-table-column label="操作">
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
              <el-form-item label="押金（元）：">
                <el-input v-model="checkInForm.deposit" :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="已付预款（元）：">
                <el-input v-model="checkInForm.advancePay" :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" justify="left">
            <el-col :span="8">
              <el-form-item label="应交预付款（元）：">
                <el-input v-model="checkInForm.RoomSumMoney" disabled :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预付方式：">
                <el-select v-model="checkInForm.payfor" placeholder="选择支付方式" :style="{ width: '100%' }">
                  <el-option label="现金" value="1"></el-option>
                  <el-option label="支付宝" value="2"></el-option>
                  <el-option label="微信" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预付金额（元）：">
                <el-input v-model="checkInForm.advanceMoney" :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" justify="left">
            <el-col :span="16" style="display: flex; align-content: center">
              <el-form-item label="会员卡支付：">
                <el-select v-model="checkInForm.isCardPayfor" placeholder="选择支付方式" :style="{ width: '100%' }">
                  <el-option label="会员卡支付" value="1"></el-option>
                  <el-option label="否" value="2"></el-option>
                </el-select>
              </el-form-item>
              <span style="
                  font-size: 14px;
                  color: #005ab9;
                  padding-top: 10px;
                  padding-left: 5px;
                ">余额：300元</span>
            </el-col>
            <el-col :span="8">
              <el-form-item label="卡扣金额（元）：">
                <el-input v-model="checkInForm.cardPayfor" :style="{ width: '100%' }"></el-input>
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
    orderYdroomtype
  } from '@/api/Check_in.js'
  import {
    getAllTime,
    getDayTime
  } from '@/utils/moment.js'
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
          RoomSumMoney: 1000,
          deposit: 200,
          advancePay: 0,
          payfor: "",
          advanceMoney: 200,
          isCardPayfor: "",
          cardPayfor: 500,
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
          teamName: [{
            required: true,
            message: "请输入团体名称",
            trigger: "blur"
          }, {
            min: 2,
            max: 5,
            message: "长度在 2 到 5 个字符",
            trigger: "blur"
          }],
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
            min: 2,
            max: 5,
            message: "长度在 2 到 5 个字符",
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
        },
        // 选中房间
        isActiveArr: [],

        // 表格对应的数据
        roomTableData: [{
          homeName: "单人间",
          roomNum: 8102,
          pric: 200
        }],
        // 表格样式
        tableStyle: {
          textAlign: "center"
        },

        // 弹框住客登记、
        ResidentsDialogVisible: false,
        // 住客登记表格
        ResidentsTableData: [{
          roomNum: 8102,
          name: "张三",
          sex: "男",
          cardType: "身份证",
          address: "安徽省合肥市滨湖新区西藏路"
        }],

      };
    },
    created() {
      this.getRows()
    },
    mounted() {
      // console.log('tag', this.$route.query)
    },
    methods: {
      getRows() {
        this.getNativeList()
        this.getCustomerType()
        this.getCredentials()
      },
      // 提交表单
      submitForm() {
        this.$refs.checkInForm.validate(valite => {
          if (valite) {

          } else {
            return false
          }
        })
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
          console.log(res)
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
      },
      setCheckRoomTypeStr(v) {
        let str = ""
        v.forEach(element => {
          str += element + ","
        });
        str = str.substring(0, str.length - 1)
        console.log(str)
        return str
      },
      // 结束日期change
      pickerEnd_time(v) {
        if (!v) {
          this.roomType = ""
          this.louceng = ""
        }
        console.log("kaishi"+ getAllTime(this.checkInForm.start_time)+"结束日期change"+getAllTime(v))
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
            console.log(res)
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
      handleReduce(i, v) {
        let roomTableData = this.roomTableData;
        roomTableData.splice(i, 1);
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
      chooseRoom(v) {
        // activeBlue
        // item.className = "activeBlue";
        // let data = {
        //   homeName: v.roomType,
        //   roomNum: item.floorNo,
        //   pric: 200
        // };
        let roomTableData = this.roomTableData
        let filt = roomTableData.filter(item => item.id === v.id)
        if (filt.length) {
          console.log()
          console.log(roomTableData.indexOf(filt))
          roomTableData.splice(filt)
        }
        roomTableData.push(v);
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

    .activeBlue {
      border: 1px solid #f00;
      color: #f00;
      padding: 5px 10px;
      margin: 0 10px 10px 0;

      span {
        display: block;
        font-size: 14px;
        cursor: pointer;
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
</style>