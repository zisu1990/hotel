<template>
  <!-- 会员设置-->
  <el-container>
    <el-main>
      <el-form :model="memberForm" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="会员等级：">
              <el-select v-model="memberForm.level" placeholder="请选择">
                  <el-option
                    v-for="(item,index) in memberlevel"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
      <!-- <div class="btn">
        <el-row>
          <el-button type="primary" @click="AddDialogVisible=true">增加</el-button>
        </el-row>
      </div>-->
      <el-table :data="memberTableData" style="width: 100%" border stripe>
        <el-table-column type="index" width="80" align="center"></el-table-column>

        <el-table-column prop="name" label="会员等级名称" width="120" align="center"></el-table-column>
        <el-table-column  label="等级前置条件（积分范围）" align="center">
          <template  v-slot ="scope">
              {{scope.row.integral_start}}{{scope.row.integral_end}}
          </template>
        </el-table-column>
        <el-table-column prop="company_name" label="所属企业" align="center"></el-table-column>
        <el-table-column prop="discount" label="享受折扣" align="center"></el-table-column>
        <el-table-column prop="create_time" label="录入时间" align="center"></el-table-column>
        <el-table-column prop="res" label="优惠内容" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template>
            <el-button type="primary" size="small" @click="editdialogVisible=true">设置</el-button>
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

      <el-dialog title="新增会员等级" :model="AddForm" :visible.sync="editdialogVisible" width="30%">
        <el-form v-model="AddForm" label-width="120px">
          <el-form-item label="会员等级名称：">
            <el-input v-model="AddForm.name" disabled></el-input>
          </el-form-item>

          <el-form-item label="会员等级名称：">
            <el-input v-model="AddForm.level" disabled></el-input>
          </el-form-item>
          <el-form-item label="所属企业：">
            <el-input v-model="AddForm.company" disabled></el-input>
          </el-form-item>
          <el-form-item label="享受折扣：">
            <el-row>
              <el-col :span="6">
                <el-input v-model="AddForm.discount"></el-input>
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
                <el-input v-model="AddForm.chong"></el-input>
              </el-col>
              <el-col :span="2">
                <span>送</span>
              </el-col>
              <el-col :span="6">
                <el-input v-model="AddForm.song"></el-input>
              </el-col>
              <el-col :span="2">
                <i class="el-icon-remove"></i>
              </el-col>
              <el-col :span="2">
                <i class="el-icon-circle-plus"></i>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="录入时间：">
            <el-input v-model="AddForm.time"></el-input>
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
import {memberlevel} from "@/api/member.js";
export default {
  data() {
    return {
      memberForm: {
        level: ""
      },
      // 会员等级列表
      memberlevel: [],



      memberTableData: [

      ],
      currentPage4: 4,
      AddForm: {
        name: "钻石会员",
        level: "2001-4000分",
        company: "安徽轻游信息技术有限公司",
        chong: "",
        song: "",
        discount: ""
      },
      editdialogVisible: false
    };
  },

  created(){
    this.getMemberLevel()
  },
  methods: {

    // 获取会员等级列表
    getMemberLevel() {
      
      memberlevel().then(res => {
        res = JSON.parse(res);
        console.log(res, "获取会员等级列表");
        if (res.code === 0) {
          this.memberlevel = res.data;
          this.memberTableData=res.data;
        } else {
          this.message("error", res.message);
        }
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








   










   










   










   










   