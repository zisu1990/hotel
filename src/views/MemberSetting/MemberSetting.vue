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
          <!-- <el-col :span="2">
            <el-button type="primary">查询</el-button>
          </el-col>-->
        </el-row>
      </el-form>
      <!-- <div class="btn">
        <el-row>
          <el-button type="primary" @click="AddDialogVisible=true">增加</el-button>
        </el-row>
      </div>-->
      <el-table :data="LogTableData" style="width: 100%" border stripe>
        <el-table-column type="index" width="80" align="center"></el-table-column>

        <el-table-column prop="Name" label="会员等级名称" width="120" align="center"></el-table-column>
        <el-table-column prop="fanwei" label="等级前置条件（积分范围）" align="center"></el-table-column>
        <el-table-column prop="company" label="所属企业" align="center"></el-table-column>
        <el-table-column prop="discount" label="享受折扣" align="center"></el-table-column>
        <el-table-column prop="time" label="录入时间" align="center"></el-table-column>
        <el-table-column prop="youhui" label="优惠内容" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template v-slot="scope">
            <el-button type="primary" size="small" @click="editDialog(scope.row)">设置</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="memberFormSearch.page"
        :page-sizes="[10, 20, 30, 40,50,100]"
        :page-size="memberFormSearch.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <el-dialog title="设置优惠条件" :visible.sync="editdialogVisible" width="30%">
        <el-form v-model="setForm" label-width="120px">
          <el-form-item label="会员等级名称：">
            <el-input v-model="setForm.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="所属企业：">
            <el-input v-model="setForm.company_name" disabled></el-input>
          </el-form-item>
          <el-form-item label="享受折扣：">
            <el-row>
              <el-col :span="6">
                <el-input v-model="setForm.discount"></el-input>
              </el-col>
              <el-col :span="2">
                <span>折</span>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="充值优惠：">
            <el-row>
              <el-col :span="2">
                <span>充</span>
              </el-col>
              <el-col :span="6">
                <el-input v-model="setForm.chong"></el-input>
              </el-col>
              <el-col :span="2">
                <span>送</span>
              </el-col>
              <el-col :span="6">
                <el-input v-model="setForm.song"></el-input>
              </el-col>
              <el-col :span="2">
                <i class="el-icon-remove"></i>
              </el-col>
              <el-col :span="2">
                <i class="el-icon-circle-plus"></i>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="editdialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editdialogVisible = false">确 定</el-button>
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
          discount: "9折",
          time: "2020-04-13 13:13",
          company: "安徽轻游信息技术有限公司",
          youhui: "充2000送500;充1000送50"
        },
        {
          Name: "白金会员",
          fanwei: "0-2000",

          discount: "9折",
          time: "2020-04-13 13:13",
          company: "安徽轻游信息技术有限公司",
          youhui: "充2000送500"
        },
        {
          Name: "黑钻会员",
          fanwei: "0-2000",

          discount: "9折",
          time: "2020-04-13 13:13",
          company: "安徽轻游信息技术有限公司",
          youhui: "充2000送500"
        }
      ],
      currentPage4: 4,
      AddForm: {
        name: "钻石会员",
        level: "2001-4000分",
        company: "安徽轻游信息技术有限公司",
        chong: "",
        song: "",
        discount: "",
       
      },
      editdialogVisible: false
    };
  },
  methods: {
    handleSizeChange(val) {
      this.memberFormSearch.page_size = val;
      this.memberLevelList();
    },
    handleCurrentChange(val) {
      this.memberFormSearch.page = val;
      this.memberLevelList();
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
  .el-dialog {
    .el-form {
      /deep/.el-select {
        width: 415px;
      }
    }
  }
  /deep/.el-dialog__footer {
    text-align: center;
  }
}
</style>








   










   










   










   










   