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
        <el-table-column
          prop="serialNum"
          width="80"
          label="序号"
        ></el-table-column>
        <el-table-column
          prop="roomType"
          width="100"
          label="房间类型"
        ></el-table-column>
        <el-table-column
          prop="roomNum"
          width="100"
          label="房间号"
        ></el-table-column>
        <el-table-column
          prop="roomName"
          width="100"
          label="住客姓名"
        ></el-table-column>
        <el-table-column
          prop="cardId"
          width="150"
          label="身份证号"
        ></el-table-column>
        <el-table-column
          prop="adress"
          width="200"
          label="身份证地址"
        ></el-table-column>
        <el-table-column
          width="150"
          prop="phone"
          label="联系电话"
        ></el-table-column>
        <el-table-column
          width="150"
          prop="goInTime"
          label="入住时间"
        ></el-table-column>
        <el-table-column
          width="150"
          prop="goOutTime"
          label="离店时间"
        ></el-table-column>
        <el-table-column
          width="150"
          prop="vipNum"
          label="会员卡号"
        ></el-table-column>
        <el-table-column
          prop="nationality"
          width="80"
          label="国籍"
        ></el-table-column>
        <el-table-column prop="settingTime" label="操作时间"></el-table-column>
        <el-table-column
          prop="settingUser"
          width="80"
          label="操作员"
        ></el-table-column>
      </el-table>
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
          serialNum: "123",
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
};
</script>










   