<template>
  <el-container>
    <el-main>
      <el-row style="margin-bottom: 20px">
        <el-col :span="6">
          <el-input v-model="roomType" clearable @change="handleInput" placeholder="请输入房间类型"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-col>
      </el-row>

      <el-row type="flex" justify="start">
        <el-button @click="dialogVisible = true" type="primary">新增</el-button>
      </el-row>
      <el-row type="flex" justify="start" style="margin-top: 20px">
        <el-col>
          <el-table
            :header-cell-style="{ textAlign: 'center' }"
            :cell-style="{ textAlign: 'center' }"
            :data="dataRoomType"
            border
            stripe
          >
            <el-table-column width="80" type="index"></el-table-column>
            <el-table-column prop="name" label="房间类型名称"></el-table-column>
            <el-table-column prop="price" label="房间价格"></el-table-column>
            <el-table-column
              prop="create_time"
              label="操作时间"
            ></el-table-column>
            <el-table-column prop="username" label="操作员"></el-table-column>
            <el-table-column label="状态">
              <template v-slot="scope">
                <el-switch
                  v-model="scope.row.status"
                  :active-value="1"
                  :inactive-value="0"
                  active-color="#13ce66"
                  inactive-color="#999"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <el-dialog title="新房间类型" :visible.sync="dialogVisible" width="28%">
        <el-row type="flex" justify="center">
          <el-col :span="18">
            <el-form
              :rules="rules"
              :model="formRoomType"
              ref="formRoomType"
              label-width="100px"
            >
              <el-form-item prop="name" label="房间类型：">
                <el-input
                  v-model="formRoomType.name"
                  placeholder="请输入房间类型"
                ></el-input>
              </el-form-item>
              <el-form-item prop="price" label="房间价格：">
                <el-input
                  v-model="formRoomType.price"
                  placeholder="请输入房间价格"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleRoom">确 定</el-button>
        </span>
      </el-dialog>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      ></el-pagination>
    </el-main>
  </el-container>
</template>
<script>
import {
  roomtypeAdd,
  roomtypeLists,
  roomtypeIndex,
  roomtypeDel,
} from "@/api/RoomType.js";
import { getToken } from "@/utils/token.js";
export default {
  data() {
    var price = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("房间价格不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 100);
    };
    return {
      roomType: "",
      formRoomType: {
        name: "",
        price: "",
      },
      dataRoomType: [],
      dialogVisible: false,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      rules: {
        name: [
          { required: true, message: "请输入房间类型", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        price: { validator: price, trigger: "blur" },
      },
    };
  },
  created() {
    this.getRows();
  },
  methods: {
    getRows() {
      let params = {
        page: this.pagination.currentPage,
        page_size: this.pagination.pageSize,
      };
      roomtypeIndex(params).then((res) => {
        res = JSON.parse(res);
        if (res.code === 0) {
          this.dataRoomType = res.data.list;
        } else {
          this.message("error", res.message);
        }
      });
    },
    // 新增
    handleRoom() {
      this.$refs.formRoomType.validate((valid) => {
        if (valid) {
          roomtypeAdd(this.formRoomType).then((res) => {
            res = JSON.parse(res);
            if (res.code === 0) {
              this.message("success", res.message);
              this.getRows();
              this.dialogVisible = false;
            } else {
              this.message("error", res.message);
            }
          });
        } else {
          return false;
        }
      });
    },
    handleEdit(i, v) {},
    // 增加
    handleDelete(id) {
      this.confirm()
        .then(() => {
          roomtypeDel({ id }).then((res) => {
            res = JSON.parse(res);
            if (res.code === 0) {
              this.getRows();
              this.message("success", "删除成功");
            } else {
              this.message("error", res.message);
            }
          });
        })
        .catch(() => {});
    },
    // 查询
    handleSearch() {
      let params = {
        page: this.pagination.currentPage,
        page_size: this.pagination.pageSize,
        name: this.roomType,
      };
      roomtypeIndex(params).then((res) => {
        res = JSON.parse(res);
        if (res.code === 0) {
          this.dataRoomType = res.data.list;
        } else {
          this.message("error", res.message);
        }
      });
    },
    handleInput(){
      if(!this.roomType){
        this.handleSearch()
      }
    },
    // 分页器
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      // console.log(`每页 ${val} 条`);
      this.getRows();
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      // console.log(`当前页: ${val}`);
      this.getRows();
    },
  },
};
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 30px;
  float: right;
}
</style>








   
