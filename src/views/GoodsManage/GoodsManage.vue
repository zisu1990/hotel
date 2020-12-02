<template>
  <!-- 物件管理-->
  <el-container>
    <el-main>
      <el-form :model="BookingForm">
        <el-row>
          <el-col :span="6">
            <el-form-item>
              <el-input
                v-model="BookingForm.name"
                placeholder="物件名称"
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
      <div class="btn">
        <el-row>
          <el-button type="primary" @click="AddDialogVisible=true">增加</el-button>
        </el-row>
      </div>
      <el-table :data="LogTableData" style="width: 100%" border stripe>
        <el-table-column type="index" width="80" align="center"></el-table-column>

        <el-table-column prop="Name" label="物件名称" width="120" align="center"></el-table-column>
        <el-table-column prop="Price" label="物件价格(元)" align="center"></el-table-column>
        <el-table-column prop="Time" label="录入时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template>
            <el-button type="primary" size="small" @click="EditDialogVisible=true">修改</el-button>
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



      <!-- 增加物件 -->
      <el-dialog title="增加物件" :model="AddForm"  :visible.sync="AddDialogVisible" width="30%" >
        <el-form v-model="AddForm" label-width="120px">
          <el-form-item  label="物件名称：">
            <el-input v-model="AddForm.name"></el-input>
          </el-form-item>
                  
          <el-form-item label="物件价格：">
            <el-input v-model="AddForm.price"></el-input>
          </el-form-item>
                  
          <el-form-item label="录入时间：">
             <el-input v-model="AddForm.time"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="AddDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="AddDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>




      <!-- 修改物件 -->
      <el-dialog title="修改" :model="EditForm"  :visible.sync="EditDialogVisible" width="30%" >
        <el-form v-model="AddForm" label-width="120px">
          <el-form-item  label="物件名称：">
            <el-input v-model="EditForm.name"></el-input>
          </el-form-item>
                  
          <el-form-item label="物件价格：">
            <el-input v-model="EditForm.price"></el-input>
          </el-form-item>
                  
          <el-form-item label="录入时间：">
            <el-input v-model="EditForm.time"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="EditDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="EditDialogVisible = false">确 定</el-button>
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
        name: ""
      },
      LogTableData: [
        {
          Name: "吹风机",
          Price: 60,
          IPAddress: "192.168.1.1",
          Time: "2020-04-13 13:13"
        },
        {
          Name: "电视机",
          Price: 3900,
          IPAddress: "192.168.1.1",
          Time: "2020-04-13 13:13"
        },
        {
          Name: "茶杯",
          Price: 120,
          IPAddress: "192.168.1.1",
          Time: "2020-04-13 13:13"
        }
      ],
      currentPage4: 4,
      AddForm:{
        name:'',
        price:'',
        time:'2020-04-13 13:13'
      },
      AddDialogVisible:false,

      //修改
      EditDialogVisible:false,
       EditForm:{
        name:'电吹风',
        price:'60',
        time:'2020-04-13 15:13'
      },
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
}
</style>








   










   










   










   