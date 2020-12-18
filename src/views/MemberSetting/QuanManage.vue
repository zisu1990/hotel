<template>
  <!--会员充值优惠设置-->
  <el-container>
    <el-main>
      <div class="btn">
        <el-row>
          <el-button type="primary" @click="HandleAddDialog">新增充值优惠</el-button>
        </el-row>
      </div>
      <el-table :data="memberTableData" style="width: 100%" border stripe>
        <el-table-column type="index" width="80" align="center"></el-table-column>
        <el-table-column label="优惠内容" align="center">
          <template v-slot="scope">充{{scope.row.money}}元，送{{scope.row.give_money}}元</template>
        </el-table-column>
        <el-table-column prop="company_name" label="所属企业" align="center"></el-table-column>
        <el-table-column prop="create_time" label="录入时间" align="center"></el-table-column>

        <el-table-column label="操作" align="center" width="200">
          <template v-slot="scope">
            <el-button type="danger" size="small" @click="handleDel(scope.row.id)">删除</el-button>
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30,50,100]"
        :page-size="page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <el-dialog title="新增设置优惠条件" :visible.sync="AddDialogVisible" width="30%">
        <el-form v-model="AddForm" label-width="120px">
          <el-form-item label="充值优惠：">
            <el-row v-for="(item,index) in AddForm.info" :key="index">
              <el-col :span="2">
                <span>充</span>
              </el-col>
              <el-col :span="6">
                <el-input v-model="item.money"></el-input>
              </el-col>
              <el-col :span="2">
                <span>送</span>
              </el-col>
              <el-col :span="6">
                <el-input v-model="item.give_money"></el-input>
              </el-col>
              <el-col :span="2">
                <i
                  class="el-icon-remove"
                  style="font-size:20px; color:red; cursor: pointer;"
                  v-show="index>0"
                  @click="handleDel(index)"
                ></i>
              </el-col>
              <el-col :span="2">
                <i
                  class="el-icon-circle-plus"
                  style="font-size:20px; color:#409EFF; cursor: pointer;"
                  @click="handlePlus"
                ></i>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="AddDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitAdd()">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="编辑优惠条件" :visible.sync="EditDialogVisible" width="30%">
        <el-form v-model="Editform" label-width="120px">
          <el-form-item label="充值优惠：">
            <el-row>
              <el-col :span="2">
                <span>充</span>
              </el-col>
              <el-col :span="6">
                <el-input v-model="Editform.money"></el-input>
              </el-col>
              <el-col :span="2">
                <span>送</span>
              </el-col>
              <el-col :span="6">
                <el-input v-model="Editform.give_money"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="EditDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitEdit()">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>


<script>
import {
  memberDiscountList,
  memberDiscountAdd,
  memberDiscountDel,
  memberDiscountEdit
} from "@/api/member.js";
export default {
  data() {
    return {
      memberTableData: [],
      page: 1,
      page_size: 10,
      total: 0,
      AddDialogVisible: false,
      EditDialogVisible:false,
      AddForm: {
        info: [
          {
            money: "",
            give_money: ""
          }
        ]
      },

      Editform:{
        money:'',
        give_money:'',
      },


      id:''
    };
  },
  created() {
    this.getMemberDiscount();
  },
  methods: {
    // 会员等级列表
    getMemberDiscount() {
      let params = {
        page: this.page,
        page_size: this.page_size
      };
      memberDiscountList(params).then(res => {
        res = JSON.parse(res);
        console.log(res, "获取充值列表");
        if (res.code === 0) {
          this.memberTableData = res.data.list;
          this.total = res.data.count;
        } else {
          this.message("error", res.message);
        }
      });
    },

    HandleAddDialog() {
      this.AddDialogVisible = true;
    },

    handlePlus() {
      this.AddForm.info.push({
        money: "",
        give_money: ""
      });
    },

    handleDel(index) {
      if (index >= 0) {
        this.AddForm.info.splice(index, 1);
      }
    },

    // 分页
    handleSizeChange(val) {
      // console.log(val);
      this.page_size = val;
      this.getMemberDiscount();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getMemberDiscount();
    },

    // 提交确定
    submitAdd() {
      let str = "";
      this.AddForm.info.forEach(item => {
        str += `${item.money},${item.give_money};`;
        str = str.substring(0, str.length - 1);
        // console.log(str)
        return str;
      });
      memberDiscountAdd({ info: str }).then(res => {
        res = JSON.parse(res);
        console.log(res, "新增");
        if (res.code === 0) {
          this.message("success", res.message);
          this.AddDialogVisible = false;
          this.getMemberDiscount();
        } else {
          this.message("error", res.message);
        }
      });
    },

    // 删除
    handleDel(id) {
      this.confirm()
        .then(() => {
          memberDiscountDel({ id }).then(res => {
            res = JSON.parse(res);
            if (res.code === 0) {
              this.getMemberDiscount();
              this.message("success", "删除成功");
            } else {
              this.message("error", res.message);
            }
          });
        })
        .catch(() => {});
    },

    // 编辑
    handleEdit(row){
      this.EditDialogVisible=true;
      this.Editform.money=row.money;
      this.Editform.give_money=row.give_money
      this.id=row.id
    },



    submitEdit(){
      let params={
        id:this.id,
        money:this.Editform.money,
        give_money:this.Editform.give_money
      }
       memberDiscountEdit(params).then(res => {
            res = JSON.parse(res);
            if (res.code === 0) {
              this.EditDialogVisible=false;
              this.getMemberDiscount();
              this.message("success", "编辑成功");
            } else {
              this.message("error", res.message);
            }
          });
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








   










   










   










   










   