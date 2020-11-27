<template>
  <el-container>
    <el-main>
      <el-form   :model="BookingForm"   >
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
            <el-form-item>
              <el-input
                v-model="BookingForm.name"
                placeholder="请输入姓名/手机号"
                clearable
                :style="{width: '100%'}"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-button type="primary">查询</el-button>
            <el-button type="success">查询所有房间的预订</el-button>
          </el-col>
        </el-row>
      </el-form>

      <el-table :data="BookingTableData" style="width: 100%" border stripe>
        <el-table-column type="index" width="30"  align="center"></el-table-column>
        <el-table-column prop="OddNumber" label="预订单号" width="100" align="center"></el-table-column>
        <el-table-column prop="PersonType" label="客户类型" width="80" align="center"></el-table-column>
        <el-table-column prop="GroupName" label="团体名称" width="80" align="center"></el-table-column>
        <el-table-column prop="Subscriber" label="预订人" width="80" align="center"></el-table-column>
        <el-table-column prop="Telphone" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="YuDaoTime" label="预到时间" align="center"></el-table-column>
        <el-table-column prop="YuLiTime" label="预离时间" align="center"></el-table-column>
        <el-table-column prop="RoomType" label="房间类型" width="80" align="center"></el-table-column>
        <el-table-column prop="Sum" label="数量" width="50" align="center"></el-table-column>
        <el-table-column prop="PayFor" label="预付方式" width="80" align="center"></el-table-column>
        <el-table-column prop="ParForPrice" label="预付金额" width="80" align="center"></el-table-column>
        <el-table-column prop="CardNum" label="会员卡号" align="center"></el-table-column>
        <el-table-column prop="Native" label="国籍" width="60" align="center"></el-table-column>
        <el-table-column prop="OperationTime" label="操作时间" align="center"></el-table-column>
        <el-table-column prop="Remarks" label="备注" align="center"></el-table-column>
        <el-table-column prop="OperationPerson" label="操作员" width="80" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template>
            <el-button type="danger" size="small">取消</el-button>
            <el-button type="primary" size="small">入住</el-button>
          </template>
        </el-table-column>
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
          OddNumber: "yd123456",
          PersonType: "散客",
          GroupName: "无",
          Subscriber: "张三",
          Telphone: "18256032124",
          YuDaoTime: "2020-04-12 13:12",
          YuLiTime: "2020-04-13 13:12",
          RoomType: "三人间",
          Sum: 1,
          PayFor: "现金",
          ParForPrice: "2000",
          CardNum: "NO.123456789",
          Native: "中国",
          OperationTime: "2020-04-13 13:12",
          Remarks: "无",
          OperationPerson: "小吴"
        },
        {
          OddNumber: "yd123456",
          PersonType: "散客",
          GroupName: "无",
          Subscriber: "张三",
          Telphone: "18256032124",
          YuDaoTime: "2020-04-12 13:12:12",
          YuLiTime: "2020-04-13 13:12:12",
          RoomType: "三人间",
          Sum: 1,
          PayFor: "现金",
          ParForPrice: "2000",
          CardNum: "NO.123456789",
          Native: "中国",
          OperationTime: "2020-04-13 13:12:12",
          Remarks: "无",
          OperationPerson: "小吴"
        },
        {
          OddNumber: "yd123456",
          PersonType: "散客",
          GroupName: "无",
          Subscriber: "张三",
          Telphone: "18256032124",
          YuDaoTime: "2020-04-12 13:12:12",
          YuLiTime: "2020-04-13 13:12:12",
          RoomType: "三人间",
          Sum: 1,
          PayFor: "现金",
          ParForPrice: "2000",
          CardNum: "NO.123456789",
          Native: "中国",
          OperationTime: "2020-04-13 13:12:12",
          Remarks: "无",
          OperationPerson: "小吴"
        }
      ],
      currentPage4: 4
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="less" scoped>
.el-main {
  background: #fff;
  .el-pagination {
    margin-top: 30px;
    float: right;
  }
}
</style>








   