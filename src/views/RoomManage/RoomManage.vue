<template>
  <el-container>
    <el-main>
      <el-row style="margin-bottom: 20px">
        <el-col :span="6">
          <el-input
            clearable
            @change="handleInput"
            v-model="formRoomManage.roomType"
            placeholder="请输入房间号/房间类型"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-col>
      </el-row>

      <el-row type="flex" justify="start">
        <el-button @click="showAddialog(true)" type="primary">新增</el-button>
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
              prop="room_no"
              label="房号"
            ></el-table-column>
            <el-table-column prop="floor" label="所在楼层"></el-table-column>
            <el-table-column prop="roomtype" label="房间类型"></el-table-column>
            <el-table-column
              prop="people_num"
              label="可住人数"
            ></el-table-column>
            <el-table-column prop="price" label="每日单价"></el-table-column>
            <el-table-column
              prop="hour_room"
              label="可选钟点房"
            ></el-table-column>
            <el-table-column prop="wifi" label="房间WIFI"></el-table-column>
            <el-table-column
              width="180"
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
                >
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column width="200" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)"
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

      <el-dialog
        :title="dialogTittle"
        @close="formRoomManage = {}"
        :visible.sync="dialogVisible"
        width="35%"
      >
        <el-form
          :rules="rules"
          ref="adddialogVisible"
          :model="formRoomManage"
          label-width="100px"
        >
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item prop="addRoomNum" label="房号：">
                <el-input
                  clearable
                  v-model="formRoomManage.addRoomNum"
                  placeholder="请输入序号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="onRoomFloor" label="所在楼层：">
                <el-input
                  clearable
                  v-model="formRoomManage.onRoomFloor"
                  placeholder="请输入楼层"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item prop="addRoomType" label="房间类型：">
                <el-select
                  v-model="formRoomManage.addRoomType"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in roomTypeOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="liveUserName" label="可住人数：">
                <el-input
                  clearable
                  v-model="formRoomManage.liveUserName"
                  placeholder="请输入可住人数"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item prop="addRoomPrice" label="房间价格：">
                <el-input
                  clearable
                  v-model="formRoomManage.addRoomPrice"
                  placeholder="请输入房间价格"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="isHourRoom" label="钟点房：">
                <el-select
                  v-model="formRoomManage.isHourRoom"
                  placeholder="请选择"
                >
                  <el-option value="是" label="是"> </el-option>
                  <el-option value="否" label="否"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" prop="isHaveWIFI" justify="space-between">
            <el-col :span="11">
              <el-form-item prop="roomWIFI" label="房间WIFI：">
                <el-input
                  placeholder="请输入房间WIFI"
                  v-model="formRoomManage.roomWIFI"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11"> </el-col>
          </el-row>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddroom">确 定</el-button>
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
  roomAdd,
  roomDel,
  roomEdit,
  roomIndex,
  roomUpload,
  roomModifystatus,
  roomInfo,
} from "@/api/RoomManage.js";
import { roomtypeLists } from "@/api/RoomType.js";
export default {
  data() {
    var addRoomNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("序号不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 100);
    };
    var onRoomFloor = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("所在楼层不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 100);
    };

    var liveUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("可住人数不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 100);
    };
    var addRoomPrice = (rule, value, callback) => {
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
      rules: {
        addRoomNum: { validator: addRoomNum, trigger: "blur" },
        onRoomFloor: { validator: onRoomFloor, trigger: "blur" },
        addRoomType: [
          { required: true, message: "请选择房间类型", trigger: "change" },
        ],
        liveUserName: { validator: liveUserName, trigger: "blur" },
        addRoomPrice: { validator: addRoomPrice, trigger: "blur" },
        isHourRoom: [
          { required: true, message: "请选择是否钟点房", trigger: "change" },
        ],
        roomWIFI: [
          { required: true, message: "请输入房间WIFI密码", trigger: "blur" },
        ],
      },
      roomTypeOptions: [],
      formRoomManage: {
        addRoomNum: "",
        onRoomFloor: "",
        addRoomType: "",
        liveUserName: "",
        addRoomPrice: "",
        isHourRoom: "",
        roomWIFI: "",
      },
      dataRoomType: [],
      roomInfo: {},
      roomInfoStatus: true,
      dialogVisible: false,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      dialogTittle: "新房间",
    };
  },
  created() {
    this.getRows();
  },
  methods: {
    getRows() {
      this.getRoomType();
      let params = {
        page: this.pagination.currentPage,
        page_size: this.pagination.pageSize,
      };
      roomIndex(params).then((res) => {
        res = typeof res == "string" ? JSON.parse(res) : res;
        // console.log(res);
        if (res.code == 0) {
          // console.log("tag", typeof res.data);
          this.dataRoomType = res.data.list;
          this.pagination.total = res.data.count;
        } else {
          this.message("error", res.message);
        }
      });
    },
    // 添加或者编辑房间
    handleAddroom() {
      let formRoomManage = this.formRoomManage;
      let params = {
        room_no: formRoomManage.addRoomNum,
        floor: formRoomManage.onRoomFloor,
        roomtype: formRoomManage.addRoomType,
        people_num: formRoomManage.liveUserName,
        price: formRoomManage.addRoomPrice,
        hour_room: formRoomManage.isHourRoom,
        wifi: formRoomManage.roomWIFI,
      };
      this.$refs.adddialogVisible.validate((valid) => {
        if (valid) {
          if (this.roomInfoStatus) {
            roomAdd(params).then((res) => {
              res = typeof res == "string" ? JSON.parse(res) : res;
              if (res.code == 0) {
                this.getRows();
                this.message("success", res.message);
                this.dialogVisible = false;
              } else {
                this.message("error", res.message);
              }
            });
          } else {
            roomEdit({ ...params, ...{ id: this.roomInfo.id } }).then((res) => {
              res = typeof res == "string" ? JSON.parse(res) : res;
              if (res.code == 0) {
                this.getRows();
                this.message("success", res.message);
                this.dialogVisible = false;
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
    // 获取房型列表
    getRoomType() {
      roomtypeLists().then((res) => {
        res = typeof res == "string" ? JSON.parse(res) : res;
        if (res.code == 0) {
          this.roomTypeOptions = res.data;
        } else {
          this.message("error", res.message);
        }
      });
    },
    // 编辑
    handleEdit(v) {
      let formRoomManage = this.formRoomManage;
      this.roomInfo = v;
      formRoomManage.addRoomNum = v.room_no;
      formRoomManage.onRoomFloor = v.floor;
      formRoomManage.addRoomType = v.roomtype;
      formRoomManage.liveUserName = v.people_num;
      formRoomManage.addRoomPrice = v.price;
      formRoomManage.isHourRoom = v.hour_room;
      formRoomManage.roomWIFI = v.wifi;
      this.showAddialog(false);
    },
    // 删除
    handleDelete(id) {
      this.confirm()
        .then(() => {
          roomDel({ id }).then((res) => {
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
    // 显示对话框
    showAddialog(v) {
      this.dialogVisible = true;
      if (v) {
        this.roomInfoStatus = true;
        this.dialogTittle = "新房间";
      } else {
        this.roomInfoStatus = false;
        this.dialogTittle = "编辑房间";
      }
    },
    // 查询
    handleSearch() {
      let params = {
        page: this.pagination.currentPage,
        page_size: this.pagination.pageSize,
        keys: this.formRoomManage.roomType,
      };
      roomIndex(params).then((res) => {
        res = JSON.parse(res);
        if (res.code === 0) {
          this.dataRoomType = res.data.list;
        } else {
          this.message("error", res.message);
        }
      });
    },
    handleInput() {
      if (!this.roomType) {
        this.handleSearch();
      }
    },
    // 上传exsel
    handleChange(file, fileList) {},

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









   