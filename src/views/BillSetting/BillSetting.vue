<template>
  <el-container v-cloak>
    <el-main>
      <el-row type="flex" justify="center">
        <el-col :span="20">
          <el-row>
            <p class="title">系统设置</p>
          </el-row>

          <el-row align="middle" type="flex" justify="start">
            1、
            <el-time-picker
              is-range
              v-model="formDevice.oneSelectDate"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            >
            </el-time-picker>
            时入住客人加
            <el-input v-model="formDevice.oneSelectPrice" clearable></el-input>
            收天房费；
          </el-row>

          <el-row align="middle" type="flex" justify="start">
            2、 退房超时
            <el-time-picker
              v-model="formDevice.twoSelectDate"
              placeholder="请选择时间"
              style="width: 180px"
            >
            </el-time-picker>
            每超过1小时加
            <el-input v-model="formDevice.twoSelectPrice" clearable></el-input>
            元房费；退房超过
            <el-time-picker
              v-model="formDevice.twoSelectDateNext"
              placeholder="请选择时间"
              style="width: 180px"
            >
            </el-time-picker>

            加收
            <el-input
              v-model="formDevice.twoSelectPriceNext"
              clearable
            ></el-input>
            天房费；
          </el-row>

          <el-row align="middle" type="flex" justify="start">
            3、当客人预交款不足
            <el-input v-model="formDevice.threeSelectDate" clearable></el-input>
            天房费时，房态表图标提示
          </el-row>

          <el-row align="middle" type="flex" justify="start">
            4、会员入住退房时间为
            <el-time-picker
              v-model="formDevice.fourSelectDate"
              placeholder="请选择时间"
              style="width: 180px"
            >
            </el-time-picker>
            3小时内每超过1小时加
            <el-input v-model="formDevice.fourSelectPrice" clearable></el-input>
            元房费；退房超过
            <el-time-picker
              v-model="formDevice.fourSelectDateNext"
              placeholder="请选择时间"
              style="width: 180px"
            >
            </el-time-picker>
            加收
            <el-input
              v-model="formDevice.fourSelectPriceNext"
              clearable
            ></el-input>
            元房费；
          </el-row>

          <el-row align="middle" type="flex" justify="start">
            5、酒店LOGO <el-button type="primary">点击上传</el-button>
          </el-row>

          <el-row align="middle" type="flex" justify="start">
            6、酒店总台电话
            <el-input
              style="width: 180px"
              clearable
              v-model="formDevice.hotelPhone"
            ></el-input>
          </el-row>

          <el-row align="middle" type="flex" justify="start">
            7、酒店业务系统自动夜审时间设置
            <el-time-picker
              v-model="formDevice.nightAuditorDate"
              placeholder="请选择时间"
            >
            </el-time-picker>
          </el-row>

          <el-row align="middle" type="flex" justify="start">
            8、酒店业务员班次设置
          </el-row>

          <el-row>
            <el-col>
              <el-table
                :data="tableData"
                :header-cell-style="{ textAlign: 'center' }"
                :cell-style="{ textAlign: 'center' }"
                style="width: 100%"
              >
                <el-table-column prop="classes" label="班次名">
                  <template v-slot="scope">
                    <el-input
                      style="width: 200px"
                      v-model="scope.row.classes"
                      placeholder="请输入班次"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="date" label="班次工作时段">
                  <template v-slot="scope">
                    <el-time-picker
                      is-range
                      v-model="scope.row.date"
                      range-separator="至"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      placeholder="选择时间范围"
                    >
                    </el-time-picker>
                  </template>
                </el-table-column>
                <el-table-column prop="setting" label="操作">
                  <template v-slot="scope">
                    <el-button
                      icon="el-icon-minus"
                      @click="reduceClass(scope)"
                    ></el-button>
                    <el-button
                      icon="el-icon-plus"
                      @click="addClass(scope)"
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>

          <el-row class="footer" type="flex" justify="center">
            <el-col>
              <el-button>取消</el-button>
              <el-button type="primary">保存</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      formDevice: {
        oneSelectDate: "",
        oneSelectPrice: "",
        twoSelectPrice: "",
        twoSelectDate: "",
        twoSelectDateNext: "",
        twoSelectPriceNext: "",
        threeSelectDate: "",
        fourSelectDate: "",
        fourSelectPrice: "",
        fourSelectDateNext: "",
        fourSelectPriceNext: "",
        hotelPhone: "123456789",
        nightAuditorDate: "",
      },
      tableData: [
        {
          classes: "123",
          date: "",
        },
      ],
    };
  },
  methods: {
    addClass(v) {
      let tableData = this.tableData;
      if (tableData.length >= 3) {
        return this.$message({
          message: "最多添加三个班次",
          type: "error",
        });
      }
      tableData.push({
        classes: "123",
        date: "",
      });
    },
    reduceClass(v) {
      let tableData = this.tableData;
      if (tableData.length <= 1) {
        return this.$message({
          message: "此班次不可删除",
          type: "error",
        });
      }
      tableData.splice(v.$index, 1);
    },
  },
};
</script>


<style lang="less" scoped>
.el-select {
  width: 90px;
}
.el-input {
  width: 100px;
}
.el-date-editor,
.el-input,
.el-select {
  margin: 0 10px;
}
.el-row.is-align-middle {
  margin-bottom: 20px;
}
.el-button {
  margin: 0 10px;
}
.footer {
  margin-top: 20px;
  .el-button {
    width: 100px;
  }
}
</style>









   