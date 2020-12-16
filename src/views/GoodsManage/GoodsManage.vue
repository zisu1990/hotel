<template>
  <!-- 物件管理-->
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="6">
          <el-input
            v-model="queryParmas.name"
            placeholder="物件名称"
            clearable
            :style="{width: '100%'}"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="getGoodSList()">查询</el-button>
        </el-col>
      </el-row>

      <div class="btn">
        <el-row>
          <el-button type="primary" @click="HandleAddDialog">增加</el-button>
        </el-row>
      </div>
      <el-table :data="GoodsTableData" style="width: 100%" border stripe>
        <el-table-column type="index" width="80" align="center"></el-table-column>

        <el-table-column prop="name" label="物件名称" width="120" align="center"></el-table-column>
        <el-table-column prop="price" label="物件价格(元)" align="center"></el-table-column>
        <el-table-column prop="create_time" label="录入时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template v-slot="scope">
            <el-button type="primary" size="small" @click="HandleEditDialog(scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="handelDel(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.queryParmas.page"
        :page-sizes="[5, 10, 20, 30,50,100]"
        :page-size="this.queryParmas.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 增加物件 -->
      <el-dialog title="增加物件" :model="AddForm" :visible.sync="AddDialogVisible" width="30%">
        <el-form v-model="AddForm" label-width="120px">
          <el-form-item label="物件名称：">
            <el-input v-model="AddForm.name"></el-input>
          </el-form-item>

          <el-form-item label="物件价格：">
            <el-input v-model="AddForm.price"></el-input>
          </el-form-item>

 
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="AddDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="AddSubmit()">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改物件 -->
      <el-dialog title="修改" :model="EditForm" :visible.sync="EditDialogVisible" width="30%">
        <el-form v-model="AddForm" label-width="120px">
          <el-form-item label="物件名称：">
            <el-input v-model="EditForm.name"></el-input>
          </el-form-item>

          <el-form-item label="物件价格：">
            <el-input v-model="EditForm.price"></el-input>
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="EditDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="EditSubmit">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>


<script>
import { GoodsList,GoodsAdd,GoodsEdit,GoodsDel } from "@/api/GoodsManage";
export default {
  data() {
    return {
      queryParmas: {
        name: "",
        page: 1,
        page_size: 10
        
      },
      total:0,
      GoodsTableData: [],
   
      AddForm: {
        name: "",
        price: "",
      },
      AddDialogVisible: false,

      //修改
      EditDialogVisible: false,
      EditForm: {
        id:'',
        name: "电吹风",
        price: "60",
        
      }
    };
  },
  created(){
    this.getGoodSList()
  },
  methods: {
    // 物件查询
    getGoodSList() {
      GoodsList(this.queryParmas).then(res => {
        res = JSON.parse(res);
        console.log(res, "物件列表");
        if (res.code === 0) {
          this.GoodsTableData = res.data.list;
          this.total=res.data.count;
        } else {
          this.message("error", res.message);
        }
      });
    },

    //物件新增
    HandleAddDialog(){
      this.AddDialogVisible=true;
    },

    AddSubmit(){
      GoodsAdd(this.AddForm).then(res => {
        res = JSON.parse(res);
        console.log(res, "物件新增");
        if (res.code === 0) {
          this.getGoodSList()
          this.AddDialogVisible=false;
          this.AddForm={}
        } else {
          this.message("error", res.message);
        }
      });
    },

    //物件编辑
    HandleEditDialog(row){
      console.log(row)
      this.EditDialogVisible=true;
      this.EditForm.name=row.name;
      this.EditForm.price=row.price;
      this.EditForm.id=row.id;
    },

    EditSubmit(){
      GoodsEdit(this.EditForm).then(res => {
        res = JSON.parse(res);
        console.log(res, "物件修改");
        if (res.code === 0) {
          this.message("success", "修改成功");
          this.getGoodSList()
          this.EditDialogVisible=false;
          
        } else {
          this.message("error", res.message);
        }
      });
    },


    //物件删除
     
      handelDel(id) {
        this.confirm()
          .then(() => {
            GoodsDel({
              id
            }).then((res) => {
              res = JSON.parse(res);
              if (res.code === 0) {
                this.getGoodSList();
                this.message("success", "删除成功");
              } else {
                this.message("error", res.message);
              }
            });
          })
          .catch(() => {});
      },



    handleSizeChange(val) {
      this.queryParmas.page_size=val;
       this.getGoodSList()
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.queryParmas.page=val;
       this.getGoodSList()
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
}
</style>








   










   










   










   