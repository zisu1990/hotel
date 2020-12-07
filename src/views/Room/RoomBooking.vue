<template>
  <el-container v-cloak>
    <el-main>
      <el-row>
        <el-col :offset="3" :span="18">
          <el-row>
            <p class="title">客房预订</p>
          </el-row>
          <el-form
            ref="formLabelAlign"
            :label-position="labelPosition"
            label-width="130px"
            :model="formLabelAlign"
            :rules="rules"
          >
            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="客户类型：">
                  <el-select
                    v-model="formLabelAlign.type"
                    style="width: 100%"
                    @change="selectKeHuType($event)"
                  >
                 <el-option
                    v-for="(item,index) in keHuType"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="团体名称：" v-show="tuanti">
                  <el-input
                    clearable
                    disabled
                    v-model="formLabelAlign.groupname"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="国籍：">
                  <el-select @change="selectNative($event)"
                    v-model="formLabelAlign.nationality"
                    style="width: 100%"
                  >
                  <el-option
                    v-for="(item,index) in nativeList"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="会员卡号：">
                  <el-input
                    clearable
                    v-model="formLabelAlign.member_card"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="预订人：" prop="name">
                  <el-input
                    clearable
                    v-model="formLabelAlign.name"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="联系电话：" prop="tel">
                  <el-input
                    clearable
                    v-model="formLabelAlign.tel"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="预到时间：" prop="start_time">
                  <el-date-picker
                    style="width: 100%"
                    v-model="formLabelAlign.start_time"
                    type="datetime"
                    placeholder="选择日期时间"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="setEndDay" :span="10">
                <el-form-item label="预离时间：" prop="end_time">
                  <el-date-picker
                    style="width: 60%"
                    v-model="formLabelAlign.end_time"
                    type="datetime"
                    placeholder="选择日期时间"
                  >
                  </el-date-picker>
                  <el-input
                  style="width: 40%"
                    v-model="formLabelAlign.datecount"
                    placeholder="请输入天数"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col class="lastDate" :span="4">
                <el-form-item> </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-row>
                <el-col :push="2" :span="7">
                  <p class="roomTittle">房间选择：</p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :push="2" :span="20">
                  <el-table
                    stripe
                    :header-cell-style="tableStyle"
                    :data="roomTableData"
                    style="width: 100%"
                    max-height="500px"
                    show-summary
                    :summary-method="getSumMoney"
                  >
                    <el-table-column
                      align="center"
                      prop="name"
                      label="房间类型"
                    >
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="price"
                      label="房间单价(元)"
                    >
                    </el-table-column>
                    <el-table-column align="center" prop="sum" label="房间数">
                      <template slot-scope="scope">
                        <div class="roomSetting">
                          <el-button
                            icon="el-icon-minus"
                            size="mini"
                            @click="handleReduce(scope.$index, scope.row)"
                          ></el-button>
                          <el-input
                            @input="handleSum(scope.$index, scope.row)"
                            v-model="scope.row.sum"
                          >
                          </el-input>
                          <el-button
                            icon="el-icon-plus"
                            size="mini"
                            @click="handleAdd(scope.$index, scope.row)"
                          ></el-button>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="suMoney"
                      label="房间费用(元)"
                    >
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>

            </el-row>
            <el-row type="flex" style="margin-top: 20px" justify="center">
              <el-col :span="6">
                <el-form-item label="房费总金额：">
                  <el-input
                    clearable
                    v-model="formLabelAlign.count_money"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="会员卡支付：">
                  <el-select
                    v-model="formLabelAlign.is_card_pay"
                    style="width: 100%"
                  >
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="卡扣金额：">
                  <el-input
                    clearable
                    v-model="formLabelAlign.cardKkNum"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="center">
              <el-col :span="6">
                <el-form-item label="预订支付方式：" prop="paymethod">
                  <el-select
                    v-model="formLabelAlign.paymethod"
                    style="width: 100%"
                    @change="selectPay($event)"
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
              <el-col :span="6">
                <el-form-item label="预订金额：" prop="bookMoney">
                  <el-input
                    clearable
                    v-model="formLabelAlign.bookMoney"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6"> </el-col>
            </el-row>

            <el-row type="flex" style="margin-top: 20px" justify="center">
              <el-col :span="22">
                <el-form-item label="备注：">
                  <el-input
                    type="textarea"
                    v-model="formLabelAlign.beizhu"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top: 30px">
              <el-form-item>
                <el-button style="width: 100px" @click="resetForm"
                  >重置</el-button
                >
                <el-button
                  style="width: 100px"
                  size="medium"
                  @click="submitForm"
                  type="primary"
                  >确认</el-button
                >
              </el-form-item>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import { native,paymethod} from "@/api/member.js";   //国籍列表
