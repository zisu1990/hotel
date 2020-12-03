<template>
  <el-container>
    <el-main>
      <el-row style="margin-bottom: 20px">
        <el-col :span="6">
          <el-input
            v-model="formRoomType.roomType"
            placeholder="请输入房间类型"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary">查询</el-button>
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
            <el-table-column
              prop="roomType"
              label="房间类型名称"
            ></el-table-column>
            <el-table-column
              prop="roomPrice"
              label="房间价格"
            ></el-table-column>
            <el-table-column
              prop="settingTime"
              label="操作时间"
            ></el-table-column>
            <el-table-column
              prop="settingUser"
              label="操作员"
            ></el-table-column>
            <el-table-column label="状态">
              <template v-slot="scope">
                <el-switch
                  v-model="scope.row.state"
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
                  @click="handleDelete(scope.$index, scope.row)"
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
            <el-form :model="formRoomType" label-width="100px">
              <el-form-item label="房间类型：">
                <el-input
                  v-model="formRoomType.addRoomType"
                  placeholder="请输入房间类型"
                ></el-input>
              </el-form-item>
              <el-form-item :model="formRoomType" label="房间价格：">
                <el-input
                  v-model="formRoomType.addRoomPrice"
                  placeholder="请输入房间价格"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
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
import { roomtypeAdd, roomtypeLists,roomtypeIndex } from "@/api/RoomType.js";
export default {
  data() {
    return {
      formRoomType: {
        roomType: "",
        addRoomType: "",
        addRoomPrice: "",
      },
      dataRoomType: [
        {
          roomType: "三人间",
          roomPrice: "456",
          settingTime: "12345678912",
          settingUser: "张三",
          state: 1,
        },
      ],
      dialogVisible: false,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
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
      // roomtypeLists
      roomtypeIndex(params).then((res) => {
        console.log(res);
      });
    },
    handleEdit(i, v) {},
    handleDelete(i, v) {},
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








   
