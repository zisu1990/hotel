<template>
  <el-container v-cloak>
    <el-main>
      <el-row>
        <el-col :offset="3" :span="18">
          <el-row>
            <p class="title">系统设置</p>
          </el-row>

          <el-row align="middle" type="flex" justify="start">
            1、
            <el-time-picker
              is-range
              v-model="oneSelectDate"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            >
            </el-time-picker>
            时入住客人加
            <el-select v-model="formDevice.oneSelectPrice" placeholder="请选择">
              <el-option
                v-for="item in selectDate"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            收天房费；
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
      selectDate: [
        {
          value: "选项1",
          label: "0.5",
        },
        {
          value: "选项2",
          label: "1",
        },
        {
          value: "选项3",
          label: "3",
        },
        {
          value: "选项4",
          label: "5",
        },
        {
          value: "选项5",
          label: "6",
        },
      ],
      formDevice: {
        oneSelectDate: "",
        oneSelectPrice: "",
      },
    };
  },
};
</script>


<style lang="less" scoped>
.el-select {
  width: 15%;
  margin: 0 10px;
}
.el-date-editor {
  width: 15%;
  margin: 0 10px;
}
</style>







   