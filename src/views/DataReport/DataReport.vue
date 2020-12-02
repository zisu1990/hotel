<template>
  <el-container>
    <el-main>
      <el-form :model="ReportForm" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="报表名称：">
              <el-select v-model="ReportForm.AllTable" placeholder="请选择">
                <el-option label="所有" value="1"></el-option>
                <el-option label="客房每日营收统计表" value="2"></el-option>
                <el-option label="在店客人费用统计表" value="3"></el-option>
                <el-option label="结账客人费用报表" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="起止时间段：">
              <el-date-picker
                v-model="ReportForm.time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary">查询</el-button>
          </el-col>
        </el-row>
      </el-form>

      <div class="btn">
        <el-row>
          <el-button type="primary">导出</el-button>
        </el-row>
      </div>

      <div class="tableData">
        <el-row type="flex" justify="space-between">
          <el-col :span="20">
            1.客房每日营收统计表
            <span>(2020-11-10 11:20—2020-11-11 14:00)</span>
          </el-col>
          <el-col :span="4">日期：2020-11-11 14:00</el-col>
        </el-row>
        <el-table :data="tableData" stripe style="width: 95%" border>
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
        <el-row>
          <el-col>每日房费营收合计：￥6000（现金￥2000，其他￥4000）</el-col>
        </el-row>
      </div>

      
      <div class="tableData">
        <el-row type="flex" justify="space-between">
          <el-col :span="20" >
            2.结账客人费用统计表
            <span>(2020-11-10 11:20—2020-11-11 14:00)</span>
          </el-col>
          <el-col :span="4">日期：2020-11-11 14:00</el-col>
        </el-row>
        <el-table :data="tableData" stripe style="width: 95%" border>
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
        <el-row>
          <el-col>每日房费营收合计：￥6000（现金￥2000，其他￥4000）</el-col>
        </el-row>
      </div>
      <div class="tableData">
        <el-row type="flex" justify="space-between">
          <el-col :span="20">
            3.在店客人费用统计表
            <span>(2020-11-10 11:20—2020-11-11 14:00)</span>
          </el-col>
          <el-col :span="4">日期：2020-11-11 14:00</el-col>
        </el-row>
        <el-table :data="tableData" stripe style="width: 95%" border>
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
        <el-row>
          <el-col>每日房费营收合计：￥6000（现金￥2000，其他￥4000）</el-col>
        </el-row>
      </div>

    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      ReportForm: {
        AllTable: "",
        time: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
};
</script>



<style lang="less" scoped>
.el-main {
  background: #fff;
  .btn {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
  }
  .el-form {
    /deep/.el-select {
      width: 280px;
    }
  }
  .tableData {
    margin-top: 20px;
    text-align: left;
    border-bottom: 1px solid #f3f3f3;
    padding-bottom: 10px;
    .el-table {
      margin: 15px 0;
    }
  }
}
</style>











   