<template>
  <el-container>
    <el-main>
      <el-row style="margin-bottom: 20px">
        <el-col :span="6">
          <el-input
            v-model="formRoomManage.roomType"
            placeholder="请输入房间号/房间类型"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary">查询</el-button>
        </el-col>
      </el-row>

      <el-row type="flex" justify="start">
        <el-button @click="dialogVisible = true" type="primary">新增</el-button>
        <el-button type="primary">下载客房导入模板</el-button>
        <!-- <el-button>导入客房信息</el-button> -->
        <el-upload
          style="margin-left: 10px"
          action=""
          :auto-upload="false"
          accept=".xlsx, .xls"
          :show-file-list="false"
          :on-change="handleChange"
        >
          <el-button>导入客房信息</el-button>
        </el-upload>
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
            <el-table-column type="index" width="80"></el-table-column>
            <el-table-column
              width="90"
              prop="roomNum"
              label="房号"
            ></el-table-column>
            <el-table-column
              prop="roomFloor"
              label="所在楼层"
            ></el-table-column>
            <el-table-column prop="roomType" label="房间类型"></el-table-column>
            <el-table-column
              prop="roomManNum"
              label="可住人数"
            ></el-table-column>
            <el-table-column
              prop="everyDayPrice"
              label="每日单价"
            ></el-table-column>
            <el-table-column
              prop="settingHourRoom "
              label="可选钟点房"
            ></el-table-column>
            <el-table-column
              prop="isHaveWIFI "
              label="房间WIFI"
            ></el-table-column>
            <el-table-column
              width="180"
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
                >
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column width="200" label="操作">
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

      <el-dialog title="新房间类型" :visible.sync="dialogVisible" width="30%">
        <el-form :model="formRoomManage" label-width="90px">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="房号：">
                <el-input
                  v-model="formRoomManage.addRoomNum"
                  placeholder="请输入序号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="所在楼层：">
                <el-input
                  v-model="formRoomManage.onRoomFloor"
                  placeholder="请输入楼层"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="房间类型：">
                <el-select
                  v-model="formRoomManage.addRoomType"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="可住人数：">
                <el-input
                  v-model="formRoomManage.liveUserName"
                  placeholder="请输入可住人数"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="房间价格：">
                <el-input
                  v-model="formRoomManage.addRoomPrice"
                  placeholder="请输入房间价格"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="可住人数：">
                <el-select
                  v-model="formRoomManage.isHourRoom"
                  placeholder="请选择"
                >
                  <el-option value="1" label="是"> </el-option>
                  <el-option value="0" label="否"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="房间WIFI：">
                <el-select
                  v-model="formRoomManage.isHaveWIFI"
                  placeholder="请选择"
                >
                  <el-option value="1" label="是"> </el-option>
                  <el-option value="0" label="否"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11"> </el-col>
          </el-row>
        </el-form>

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
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      formRoomManage: {
        addRoomNum: "",
        onRoomFloor: "",
        addRoomType: "",
        liveUserName: "",
        addRoomPrice: "",
        isHourRoom: "",
        isHaveWIFI: "",
      },
      dataRoomType: [
        {
          roomType: "三人间",
          roomNum: "120",
          roomFloor: "123",
          roomManNum: "",
          everyDayPrice: "",
          settingHourRoom: "",
          isHaveWIFI: "",
          settingTime: "12345678912",
          settingUser: "张三",
          state: 1,
        },
      ],
      dialogVisible: false,
      currentPage: 1,
    };
  },
  methods: {
    handleEdit(i, v) {},
    handleDelete(i, v) {},
    // 上传exsel
    handleChange(file, fileList) {},

    // 分页器
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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









   