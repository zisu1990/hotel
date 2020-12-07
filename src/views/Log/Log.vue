<template>
  <!-- 操作日志-->
  <el-container>
    <el-main>
      <el-form :model="LogForm">
        <el-row>
          <el-col :span="6">
            <el-form-item label="开始时间：">
              <el-date-picker v-model="LogForm.start_time" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结束时间：">
              <el-date-picker v-model="LogForm.end_time" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-input
                v-model="LogForm.name"
                placeholder="请输入操作员姓名"
                clearable
                :style="{width: '100%'}"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="getLogList">查询</el-button>
          </el-col>
        </el-row>
      </el-form>

      <el-table :data="LogTableData" style="width: 99%" border stripe>
        <el-table-column type="index" width="80" align="center"></el-table-column>
        <el-table-column prop="name" label="操作员姓名" width="120" align="center"></el-table-column>
        <el-table-column prop="desc" label="操作内容" align="center"></el-table-column>
        <el-table-column prop="ip" label="操作IP地址" align="center"></el-table-column>
        <el-table-column prop="create_time" label="操作时间" align="center"></el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="LogForm.currentPage"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="LogForm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-main>
  </el-container>
</template>


<script>
import { Log } from "@/api/Log.js";
export default {
  data() {
    return {
      LogForm: {
        start_time: "",
        end_time: "",
        name: "",
        currentPage: 1,
        pageSize: 10,
        
      },
      LogTableData: [],
      total: 0
    };
  },
  created() {},
  methods: {
    getLogList() {
      Log(this.LogForm).then(res => {
        console.log(JSON.parse(res), "日志列表");
        // if (res.code == 0) {
        //   console.log(res.code);
        //   this.LogTableData = res.data.list;
        // }
      });
    },

    // 分页
    handleSizeChange(val) {
      this.LogForm.pageSize = val;
      this.getLogList();
    },
    handleCurrentChange(val) {
      this.LogForm.currentPage = val;
      this.getLogList();
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








   










   










   