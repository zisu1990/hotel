<template>
  <!-- 操作日志-->
  <el-container>
    <el-main>
      <el-form :model="LogForm">
        <el-row>
            <el-col :span="8">
            <el-form-item label="入住时间段：">
              <el-date-picker
                v-model="LogForm.value1"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="getTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="6">
            <el-form-item>
              <el-input
                v-model="LogForm.name"
                placeholder="请输入住客姓名/身份证号/房间号"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="getLogList()">查询</el-button>
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
import { getAllTime, getDayTime } from "@/utils/moment.js";
export default {
  data() {
    return {
      LogForm: {
        value1:[],
        name: "",
        currentPage: 1,
        pageSize: 10,
        
      },
      LogTableData: [],
      total: 0,
            start_time: "",
      end_time: "",
    };
  },
  created() {
    this.getLogList()
  },
  methods: {
    // 获取时间
    getTime() {
      console.log(this.LogForm.value1);
      this.start_time = getAllTime(this.LogForm.value1[0]);
      this.end_time = getAllTime(this.LogForm.value1[1]);
      console.log(this.start_time);
      console.log(this.end_time);
    },
    getLogList() {
        let params = {
          name:this.LogForm.name,
        start_time: this.start_time,
        end_time: this.end_time,
        page: this.LogForm.currentPage,
        page_size: this.LogForm.pageSize,
      }
      Log(params).then(res => {
         res = typeof res == "string" ? JSON.parse(res) : res;
        console.log(res, "日志列表");
        if (res.code === 0) {
          this.LogTableData = res.data.list;
          this.total=res.data.count;
        } else {
          this.message("error", res.message);
        }
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








   










   










   