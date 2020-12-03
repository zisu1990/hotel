<template>
  <!-- 操作日志-->
  <el-container>
    <el-main>
      <el-form :model="BookingForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="操作时间段：">
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
                placeholder="请输入操作员姓名"
                clearable
                :style="{width: '100%'}"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary">查询</el-button>
          </el-col>
        </el-row>
      </el-form>

      <el-table :data="LogTableData" style="width: 100%" border stripe>
        <el-table-column type="index" width="80" align="center"></el-table-column>

        <el-table-column prop="Name" label="操作员姓名" width="120" align="center"></el-table-column>
        <el-table-column prop="Content" label="操作内容" align="center"></el-table-column>
        <el-table-column prop="IPAddress" label="操作IP地址" align="center"></el-table-column>
        <el-table-column prop="Time" label="操作时间" align="center"></el-table-column>
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
import LogList from '@/api/Log';
export default {
  data() {
    return {
      BookingForm: {
        value1: [
          new Date(2000, 10, 10, 10, 10),
          new Date(2000, 10, 11, 10, 10)
        ],
        name: ""
      },
      LogTableData: [
        {
          Name: "小吴",
          Content: "给8102客人换房至8103",
          IPAddress: "192.168.1.1",
          Time: "2020-04-13 13：13"
        },
        {
          Name: "小吴",
          Content: "给8102客人换房至8103",
          IPAddress: "192.168.1.1",
          Time: "2020-04-13 13：13"
        },
        {
          Name: "小吴",
          Content: "给8102客人换房至8103",
          IPAddress: "192.168.1.1",
          Time: "2020-04-13 13：13"
        },
        {
          Name: "小吴",
          Content: "给8102客人换房至8103",
          IPAddress: "192.168.1.1",
          Time: "2020-04-13 13：13"
        }
      ],
      currentPage4: 4
    };
  },
  methods: {
    getLogList() {
      let params = {
        page: this.pagination.currentPage,
        page_size: this.pagination.pageSize,
      };
      // roomtypeLists
      roomtypeIndex(params).then((res) => {
        console.log(res);
      });
    },
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








   










   










   