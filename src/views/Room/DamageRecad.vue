<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :offset="3" :span="18">
          <el-row>
            <p class="title">损赔录入</p>
          </el-row>
          <el-form
            :rules="rules"
            ref="formDamageRecad"
            :model="formDamageRecad"
            label-width="130px"
          >
            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="房号：" prop="inputRules">
                  <el-input clearable v-model="formDamageRecad.roomCardNum"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="客户名称：">
                  <el-input clearable v-model="formDamageRecad.userName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="客户类型：">
                  <el-select v-model="formDamageRecad.clientType" style="width: 100%">
                    <el-option label="散客" value="sanke"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="入住时间：">
                  <el-date-picker
                    style="width: 100%"
                    v-model="formDamageRecad.goInTime"
                    type="datetime"
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="离店时间：">
                  <el-date-picker
                    style="width: 100%"
                    v-model="formDamageRecad.goOutTime"
                    type="datetime"
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="7"></el-col>
            </el-row>

            <el-row type="flex" justify="center">
              <el-col>
                <el-table
                  stripe
                  :data="tableData"
                  :header-cell-style="{ textAlign: 'center' }"
                  :cell-style="{ textAlign: 'center' }"
                  style="width: 100%"
                  max-height="500px"
                >
                  <el-table-column prop="name" label="损坏物件名称">
                    <template v-slot="scope">
                      <el-select
                        v-model="formDamageRecad.damageName"
                        value-key="damageName"
                        clearable
                        filterable
                      >
                        <el-option
                          v-for="item in scope.row.name"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="num" label="数量">
                    <template v-slot="scope">
                      <el-input placeholder="请输入数量" clearable v-model="scope.row.num"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="price" label="单价">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.price" placeholder="请输入单价" clearable></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="money" label="损赔金额">
                    <template v-slot="scope">
                      <el-input v-model="scope.row.money" placeholder="请输入损赔金额" clearable></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="money" label="操作">
                    <template v-slot="scope">
                      <el-button
                        icon="el-icon-delete"
                        circle
                        type="danger"
                        @click="handleReduce(scope.$index, scope.row)"
                      ></el-button>
                      <el-button
                        type="primary"
                        icon="el-icon-edit-outline"
                        circle
                        @click="handleAdd(scope.$index, scope.row)"
                      ></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>

            <el-row type="flex" style="margin-top: 20px" justify="space-between">
              <el-col :span="7">
                <el-form-item label="结算方式" prop="payWay">
                  <el-select v-model="formDamageRecad.payWay" style="width: 100%">
                    <el-option label="现金" value="xianjin"></el-option>
                    <el-option label="支付宝" value="zhifubao"></el-option>
                    <el-option label="微信" value="weixin"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="结算金额" prop="clooseMoney">
                  <el-input placeholder="请输入结算金额" v-model="formDamageRecad.clooseMoney"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7"></el-col>
            </el-row>

            <el-row style="margin-top: 30px">
              <el-form-item>
                <el-button style="width: 100px" @click="resetForm">取消</el-button>
                <el-button
                  style="width: 100px"
                  size="medium"
                  type="primary"
                  @click="submitForm"
                >确认录入</el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
    <script>
export default {
  data() {
    var inputRules = (rule, value, callback) => {
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 100);
    };
    return {
      // 表单
      formDamageRecad: {
        roomCardNum: "",
        userName: "",
        clientType: "",
        goOutTime: "",
        goInTime: "",
        damageName: ""
      },
      //   表单规则
      rules: {
        inputRules: [{ validator: inputRules, trigger: "blur" }],

        payWay: [
          { required: true, message: "请选择预订支付方式", trigger: "change" }
        ]
      },
      //   表格
      tableData: [
        {
          name: [
            {
              value: "chuifengji",
              label: "吹风机"
            },
            {
              value: "dianfengshan",
              label: "电风扇"
            },
            {
              value: "xiyiji",
              label: "洗衣机"
            },
            {
              value: "pensa",
              label: "喷洒"
            }
          ],
          num: "",
          price: 200,
          money: ""
        }
      ]
    };
  },
  methods: {
    //   表单增减
    handleAdd(i, v) {
      let tableData = this.tableData;

      if (tableData.length >= 10) {
        this.$message({
          message: "最多添十个物品",
          type: "error"
        });
        return;
      }
      tableData.push({
        name: [
          {
            value: "chuifengji",
            label: "吹风机"
          },
          {
            value: "dianfengshan",
            label: "电风扇"
          },
          {
            value: "xiyiji",
            label: "洗衣机"
          },
          {
            value: "pensa",
            label: "喷洒"
          }
        ],
        num: "",
        price: 200,
        money: ""
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
      this.$refs.formDamageRecad.validate(valid => {
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