import { roomtypeLists} from "@/api/RoomType.js"; //房间类型
import {customerType} from "@/api/RoomBooking.js";
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
      // 表单值
      tuanti:true,
      formLabelAlign: {
        clientType: "",
        groupName: "",
        nationality: "",
        cardNum: "",
        userName: "",
        userPhone: "",
        timeStart: "",
        timeEnd: "",
        remark: "",
        payWay: "",
        bookMoney: "",
        roomSumMoney: "",
        isVipPay: "",
        cardKkNum: "",
        remark: "",
      },
      // 表单label对齐方式
      labelPosition: "right",
      // 表单验证规则
      rules: {
        userName: [
          { required: true, message: "请输入预订人名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        userPhone: [{ validator: checkPhone, trigger: "blur" }],
        timeStart: [
          { required: true, message: "请选择日期", trigger: "change" },
        ],
        timeEnd: [{ required: true, message: "请选择日期", trigger: "change" }],
        payWay: [
          { required: true, message: "请选择预订支付方式", trigger: "change" },
        ],
        bookMoney: [{ validator: bookMoney, trigger: "blur" }],
      },
      // 多选框
      checked: "",
      // 表格样式
      tableStyle: {
        textAlign: "center",
      },
      // 表格对应的数据
      roomTableData: [
        {
          name: "单人间",
          price: 200,
          suMoney: 0,
          sum: 0,
        },
        {
          name: "单人间",
          price: 200,
          suMoney: 0,
          sum: 0,
        },
        {
          name: "单人间",
          price: 200,
          suMoney: 0,
          sum: 0,
        },
        {
          name: "单人间",
          price: 200,
          suMoney: 0,
          sum: 0,
        },

        {
          name: "单人间",
          price: 200,
          suMoney: 0,
          sum: 0,
        },
        {
          name: "单人间",
          price: 200,
          suMoney: 0,
          sum: 0,
        },
      ],

      // 国籍列表
      nativeList: [],
      // 支付方式
      payForForhod:[],

      //客户类型
      keHuType:[]
    };
  },
  mounted() {},
  created(){
      this.getNativeList();
      this.getPaymethodList();
      this.getRoomType();
      this.getCustomerType()
  },
  methods: {
    // 提交表单
    submitForm() {
      this.$refs.formLabelAlign.validate((valid) => {
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
      this.$refs.formLabelAlign.resetFields();
    },
    // 加，减，总
    handleAdd(i, t) {
      let roomTableData = this.roomTableData[i];
      roomTableData.sum = Number(roomTableData.sum) + 1;
      roomTableData.suMoney += roomTableData.price;
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
        roomTableData.sum -= 1;
        roomTableData.suMoney -= roomTableData.price;
      }
    },
    // 设置最后一行合计
    getSumMoney({ columns, data }) {
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 1) {
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
      if (parseInt(roomTableData.sum) == "NaN") {
        this.$message({
          message: "请输入数字",
          type: "warning",
        });
        return;
      }
      if (roomTableData.sum < 0) {
        this.$message({
          message: "输入的值不能小于0",
          type: "warning",
        });
        return;
      } else {
        roomTableData.suMoney = roomTableData.price * roomTableData.sum;
      }
    },


    //获取国籍列表
    getNativeList() {
      native().then(res => {
        res = JSON.parse(res);
        console.log(res, "获取国籍列表");
        if (res.code === 0) {
          this.nativeList = res.data.list;
        } else {
          this.message("error", res.message);
        }
      });
    },


    //选中国籍的值
    selectNative(e){
      this.formLabelAlign.nationality=e;
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

    //选中充值的方式
    selectPay(e){
      this.formLabelAlign.paymethod=e;

    },


    //获取客户类型
    getCustomerType(){
      customerType().then(res => {
        res = JSON.parse(res);
        console.log(res, "获取客户列表");
        if (res.code === 0) {
          this.keHuType = res.data;
        } else {
          this.message("error", res.message);
        }
      });
    },

    //选中充值的方式
    selectKeHuType(e){
      console.log(e)
      this.formLabelAlign.type=e;
      if(e=='散客'){
        this.tuanti=false
      }
      else{
        this.tuanti=true
      }
    },


    //获取所有房间类型
    getRoomType(){
      roomtypeLists().then(res => {
        res = JSON.parse(res);
        console.log(res, "获取所有房间类型");
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










   