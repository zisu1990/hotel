<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :offset="3" :span="18">
          <el-row>
            <p class="title">换班结算</p>
          </el-row>

          <el-form
            ref="formShifWorkPage"
            :model="formShifWorkPage"
            label-width="130px"
          >
            <el-row type="flex" justify="space-between">
              <el-col :span="6">
                <el-form-item label="交班人：">
                  <el-select
                    v-model="formShifWorkPage.shifUserName"
                    value-key="damageName"
                    clearable
                    filterable
                  >
                    <el-option
                      label="张三"
                      key="zhangsan"
                      value="zhangsan"
                    ></el-option>
                    <el-option label="李四" key="lisi" value="lisi"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="接班现金额(元)：">
                  <el-input
                    clearable
                    v-model="formShifWorkPage.carryOnMoney"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="原接班时间：">
                  <el-date-picker
                    v-model="formShifWorkPage.oldOnStartTime"
                    placeholder="请选择原接班时间"
                    type="datetime"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="6">
                <el-form-item label="交班时间：">
                  <el-date-picker
                    v-model="formShifWorkPage.newOnStartTime"
                    placeholder="请选择交班时间："
                    type="datetime"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6"> </el-col>
              <el-col :span="6"> </el-col>
            </el-row>

            <el-row>
              <el-col :span="5"><p class="roomTittle">交班明细</p> </el-col>
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
                  <el-table-column label="房号"> </el-table-column>
                  <el-table-column label="客户名称"> </el-table-column>
                  <el-table-column label="入住时间"> </el-table-column>
                  <el-table-column label="离店时间"> </el-table-column>
                  <el-table-column label="支付方式"> </el-table-column>
                  <el-table-column label="金额"> </el-table-column>
                  <el-table-column label="房费"> </el-table-column>
                  <el-table-column label="实际房费"> </el-table-column>
                  <el-table-column label="物损费用"> </el-table-column>
                  <el-table-column label="会员储值"> </el-table-column>
                  <el-table-column label="押金"> </el-table-column>
                  <el-table-column label="已退金额"> </el-table-column>
                  <el-table-column label="退款方式"> </el-table-column>
                </el-table>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="5"><p class="roomTittle">交班统计</p> </el-col>
            </el-row>
            <el-row type="flex" justify="center" style="margin-bottom: 20px">
              <el-col>
                <el-table
                  stripe
                  :data="tableData"
                  :header-cell-style="{ textAlign: 'center' }"
                  :cell-style="{ textAlign: 'center' }"
                  style="width: 100%"
                  max-height="500px"
                >
                  <el-table-column label="类目"> </el-table-column>
                  <el-table-column label="收入现金金额"> </el-table-column>
                  <el-table-column label="其他收入金额"> </el-table-column>
                  <el-table-column label="房费"> </el-table-column>
                  <el-table-column label="押金"> </el-table-column>
                  <el-table-column label="会员充值额"> </el-table-column>
                  <el-table-column label="物损金额"> </el-table-column>
                  <el-table-column label="现金退押"> </el-table-column>
                  <el-table-column label="其他退押"> </el-table-column>
                </el-table>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="6">
                <el-form-item label="接班人：">
                  <el-select
                    v-model="formShifWorkPage.userOnName"
                    clearable
                    filterable
                  >
                    <el-option
                      label="张三"
                      key="zhangsan"
                      value="zhangsan"
                    ></el-option>
                    <el-option label="李四" key="lisi" value="lisi"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="接班现金额(元)：">
                  <el-input
                    clearable
                    v-model="formShifWorkPage.userOnMoney"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="原接班时间：">
                  <el-date-picker
                    v-model="formShifWorkPage.settingTime"
                    placeholder="请选择原接班时间"
                    type="datetime"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row style="margin-top: 30px">
              <el-form-item>
                <el-button style="width: 100px">暂不打印</el-button>
                <el-button style="width: 100px" size="medium" type="success"
                  >打印</el-button
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
export default {
  data() {
    return {
      formShifWorkPage: {
        shifUserName: "",
        carryOnMoney: "",
        oldOnStartTime: "",
        newOnStartTime: "",
        userOnName: "",
        userOnName: "",
        userOnMoney: "",
        settingTime: "",
      },

      //   表格
      tableData: [],
    };
  },
};
</script>
<style lang="less" scoped>
.el-main {
  background: #fff;
}
.roomTittle {
  font-size: 18px;
  text-align: left;
  color: #005ab9;
  margin: 20px 0 10px 0;
}
</style>

