<template>
  <el-container>
    <el-main>
      <el-form ref="BookingForm" :model="BookingForm" :rules="BookingRef" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="预订时间段：">
              <el-date-picker
                v-model="BookingForm.value1"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="姓名：">
              <el-input
                v-model="BookingForm.name"
                placeholder="请输入姓名"
                clearable
                :style="{width: '100%'}"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="电话：">
              <el-input
                v-model="BookingForm.tel"
                placeholder="请输入联系电话"
                clearable
                :style="{width: '100%'}"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary">查询</el-button>
            <el-button type="success">查询所有房间的预订</el-button>
          </el-col>
        </el-row>
      </el-form>

      <el-table :data="BookingTableData" style="width: 100%" border>
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
    </el-main>
  </el-container>
</template>


<script>
export default {
  data() {
    return {
      BookingForm: {
        value1: [
          new Date(2000, 10, 10, 10, 10),
          new Date(2000, 10, 11, 10, 10)
        ],
        name: "",
        tel: ""
      },
    BookingTableData: [
        {
          roomNum: 8102,
          name: "张三",
          sex: "男",
          cardType: "身份证",
          address: "安徽省合肥市滨湖新区西藏路"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.el-main {
  background: #fff;
}
</style>








   