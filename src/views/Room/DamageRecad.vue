<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :offset="3" :span="18">
          <el-row>
            <p class="title">损赔录入</p>
          </el-row>
          <el-form :rules="rules" ref="formDamageRecad" :model="formDamageRecad" label-width="130px">
            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="房号：">
                  <el-input clearable v-model="formDamageRecad.room_no" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="客户名称：">
                  <el-input clearable v-model="formDamageRecad.name" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="客户类型：">
                  <el-input clearable v-model="formDamageRecad.type" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="入住时间：">
                  <el-input clearable v-model="formDamageRecad.start_time" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="离店时间：">
                  <el-input clearable v-model="formDamageRecad.end_time" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7"></el-col>
            </el-row>

            <el-row type="flex" justify="center">
              <el-col>
                <el-table show-summary stripe :data="tableData" align="center"
                  :header-cell-style="{ textAlign: 'center' }" :cell-style="{ textAlign: 'center' }" style="width: 100%"
                  :summary-method="getSumMoney" max-height="500px">
                  <el-table-column prop="name" label="损坏物件名称">
                    <template v-slot="scope">
                      <el-select v-model="scope.row.nameVal" value-key="nameVal" @change="handleSlected(scope.row)"
                        clearable filterable>
                        <el-option v-for="item in scope.row.name" :key="item.id" :label="item.name" :value="item.name">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="num" label="数量">
                    <template v-slot="scope">
                      <el-input @change="handleInputChange(scope.row)" placeholder="请输入数量" clearable
                        v-model="scope.row.num"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="price" label="单价">
                    <template slot-scope="scope">
                      {{scope.row.price}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="money" label="损赔金额">
                    <template v-slot="scope">
                      <el-input v-model="scope.row.money" placeholder="请输入损赔金额" clearable></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="money" label="操作">
                    <template v-slot="scope">
                      <el-button icon="el-icon-delete" circle type="danger"
                        @click="handleReduce(scope.$index, scope.row)"></el-button>
                      <el-button type="primary" icon="el-icon-edit-outline" circle
                        @click="handleAdd(scope.$index, scope.row)"></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>

            <el-row type="flex" style="margin-top: 20px" justify="space-between">
              <el-col :span="7">
                <el-form-item label="应付金额">
                  <el-input disabled v-model="formDamageRecad.copeWith"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="结算方式" prop="payWay">
                  <el-select v-model="formDamageRecad.payWay" placeholder="请选择结算方式" style="width: 100%">
                    <el-option v-for="(item,index) in payForForhod" :key="index" :label="item.name" :value="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="结算金额" prop="money">
                  <el-input placeholder="请输入结算金额" v-model="formDamageRecad.money"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row style="margin-top: 30px">
              <el-form-item>
                <el-button style="width: 100px" @click="resetForm">取消</el-button>
                <el-button style="width: 100px" size="medium" type="primary" @click="submitForm">确认录入</el-button>
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
    KeSearch,
    paymethod,
    orderSunpei
  } from "@/api/DamageRecad.js";
  import {
    GoodsList
  } from "@/api/GoodsManage";
  export default {
    data() {
      var clooseMoney = (rule, value, callback) => {
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
        // 表单
        formDamageRecad: {},
        //   表单规则
        rules: {
          payWay: [{
            required: true,
            message: "请选择预订支付方式",
            trigger: "change"
          }],
          clooseMoney: [{
              required: true,
              message: "请输入结算金额",
              trigger: "blur"
            },
            {
              validator: clooseMoney,
              trigger: "blur"
            }
          ]
        },
        // 支付方式
        payForForhod: {},
        //   表格
        tableData: [{
          nameVal: "",
          name: [],
          num: "",
          price: "",
          money: ""
        }],
        // 房间id，房号
        roomInfo: {},
      };
    },
    created() {
      this.roomInfo.room_no = this.$route.query.room_no
      this.roomInfo.room_id = this.$route.query.id
      this.getKeInfo()
      this.getGoodSList()
      this.getPaymethodList()
    },
    methods: {
      // 设置最后一行合计
      getSumMoney({
        columns,
        data
      }) {
        const sums = [];
        columns.forEach((column, index) => {
          if (index !== 3) {
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
        if (sums[3] != '结算') {
          this.formDamageRecad.copeWith = sums[3]
          this.$forceUpdate()
        }
        return sums;
      },
      handleInputChange(v) {
        if (v.price) {
          v.money = v.num * v.price
          this.$forceUpdate()
        }
      },
      // 选择物件名称
      handleSlected(v) {
        if (!v.nameVal) {
          v.price = ''
          v.money = ''
          return
        }
        let nameList = v.name
        let flag = nameList.filter(item => item.name == v.nameVal)
        v.price = flag[0].price
        console.log(123)
        v.money = v.num * flag[0].price
        this.$forceUpdate()
      },
      // 查询客主信息
      getKeInfo() {
        KeSearch(this.roomInfo).then(res => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          console.log(res, "获取客主信息");
          if (res.code === 0) {
            this.formDamageRecad = res.data;
          }
        });
      },

      // 物件查询
      getGoodSList() {
        GoodsList(this.queryParmas).then(res => {
          res = JSON.parse(res);
          console.log(res, "物件列表");
          if (res.code === 0) {
            let wujian = res.data.list;
            this.tableData[0].name = wujian
            console.log(wujian)
          } else {
            this.message("error", res.message);
          }
        });
      },

      //   表单增减
      handleAdd(i, v) {
        let tableData = this.tableData;
        console.log(v)
        if (tableData.length >= 10) {
          this.$message({
            message: "最多添十个物品",
            type: "error"
          });
          return;
        }
        tableData.push({
          name: tableData[0].name,
          num: "",
          price: "",
          money: "",
          nameVal: ""
        });
      },
      handleReduce(i, v) {
        let tableData = this.tableData;
        if (tableData.length == 1) {
          this.$message({
            message: "不可删除",
            type: "error"
          });
          return;
        }
        tableData.splice(i, 1);
      },
      // // 表单input
      // handleInputNum(i, v) {
      //   let tableData = this.tableData;
      //   tableData[i].num = v;
      //   console.log(tableData);
      // },
      // 提交表单
      submitForm() {
        console.log(this.formDamageRecad)
        this.$refs.formDamageRecad.validate(valid => {
          if (valid) {
            let formDamageRecad = this.formDamageRecad
            let params = {
              room_no: formDamageRecad.room_no,
              wupin_info: this.setTable(this.tableData),
              paymethod: formDamageRecad.payWay,
              pay_money: formDamageRecad.clooseMoney,
              room_id: formDamageRecad.room_id,
              order_id: formDamageRecad.id,
              money: formDamageRecad.copeWith,
            }
            orderSunpei(params).then(res => {
              res = typeof res == "string" ? JSON.parse(res) : res;
              console.log(res)
              if (res.code == 0) {
                if(res.data){
                  this.message('success',res.message)
                }
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

      // 处理table数据
      setTable(v) {
        let str = ''
        v.forEach(item => str += `${item.nameVal},${item.num},${item.price},${item.money};`)
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
      // 重置表单
      resetForm() {
        this.$router.back(-1);
      }
    }
  };
</script>

<style lang="less" scoped>
  .el-main {
    background: #fff;
  }
</style>