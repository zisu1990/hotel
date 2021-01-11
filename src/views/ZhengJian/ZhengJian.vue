<template>
  <el-container>
    <el-main>
      <!-- <el-row style="margin-bottom: 20px"> 
        <el-col :span="6">
          <el-input v-model="name" @change="handleInput" clearable placeholder="请输入报表名称"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-col>
      </el-row>-->

      <el-row type="flex" justify="start">
        <el-button @click="handleClientType" type="primary">新增</el-button>
      </el-row> 

      <el-table :data="tableClienType" stripe style="width: 100%" border>
        <el-table-column type="index" width="50" align="center"></el-table-column>
        <el-table-column prop="name" label="证件名称" align="center"></el-table-column>
        <el-table-column prop="create_time" label="操作时间" align="center"></el-table-column>
        <el-table-column prop="username" label="操作人" align="center"></el-table-column>
        <el-table-column align="center" v-slot="scope" label="操作">
          <el-button size="mini" @click="showDialogEdit(scope)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </el-table-column>
      </el-table>

      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      ></el-pagination> -->

      <!-- 增加编辑证件 -->
      <el-dialog
        :title="dialogTittle"
        :visible.sync="dialogVisible"
        @closed="cleranFormPayType"
        width="28%"
      >
        <el-row type="flex" justify="center">
          <el-col :span="18">
            <el-form :rules="rules" :model="formClienType" ref="formClienType" label-width="100px">
              <el-form-item prop="name" label="证件名称">
                <el-input clearable v-model="formClienType.name" placeholder="请输入证件名称"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleRoom">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script>
import {
  zhengJianList,
  zhengJianAdd,
  zhengJianEdit,
  zhengJianjiDel
} from "@/api/ZhengJian.js";
export default {
  data() {
    return {
      name: "",
      dialogVisible: false,
      dialogTittle: "新增证件名称",
      tableClienType: [],
      formClienType: {
        name: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入证件名称",
            trigger: "blur"
          }
        ]
      },

    };
  },
  created() {
    this.getLists();
  },
  methods: {
    getLists() {
      zhengJianList().then(res => {
        res = typeof res == "string" ? JSON.parse(res) : res;
        console.log(res);
        if (res.code == 0) {
          this.tableClienType = res.data;
        } else {
          this.message("error", res.message);
        }
      });
    },
    // 添加或者编辑
    handleRoom() {
      let formClienType = this.formClienType;
      this.$refs.formClienType.validate(valite => {
        if (valite) {
          if (formClienType.id) {
            zhengJianEdit({
              name: formClienType.name,
              id: formClienType.id
            }).then(res => {
              res = typeof res == "string" ? JSON.parse(res) : res;
              if (res.code == 0) {
                this.dialogVisible = false;
                this.message("success", res.message);
                this.getLists();
              } else {
                this.message("error", res.message);
              }
            });
          } else {
            zhengJianAdd({
              name: formClienType.name
            }).then(res => {
              res = typeof res == "string" ? JSON.parse(res) : res;
              if (res.code == 0) {
                this.dialogVisible = false;
                this.getLists();
                this.message("success", res.message);
              } else {
                this.message("error", res.message);
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    // 编辑btn
    showDialogEdit(v) {
      this.dialogVisible = true;
      this.dialogTittle = "编辑报表名称";
      this.formClienType.name = v.row.name;
      this.formClienType.id = v.row.id;
    },
    // 新增btn
    handleClientType() {
      this.dialogTittle = "新增报表名称";
      this.dialogVisible = true;
    },
    // dialog关闭时
    cleranFormPayType() {
      this.formClienType = {
        name: "",
        id: ""
      };
    },
    /** 删除按钮操作 */
    handleDelete(id) {
      this.confirm()
        .then(() => {
          zhengJianjiDel({
            id
          }).then(res => {
            res = typeof res == "string" ? JSON.parse(res) : res;
            // console.log(res)
            if (res.code == 0) {
              this.getLists();
              this.message("success", res.message);
            } else {
              this.message("error", res.message);
            }
          });
        })
        .catch(() => {});
    },

    // inputchange事件
    // handleInput() {
    //   if (!this.name) {
    //     this.getLists();
    //   }
    // },

    // 查询
    // handleSearch() {
    //   let parmas = {
    //     page: this.pagination.currentPage,
    //     page_size: this.pagination.pageSize,
    //     name: this.name
    //   };
    //   tongjiList(parmas).then(res => {
    //     res = typeof res == "string" ? JSON.parse(res) : res;
    //     console.log(res);
    //     if (res.code == 0) {
    //       this.tableClienType = res.data.list;
    //       this.pagination.total = res.data.count;
    //     } else {
    //       this.message("error", res.message);
    //     }
    //   });
    // },
    // 分页器
    // handleSizeChange(val) {
    //   this.pagination.pageSize = val;
    //   // console.log(`每页 ${val} 条`);
    //   this.getLists();
    // },
    // handleCurrentChange(val) {
    //   this.pagination.currentPage = val;
    //   // console.log(`当前页: ${val}`);
    //   this.getLists();
    // }
  }
};
</script>
<style scoped>
.el-pagination {
  margin-top: 30px;
  float: right;
}
</style>