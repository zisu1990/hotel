<template>
  <!-- 会员设置-->
  <el-container>
    <el-main>
      <el-form :model="BookingForm" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="会员等级：">
              <el-select v-model="BookingForm.level" placeholder="请选择">
                <el-option label="钻石会员" value="1"></el-option>
                <el-option label="黑钻会员" value="2"></el-option>
                <el-option label="白金会员" value="3"></el-option>
                <el-option label="普通会员" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div class="btn">
        <el-row>
          <el-button type="primary" @click="AddDialogVisible=true">增加</el-button>
        </el-row>
      </div>
      <el-table :data="LogTableData" style="width: 100%" border stripe>
        <el-table-column type="index" width="80" align="center"></el-table-column>

        <el-table-column prop="Name" label="会员等级名称" width="120" align="center"></el-table-column>
        <el-table-column prop="fanwei" label="等级前置条件（积分范围）" align="center"></el-table-column>
        <el-table-column prop="content" label="优惠内容" align="center"></el-table-column>
        <el-table-column prop="discount" label="享受折扣" align="center"></el-table-column>
        <el-table-column prop="time" label="录入时间" align="center"></el-table-column>
        <el-table-column prop="company" label="所属企业" align="center"></el-table-column>
        <el-table-column prop="youhui" label="优惠内容" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template>
            <el-button type="primary" size="small">修改</el-button>
            <el-button type="danger" size="small">删除</el-button>
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

      <el-dialog
        title="新增会员等级"
        :model="AddForm"
        :visible.sync="AddDialogVisible"
        width="40%"
        label-width="80px"
      >
        <el-form v-model="AddForm">
          <el-form-item label="会员等级名称：">
            <el-input v-model="AddForm.name"></el-input>
          </el-form-item>

          <el-form-item label="物件价格：">
            <el-input v-model="AddForm.price"></el-input>
          </el-form-item>

          <el-form-item label="录入时间：">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="AddForm.time"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="AddDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="AddDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>


<script>
export default {
  data() {
    return {
      BookingForm: {
        level: ""
      },
      LogTableData: [
        {
          Name: "钻石会员",
          fanwei: "0-2000",
          content: "充2000送500",
          discount: "9折",
          time: "2020-04-13 13：13",
          company: "安徽轻游信息技术有限公司",
          youhui: "充2000送500"
        },
        {
          Name: "钻石会员",
          fanwei: "0-2000",
          content: "充2000送500",
          discount: "9折",
          time: "2020-04-13 13：13",
          company: "安徽轻游信息技术有限公司",
          youhui: "充2000送500"
        },
        {
          Name: "钻石会员",
          fanwei: "0-2000",
          content: "充2000送500",
          discount: "9折",
          time: "2020-04-13 13：13",
          company: "安徽轻游信息技术有限公司",
          youhui: "充2000送500"
        }
      ],
      currentPage4: 4,
      AddForm: {
        name: "",
        price: "",
        time: ""
      },
      AddDialogVisible: false
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
  .btn {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
  }
  .el-form {
    /deep/.el-select {
      width: 300px;
    }
  }
}
</style>








   










   










   










   










   