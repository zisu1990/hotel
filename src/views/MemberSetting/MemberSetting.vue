<template>
  <!-- 会员设置-->
  <el-container>
    <el-main>
      <el-form :model="memberFormSearch" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="会员等级：">
              <el-select
                v-model="memberFormSearch.level"
                placeholder="请选择"
                @change="selectLevel($event)"
              clearable
              >
                <el-option
                  v-for="(item,index) in memberlevel"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
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
          <el-button type="primary" @click="AddDialogVisible=true">充值优惠设置</el-button>
        </el-row>
      </div> -->
      <el-table :data="memberTableData" style="width: 100%" border stripe>
        <el-table-column type="index" width="80" align="center"></el-table-column>

        <el-table-column prop="name" label="会员等级名称" width="120" align="center"></el-table-column>
        <el-table-column label="等级前置条件（积分范围）" align="center">
          <template v-slot="scope">{{scope.row.integral_start}}-{{scope.row.integral_end}}</template>
        </el-table-column>
        <el-table-column prop="company_name" label="所属企业" align="center"></el-table-column>
        <el-table-column prop="discount" label="享受折扣" align="center"></el-table-column>
        <el-table-column prop="create_time" label="录入时间" align="center"></el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>


<script>
import { memberlevel, memberLevelList } from "@/api/member.js";
export default {
  data() {
    return {
      memberFormSearch: {
        level: "",
        page_size: 1,
        page: 1
      },
      id: "",
     
      // 会员等级列表
      memberlevel: [],
      memberTableData: [],
    };
  },

  created() {
    this.getMemberLevel();
    
  },
  methods: {
    // 会员等级列表
    getMemberLevel() {
      let params = {
        page: this.memberFormSearch.page,
        page_size: this.memberFormSearch.page_size,
        
      };
      memberlevel(params).then(res => {
        res = JSON.parse(res);
        console.log(res, "获取会员等级列表");
        if (res.code === 0) {
          this.memberlevel = res.data;
          this.memberTableData = res.data;
          
        } else {
          this.message("error", res.message);
        }
      });
    },

    selectLevel(e) {
      let params = {
        page: this.memberFormSearch.page,
        page_size: this.memberFormSearch.page_size,
        id: e
      };
      memberLevelList(params).then(res => {
        res = JSON.parse(res);
        console.log(res, "查询等级列表");
        if (res.code === 0) {
          this.memberTableData = res.data.list;
          if(!this.memberFormSearch.level){
            this.getMemberLevel()
          }
          this.total = res.data.count;
          
        } else {
          this.message("error", res.message);
        }
      });
    },


 

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








   










   










   










   










   