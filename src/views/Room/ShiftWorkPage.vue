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
                  <el-input
                    clearable
                    v-model="formShifWorkPage.shifUserName"
                  ></el-input>
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
        newOnStartTime:"",
      },
    };
  },
};
</script>