<template>
  <!-- 住客查询 -->
  <el-container>
    <el-main>
      <el-form :model="BookingForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="入住时间段：">
              <el-date-picker
                v-model="BookingForm.value1"
                @change="handleChangePicker"
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
                @change="handleChangeOfTel"
                placeholder="请输入姓名/身份证号码/房间号"
                clearable
                :style="{width: '100%'}"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="searchOfTel">查询</el-button>
          </el-col>
        </el-row>
      </el-form>

      <el-table :data="BookingTableData" style="width: 100%" border stripe>
        <el-table-column type="index" width="50" align="center"></el-table-column>
        <el-table-column prop="roomtype" label="房间类型" align="center"></el-table-column>
        <el-table-column prop="room_no" label="房间号" align="center"></el-table-column>
        <el-table-column prop="name" label="住客姓名" align="center"></el-table-column>
        <el-table-column prop="zhengjian_no" label="身份证号" align="center"></el-table-column>
        <el-table-column prop="nationality" label="国籍" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" align="center"></el-table-column>
        <el-table-column prop="type" label="客户类型" align="center"></el-table-column>
        <el-table-column prop="customer_name" label="客主姓名" align="center"></el-table-column>
        <el-table-column prop="tel" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="start_time" label="入住时间"  show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="end_time" label="离店时间" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="create_time" label="操作时间" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template v-slot="scope">
            <el-tag type="success" v-if="scope.row.status==2">在店</el-tag>
            <el-tag   v-if="scope.row.status==3">离店</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="操作员" align="center"></el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      ></el-pagination>
    </el-main>
  </el-container>
</template>


<script>
import { CheckIn } from "@/api/Guest.js";
import { getAllTime } from "@/utils/moment.js";
export default {
  data() {
    return {
      BookingForm: {
        value1: [],
        name: "",
        tel: ""
      },
      BookingTableData: [
        {
          RoomType: "三人间",
          RoomNo: 8102,
          ZhuName: "张三",
          IdCard: 34088199810024569,
          PersonType: "散客",
          KeName: "王五",
          Telphone: "18256032124",
          RuTime: "2020-04-12 13:12",
          LiTime: "2020-04-13 13:12",
          Status: "在店",
          PayFor: "现金",
          ParForPrice: "2000",
          CardNum: "NO.123456789",
          Native: "中国",
          OperationTime: "2020-04-13 13:12",
          OperationPerson: "小吴"
        },
        {
          RoomType: "三人间",
          RoomNo: 8102,
          ZhuName: "张三",
          IdCard: 34088199810024569,
          PersonType: "散客",
          KeName: "王五",
          Telphone: "18256032124",
          RuTime: "2020-04-12 13:12",
          LiTime: "2020-04-13 13:12",
          Status: "在店",
          PayFor: "现金",
          ParForPrice: "2000",
          CardNum: "NO.123456789",
          Native: "中国",
          OperationTime: "2020-04-13 13:12",
          OperationPerson: "小吴"
        },
        {
          RoomType: "三人间",
          RoomNo: 8102,
          ZhuName: "张三",
          KeName: "王五",
          IdCard: 34088199810024569,
          PersonType: "散客",
          Telphone: "18256032124",
          RuTime: "2020-04-12 13:12",
          LiTime: "2020-04-13 13:12",
          Status: "在店",
          PayFor: "现金",
          ParForPrice: "2000",
          CardNum: "NO.123456789",
          Native: "中国",
          OperationTime: "2020-04-13 13:12",
          OperationPerson: "小吴"
        },
        {
          RoomType: "三人间",
          RoomNo: 8102,
          ZhuName: "张三",
          IdCard: 34088199810024569,
          PersonType: "散客",
          KeName: "王五",
          Telphone: "18256032124",
          RuTime: "2020-04-12 13:12",
          LiTime: "2020-04-13 13:12",
          Status: "在店",
          PayFor: "现金",
          ParForPrice: "2000",
          CardNum: "NO.123456789",
          Native: "中国",
          OperationTime: "2020-04-13 13:12",
          OperationPerson: "小吴"
        },
        {
          RoomType: "三人间",
          RoomNo: 8102,
          ZhuName: "张三",
          IdCard: 34088199810024569,
          PersonType: "散客",
          KeName: "王五",
          Telphone: "18256032124",
          RuTime: "2020-04-12 13:12",
          LiTime: "2020-04-13 13:12",
          Status: "在店",
          PayFor: "现金",
          ParForPrice: "2000",
          CardNum: "NO.123456789",
          Native: "中国",
          OperationTime: "2020-04-13 13:12",
          OperationPerson: "小吴"
        },
        {
          RoomType: "三人间",
          RoomNo: 8102,
          ZhuName: "张三",
          IdCard: 34088199810024569,
          PersonType: "散客",
          KeName: "王五",
          Telphone: "18256032124",
          RuTime: "2020-04-12 13:12",
          LiTime: "2020-04-13 13:12",
          Status: "在店",
          PayFor: "现金",
          ParForPrice: "2000",
          CardNum: "NO.123456789",
          Native: "中国",
          OperationTime: "2020-04-13 13:12",
          OperationPerson: "小吴"
        },
        {
          RoomType: "三人间",
          RoomNo: 8102,
          ZhuName: "张三",
          IdCard: 34088199810024569,
          PersonType: "散客",
          KeName: "王五",
          Telphone: "18256032124",
          RuTime: "2020-04-12 13:12",
          LiTime: "2020-04-13 13:12",
          Status: "在店",
          PayFor: "现金",
          ParForPrice: "2000",
          CardNum: "NO.123456789",
          Native: "中国",
          OperationTime: "2020-04-13 13:12",
          OperationPerson: "小吴"
        }
      ],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  created() {
    this.getRows();
  },
  methods: {
    getRows(start_time, end_time, keys) {
      let params = {
        page: this.pagination.currentPage,
        page_size: this.pagination.pageSize,
        start_time,
        end_time,
        keys
      };
      CheckIn(params).then(res => {
        res = typeof res == "string" ? JSON.parse(res) : res;
        console.log(res, "住客查询");
        if (res.code == 0) {
          let { data } = res;
          this.pagination.total = data.count;
          this.BookingTableData = data.list;
          // data.list.forEach(v => {
          //   v.roomtype_info;
          // });
        } else {
          this.message("error", res.message);
        }
      });
    },
    // 时间选择器change
    handleChangePicker() {
      let start = getAllTime(this.BookingForm.value1[0]);
      let end = getAllTime(this.BookingForm.value1[1]);
      if (!start || !end) {
        this.getRows();
      }
      this.getRows(start, end);
    },
    // inputChange时间
    handleChangeOfTel() {
      if (!this.BookingForm.name) {
        this.getRows();
      }
    },
    // 根据手机号查询
    searchOfTel() {
      this.getRows("", "", this.BookingForm.name);
    },

    // 分页器
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      // console.log(`每页 ${val} 条`);
      this.getRows();
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      // console.log(`当前页: ${val}`);
      this.getRows();
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








   










   