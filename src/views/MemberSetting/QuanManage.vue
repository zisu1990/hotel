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
        <el-table-column prop="status" label="状态" align="center">
          <template v-slot="scope">
            <el-switch
              active-color="#13ce66"
              inactive-color="#999"
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template>
            <el-button type="danger" size="small">删除</el-button>
            <el-button type="primary" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="设置优惠条件" :visible.sync="AddDialogVisible" width="30%">
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
                <i class="el-icon-remove" style="font-size:20px; color:red; cursor: pointer;" v-show="index>0" @click="handleDel(index)"></i>
              </el-col>
              <el-col :span="2">
                <i class="el-icon-circle-plus" style="font-size:20px; color:#409EFF; cursor: pointer;" @click="handlePlus"></i>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="AddDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitAdd()">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>


<script>
import { memberDiscountList,memberDiscountAdd} from "@/api/member.js";
export default {
  data() {
    return {
      memberTableData: [],
      page:1,
      page_size:1,
      AddDialogVisible:false,

      AddForm:{
        info:[
            {
            money:'',
            give_money:''
           }
        ]
      },

      discountnfo:"1000,100;2000,200"
  }
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
        } else {
          this.message("error", res.message);
        }
      });
    },

  
    HandleAddDialog(){
      this.AddDialogVisible=true;
    },

    handlePlus(){
      this.AddForm.info.push({
        money:'',
        give_money:''
      })
    },

    handleDel(index){
      if(index>=0){
         this.AddForm.info.splice(index,1)
      }
    },

    submitAdd(){
     
        memberDiscountAdd({info:this.discountnfo}).then(res => {
        res = JSON.parse(res);
        console.log(res, "新增");
        // if (res.code === 0) {
          
        // } else {
        //   this.message("error", res.message);
        // }
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








   










   










   










   










   