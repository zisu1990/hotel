<template>
  <el-container>
    <el-main>
      <el-form :model="guestInfoForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="入住时间段：">
              <el-date-picker
                v-model="guestInfoForm.date"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="6">
            <el-form-item>
              <el-input
                v-model="guestInfoForm.userInfo"
                placeholder="请输入住客姓名/身份证号/房间号"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary">查询</el-button>
          </el-col>
        </el-row>
      </el-form>

      <el-table
        :data="guestInfoData"
        style="width: 100%"
        border
        stripe
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ textAlign: 'center' }"
      >
        <el-table-column type="index" width="80"></el-table-column>
        <el-table-column prop="roomType" label="房间类型"></el-table-column>
        <el-table-column prop="roomNum" label="房间号"></el-table-column>
        <el-table-column prop="roomName" label="住客姓名"></el-table-column>
        <el-table-column
          prop="cardId"
          width="140"
          label="身份证号"
        ></el-table-column>
        <el-table-column
          prop="adress"
          width="140"
          label="身份证地址"
        ></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column
          width="140"
          prop="goInTime"
          label="入住时间"
        ></el-table-column>
        <el-table-column
          width="140"
          prop="goOutTime"
          label="离店时间"
        ></el-table-column>
        <el-table-column
          width="140"
          prop="vipNum"
          label="会员卡号"
        ></el-table-column>
        <el-table-column prop="nationality" label="国籍"></el-table-column>
        <el-table-column
          prop="settingTime"
          width="140"
          label="操作时间"
        ></el-table-column>
        <el-table-column prop="settingUser" label="操作员"></el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      guestInfoForm: {
        date: "",
        userInfo: "",
      },
      guestInfoData: [
        {
          roomType: "三人间",
          roomNum: "123",
          roomName: "张三",
          cardId: "1234567890123456",
          adress: "范德萨富士达发发跨境电商范德萨发打发士大夫",
          phone: "12345678912",
          goInTime: "123456789123456789",
          goOutTime: "123456789123456789",
          vipNum: "123456789123456789",
          nationality: "中国",
          settingTime: "123456789123456789",
          settingUser: "张三",
        },
      ],
    };
  },
  methods: {
    // 分页器
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 30px;
  float: right;
}
</style>











   