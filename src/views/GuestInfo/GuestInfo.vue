<template>
  <el-container>
    <el-main>
      <el-form :model="guestInfoForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="入住时间段：">
              <el-date-picker
                v-model="guestInfoForm.value1"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="getTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="6">
            <el-form-item>
              <el-input
                v-model="guestInfoForm.keys"
                placeholder="请输入住客姓名/身份证号/房间号"
                clearable
                @change="handelChange"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="getGuestList">查询</el-button>
          </el-col>
        </el-row>
      </el-form>

      <el-table
        :data="guestInfoData"
        style="width: 100%"
        border
        stripe
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ textAlign: 'center' }"
      >
        <el-table-column type="index" width="80"></el-table-column>
        <el-table-column prop="roomtype" label="房间类型" width="80"></el-table-column>
        <el-table-column prop="room_no" label="房间号" width="70"></el-table-column>
        <el-table-column prop="name" label="住客姓名" width="100"></el-table-column>
        <el-table-column prop="zhengjian_no" width="140" label="身份证号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" width="140" label="身份证地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="tel" label="联系电话"></el-table-column>
        <el-table-column width="180" prop="start_time" show-overflow-tooltip label="入住时间"></el-table-column>
        <el-table-column width="180" prop="end_time"  show-overflow-tooltip label="离店时间"></el-table-column>
        <el-table-column width="180" prop="member_card" label="会员卡号"  ></el-table-column>
        <el-table-column prop="nationality" label="国籍" width="80"></el-table-column>
        <el-table-column prop="create_time" width="140" show-overflow-tooltip label="操作时间"></el-table-column>
        <el-table-column prop="username" label="操作员"></el-table-column>
      </el-table>

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
import { getAllTime, getDayTime } from "@/utils/moment.js";

import { GuestLists } from "@/api/GuestInfo";

export default {
  data() {
    return {
      guestInfoForm: {
        value1: [],
        keys: ""
      },

      start_time: "",
      end_time: "",

      guestInfoData: [],
       pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  created() {
    this.getGuestList();
  },
  methods: {
    // 获取时间
    getTime() {
      // console.log(this.guestInfoForm.value1);
      this.start_time = getAllTime(this.guestInfoForm.value1[0]);
      this.end_time = getAllTime(this.guestInfoForm.value1[1]);
      // console.log(this.start_time);
      // console.log(this.end_time);
    },

    // 获取客史列表
    getGuestList() {
      let parmas = {
        start_time: this.start_time,
        end_time: this.end_time,
        keys: this.guestInfoForm.keys,
  
      };
      GuestLists(parmas).then(res => {
        res = JSON.parse(res);
        console.log(res, "获取客史列表");
        if (res.code === 0) {
          this.guestInfoData = res.data.list;
          this.pagination.total=res.data.count
        } else {
          this.message("error", res.message);
        }
      });
    },
    handelChange(){
      if(!this.guestInfoForm.keys){
        this.getGuestList();
      }
    },
      // 分页器
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.getGuestList();
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.getGuestList();
    }
 
  }
};
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 30px;
  float: right;
}
</style>











   