<template>
  <el-container>
    <el-main>
      <el-form :model="BookingForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="预订时间段：">
              <el-date-picker v-model="BookingForm.value1" @change="handleChangePicker" type="datetimerange"
                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-input v-model="BookingForm.name" placeholder="请输入姓名/手机号" @change="handleChangeOfTel" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-button @click="searchOfTel" type="primary">查询</el-button>
            <el-button type="success" @click="BookRoomDialogVisible=true">查询所有房间的预订</el-button>
          </el-col>
        </el-row>
      </el-form>

      <el-table :data="BookingTableData" style="width: 100%" border stripe>
        <el-table-column type="index" width="30" align="center"></el-table-column>
        <el-table-column prop="OddNumber" label="预订单号" width="100" align="center"></el-table-column>
        <el-table-column prop="type" label="客户类型" width="80" align="center"></el-table-column>
        <el-table-column prop="groupname" label="团体名称" show-overflow-tooltip width="80" align="center"></el-table-column>
        <el-table-column prop="name" label="预订人" width="80" align="center"></el-table-column>
        <el-table-column prop="tel" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="start_time" label="预到时间" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="end_time" label="预离时间" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="paymethod" label="预付方式" width="80" align="center"></el-table-column>
        <el-table-column prop="pre_money" label="预付金额" width="80" align="center"></el-table-column>
        <el-table-column prop="member_card" label="会员卡号" align="center"></el-table-column>
        <el-table-column prop="nationality" label="国籍" width="60" align="center"></el-table-column>
        <el-table-column prop="create_time" label="操作时间" show-overflow-tooltip  align="center"></el-table-column>
        <el-table-column prop="beizhu" label="备注" align="center"></el-table-column>
        <el-table-column prop="username" label="操作员" width="80" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="250">
          <template v-slot="scope">
            <el-button type="danger" size="small" @click="handleCancel(scope.row.id)">取消</el-button>
             <el-button type="primary" size="small" @click="handleDetail(scope.row)">详情</el-button>
            <el-button type="warning" size="small" @click="CheckInDialogVisible=true">入住</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="pagination.currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="pagination.total"></el-pagination>

      <!-- 查询所有房间的预订 -->
      <el-dialog title="查询所有房间的预订(当月)" :visible.sync="BookRoomDialogVisible" width="95%">
        <el-table :data="SearchBookRoomTableData" style="width: 100%" border>
          <el-table-column prop="roomNo" label="房间号" align="center"></el-table-column>
          <el-table-column prop="roomType" label="房间类型" align="center"></el-table-column>
          <el-table-column prop="yi" label="1" width="50" align="center"></el-table-column>
          <el-table-column prop="er" label="2" width="50" align="center"></el-table-column>
          <el-table-column prop="san" label="3" width="50" align="center"></el-table-column>
          <el-table-column prop="si" label="4" width="50" align="center"></el-table-column>
          <el-table-column prop="wu" label="5" width="50" align="center"></el-table-column>
          <el-table-column prop="liu" label="6" width="50" align="center"></el-table-column>
          <el-table-column prop="qi" label="7" width="50" align="center"></el-table-column>
          <el-table-column prop="ba" label="8" width="50" align="center"></el-table-column>
          <el-table-column prop="jiu" label="9" width="50" align="center"></el-table-column>
          <el-table-column prop="shi" label="10" width="50" align="center"></el-table-column>
          <el-table-column prop="shiyi" label="11" width="50" align="center"></el-table-column>
          <el-table-column prop="shier" label="12" width="50" align="center"></el-table-column>
          <el-table-column prop="shisan" label="13" width="50" align="center"></el-table-column>
          <el-table-column prop="shisi" label="14" width="50" align="center"></el-table-column>
          <el-table-column prop="shiwu" label="15" width="50" align="center"></el-table-column>
          <el-table-column prop="shiliu" label="16" width="50" align="center"></el-table-column>
          <el-table-column prop="shiqi" label="17" width="50" align="center"></el-table-column>
          <el-table-column prop="shiba" label="18" width="50" align="center"></el-table-column>
          <el-table-column prop="shijiu" label="19" width="50" align="center"></el-table-column>
          <el-table-column prop="ershi" label="20" width="50" align="center"></el-table-column>
          <el-table-column prop="ershiyi" label="21" width="50" align="center"></el-table-column>
          <el-table-column prop="ershier" label="22" width="50" align="center"></el-table-column>
          <el-table-column prop="ershisan" label="23" width="50" align="center"></el-table-column>
          <el-table-column prop="ershisi" label="24" width="50" align="center"></el-table-column>
          <el-table-column prop="ershiwu" label="25" width="50" align="center"></el-table-column>
          <el-table-column prop="ershiliu" label="26" width="50" align="center"></el-table-column>
          <el-table-column prop="ershiqi" label="27" width="50" align="center"></el-table-column>
          <el-table-column prop="ershiba" label="28" width="50" align="center"></el-table-column>
          <el-table-column prop="ershijiu" label="29" width="50" align="center"></el-table-column>
          <el-table-column prop="sanshi" label="30" width="50" align="center"></el-table-column>
          <el-table-column prop="sanshiyi" label="31" width="50" align="center"></el-table-column>
        </el-table>
      </el-dialog>

      <!-- 预订入住 -->
      <el-dialog title="预订入住" :visible.sync="CheckInDialogVisible" width="60%" class="checkWarp">
        <el-form :model="checkInForm" label-width="140px">
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8">
              <el-form-item label="客户类型：">
                <el-select v-model="checkInForm.personType" placeholder="选择客客户类型" :style="{ width: '100%' }">
                  <el-option v-for="(item, index) in personTypeOptions" :key="index" :label="item.label"
                    :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="团体名称：">
                <el-input v-model="checkInForm.teamName" placeholder="请输入团体名称" clearable :style="{ width: '100%' }">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="国籍：">
                <el-select v-model="checkInForm.native" placeholder="选择国籍" :style="{ width: '100%' }">
                  <el-option v-for="(item, index) in nativeOptions" :key="index" :label="item.label" :value="item.value"
                    :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8" style="display: flex; align-content: center">
              <el-form-item label="证件类型：">
                <el-select v-model="checkInForm.certificate" placeholder="选择证件类型" :style="{ width: '100%' }">
                  <el-option v-for="(item, index) in certificateOptions" :key="index" :label="item.label"
                    :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
              <el-button type="primary" class="duCard">读身份证</el-button>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话：">
                <el-input v-model="checkInForm.tel" placeholder="请输入联系电话" clearable :style="{ width: '100%' }">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="会员卡号：">
                <el-input v-model="checkInForm.vipNumber" placeholder="请输入会员卡号" clearable :style="{ width: '100%' }">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8">
              <el-form-item label="客主姓名：">
                <el-input v-model="checkInForm.name" placeholder="请输入客主姓名" clearable :style="{ width: '100%' }">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码：">
                <el-input v-model="checkInForm.idNumber" placeholder="请输入证件号码" clearable :style="{ width: '100%' }">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button type="success" round class="checkIn-search">住客登记查询</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="24">
              <el-form-item label="证件地址：">
                <el-input v-model="checkInForm.adderss" placeholder="请输入证件地址" clearable :style="{ width: '100%' }">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8">
              <el-form-item label="入住时间：">
                <el-date-picker v-model="checkInForm.value1" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="离店时间：">
                <el-date-picker v-model="checkInForm.value2" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-input v-model="checkInForm.days" placeholder clearable :style="{ width: '40%' }" class="days">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <p class="chooseTitle">可选房型：</p>
          <div class="chooseRoom">
            <el-row :gutter="20" type="flex" justify="left">
              <el-col :span="8">
                <el-check-group v-model="roomType">
                  <el-checkbox v-for="(v, i) in roomType" :key="i" :name="v.roomtype">
                    {{ v.roomtype }}({{ v.sheng }}/{{ v.sum }})</el-checkbox>
                </el-check-group>
              </el-col>

              <el-col :span="16" class="chooseRoomRight">
                <div class="floorItem" v-for="(v, i) in louceng" :key="i">
                  <p>{{ v.floor }}：</p>
                  <ul>
                    <li v-for="(f, id) in v.listItem" :key="id">
                      <span>{{ f.floorNo }}</span>
                      <span>{{ f.type }}</span>
                    </li>
                  </ul>
                </div>
              </el-col>
            </el-row>
          </div>
          <p class="chooseTitle">已选客房：</p>
          <el-row>
            <el-col :span="24">
              <el-table stripe :data="roomTableData" style="width: 100%" max-height="500px">
                <el-table-column prop="homeName" label="房间类型" width="150px"></el-table-column>
                <el-table-column prop="roomNum" label="房间号"></el-table-column>
                <el-table-column prop="pric" label="房间单价(元)"></el-table-column>

                <el-table-column label="操作">
                  <el-button icon="el-icon-delete" circle type="danger"></el-button>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" justify="left">
            <el-col :span="8">
              <el-form-item label="房费总金额（元）：">
                <el-input v-model="checkInForm.RoomSumMoney" disabled :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="押金（元）：">
                <el-input v-model="checkInForm.deposit" :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="已付预款（元）：">
                <el-input v-model="checkInForm.advancePay" :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" justify="left">
            <el-col :span="8">
              <el-form-item label="应交预付款（元）：">
                <el-input v-model="checkInForm.RoomSumMoney" disabled :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预付方式：">
                <el-select v-model="checkInForm.payfor" placeholder="选择支付方式" :style="{ width: '100%' }">
                  <el-option label="现金" value="1"></el-option>
                  <el-option label="支付宝" value="2"></el-option>
                  <el-option label="微信" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预付金额（元）：">
                <el-input v-model="checkInForm.advanceMoney" :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" justify="left">
            <el-col :span="16" style="display: flex; align-content: center">
              <el-form-item label="会员卡支付：">
                <el-select v-model="checkInForm.isCardPayfor" placeholder="选择支付方式" :style="{ width: '100%' }">
                  <el-option label="会员卡支付" value="1"></el-option>
                  <el-option label="否" value="2"></el-option>
                </el-select>
              </el-form-item>
              <span style="
                  font-size: 14px;
                  color: #005ab9;
                  padding-top: 10px;
                  padding-left: 5px;
                ">余额：300元</span>
            </el-col>
            <el-col :span="8">
              <el-form-item label="卡扣金额（元）：">
                <el-input v-model="checkInForm.cardPayfor" :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" justify="center" class="btn">
            <el-button>重置</el-button>
            <el-button type="primary" @click="CheckInDialogVisible = false">确认</el-button>
          </el-row>
        </el-form>
      </el-dialog>



      <!-- 详情 -->
      <el-dialog title="预订详情" :visible.sync="detailDialogVisible" width="60%">
        <el-row type="flex" justify="space-between" style="text-align: left;font-size:16px;">
          <el-col :span='6'>预定人：{{detail.name}}</el-col>
          <el-col :span='6'>联系电话：{{detail.tel}}</el-col>
          <el-col :span='6'>预到时间：{{detail.start_time}}</el-col>
          <el-col :span='6'>离店时间：{{detail.end_time}}</el-col>
        </el-row>
        <el-row type="flex" justify="space-between" style="text-align: left;font-size:16px;">
          <el-col :span='6'>预付方式：{{detail.paymethod}}</el-col>
          <el-col :span='6'>预付金额：{{detail.pre_money}}</el-col>
          <el-col :span='6'>客户类型：{{detail.type}}</el-col>
          <el-col :span='6'>团体名称：{{detail.groupname}}</el-col>
        </el-row>
         <el-row type="flex" justify="space-between" style="text-align: left;font-size:16px;">
          <el-col :span='6'>会员卡号：{{detail.member_card}}</el-col>
          <el-col :span='6'>国籍：{{detail.nationality}}</el-col>
          <el-col :span='6'></el-col>
          <el-col :span='6'></el-col>
        </el-row>

        <el-row v-for="(item,index) in detail.roomtype_info" :key="index" style="text-align: left;font-size:16px;">
          <el-col :span="6">预定房间类型：{{item.roomtype}}</el-col>
          <el-col :span="6">预定房间数量：{{item.num}}间</el-col>
        </el-row>



      </el-dialog>
    </el-main>
  </el-container>
</template>


<script>
  import {
    orderIndex,
    orderCancel
  } from '@/api/Booking.js'
  import {
    getAllTime
  } from '@/utils/moment.js'
  export default {
    data() {
      return {
        BookingForm: {
          value1: [],
          name: "",
          tel: ""
        },
        BookingTableData: [],


        //预订房间查询
        BookRoomDialogVisible: false,
        SearchBookRoomTableData: [{
            roomNo: "8101",
            roomType: "单间",
            yi: "",
            er: "",
            san: "",
            si: "",
            wu: "",
            liu: "",
            qi: "",
            ba: "",
            jiu: "",
            shi: "",
            shiyi: "",
            shier: "",
            shisan: "",
            shisi: "",
            shiwu: "",
            shiliu: "",
            shiqi: "",
            shiba: "",
            shijiu: "",
            ershi: "",
            ershiyi: "",
            ershier: "",
            ershier: "",
            ershisan: "",
            ershisi: "",
            ershiwu: "",
            ershiliu: "",
            ershiqi: "",
            ershiba: "",
            ershijiu: "",
            sanzhi: "",
            sanshiyi: ""
          },
          {
            roomNo: "8102",
            roomType: "三人间",
            yi: "",
            er: "",
            san: "",
            si: "",
            wu: "",
            liu: "",
            qi: "",
            ba: "",
            jiu: "",
            shi: "",
            shiyi: "",
            shier: "",
            shisan: "",
            shisi: "",
            shiwu: "",
            shiliu: "",
            shiqi: "",
            shiba: "",
            shijiu: "",
            ershi: "",
            ershiyi: "",
            ershier: "",
            ershier: "",
            ershisan: "",
            ershisi: "",
            ershiwu: "",
            ershiliu: "",
            ershiqi: "",
            ershiba: "",
            ershijiu: "",
            sanzhi: "",
            sanshiyi: ""
          },
          {
            roomNo: "8103",
            roomType: "四人间",
            yi: "",
            er: "",
            san: "",
            si: "",
            wu: "",
            liu: "",
            qi: "",
            ba: "",
            jiu: "",
            shi: "",
            shiyi: "",
            shier: "",
            shisan: "",
            shisi: "",
            shiwu: "",
            shiliu: "",
            shiqi: "",
            shiba: "",
            shijiu: "",
            ershi: "",
            ershiyi: "",
            ershier: "",
            ershier: "",
            ershisan: "",
            ershisi: "",
            ershiwu: "",
            ershiliu: "",
            ershiqi: "",
            ershiba: "",
            ershijiu: "",
            sanzhi: "",
            sanshiyi: ""
          },
          {
            roomNo: "8104",
            roomType: "五人间",
            yi: "",
            er: "",
            san: "",
            si: "",
            wu: "",
            liu: "",
            qi: "",
            ba: "",
            jiu: "",
            shi: "",
            shiyi: "",
            shier: "",
            shisan: "",
            shisi: "",
            shiwu: "",
            shiliu: "",
            shiqi: "",
            shiba: "",
            shijiu: "",
            ershi: "",
            ershiyi: "",
            ershier: "",
            ershier: "",
            ershisan: "",
            ershisi: "",
            ershiwu: "",
            ershiliu: "",
            ershiqi: "",
            ershiba: "",
            ershijiu: "",
            sanzhi: "",
            sanshiyi: ""
          }
        ],

        //入住
        CheckInDialogVisible: false,
        checkInForm: {
          personType: "散客",
          teamName: "无",
          certificate: "身份证",
          tel: "1825632124",
          vipNumber: "",
          name: "张三",
          idNumber: "3408811999910256895",
          adderss: "安徽省合肥市滨湖新区西藏路1110号",
          value1: "2020-12-02",
          value2: "2020-12-03",
          days: "1天",
          RoomSumMoney: 1000,
          deposit: 200,
          advancePay: 0,
          payfor: "",
          advanceMoney: 200,
          isCardPayfor: "",
          cardPayfor: 500
        },
        checkInRef: {
          personType: [],
          teamName: []
        },
        personTypeOptions: [{
            label: "散客",
            value: 1
          },
          {
            label: "团体",
            value: 2
          }
        ],
        nativeOptions: [{
            label: "中国",
            value: 1
          },
          {
            label: "美国",
            value: 2
          }
        ],
        certificateOptions: [{
            label: "身份证",
            value: 1
          },
          {
            label: "驾驶证",
            value: 2
          },
          {
            label: "学生证",
            value: 3
          }
        ],
        roomType: [{
            roomtype: "单人间",
            sheng: 10,
            sum: 30
          },
          {
            roomtype: "标间",
            sheng: 10,
            sum: 30
          },
          {
            roomtype: "三人间",
            sheng: 10,
            sum: 30
          },
          {
            roomtype: "五人间",
            sheng: 10,
            sum: 30
          },
          {
            roomtype: "十人间",
            sheng: 10,
            sum: 30
          },
          {
            roomtype: "钟点房",
            sheng: 10,
            sum: 30
          }
        ],
        louceng: [{
            floor: "1楼",
            listItem: [{
                id: 1,
                floorNo: 8102,
                status: "预订中",
                type: "三人间",
                background: "#FCB634",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 2,
                floorNo: 8103,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 3,
                floorNo: 8104,
                status: "入住中",
                type: "五人间",
                background: "#FE775E",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 4,
                floorNo: 8105,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 5,
                floorNo: 8106,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 6,
                floorNo: 8107,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 7,
                floorNo: 8108,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 8,
                floorNo: 8102,
                status: "预订中",
                type: "三人间",
                background: "#FCB634",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 9,
                floorNo: 8103,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 10,
                floorNo: 8104,
                status: "入住中",
                type: "五人间",
                background: "#FE775E",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 11,
                floorNo: 8105,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 12,
                floorNo: 8106,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 13,
                floorNo: 8107,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 14,
                floorNo: 8108,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png"
              }
            ]
          },
          {
            floor: "2楼",
            listItem: [{
                id: 24,
                floorNo: 8102,
                status: "预订中",
                type: "三人间",
                background: "#FCB634",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 25,
                floorNo: 8102,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 26,
                floorNo: 8102,
                status: "预订中",
                type: "三人间",
                background: "#FCB634",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 27,
                floorNo: 8103,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 28,
                floorNo: 8104,
                status: "入住中",
                type: "五人间",
                background: "#FE775E",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 29,
                floorNo: 8105,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 30,
                floorNo: 8106,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 31,
                floorNo: 8107,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 32,
                floorNo: 8108,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 33,
                floorNo: 8108,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png"
              }
            ]
          },
          {
            floor: "3楼",
            listItem: [{
                id: 15,
                floorNo: 8102,
                status: "预订中",
                type: "三人间",
                background: "#FCB634",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 16,
                floorNo: 8102,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 17,
                floorNo: 8102,
                status: "预订中",
                type: "三人间",
                background: "#FCB634",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 18,
                floorNo: 8103,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 19,
                floorNo: 8104,
                status: "入住中",
                type: "五人间",
                background: "#FE775E",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 20,
                floorNo: 8105,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 21,
                floorNo: 8106,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 22,
                floorNo: 8107,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 23,
                floorNo: 8108,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 34,
                floorNo: 8108,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 35,
                floorNo: 8108,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png"
              },
              {
                id: 36,
                floorNo: 8108,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png"
              }
            ]
          }
        ],
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        // 表格对应的数据
        roomTableData: [{
          homeName: "单人间",
          roomNum: 8102,
          pric: 200
        }],


        //预订详情
        detailDialogVisible:false,
        detail:{
          name:""
        }
      };
    },
    created() {
      this.getRows()
    },
    methods: {
      // 
      getRows(start_time, end_time, keys) {
        let params = {
          page: this.pagination.currentPage,
          page_size: this.pagination.pageSize,
          start_time,
          end_time,
          keys
        }
        orderIndex(params).then(res => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          console.log(res)
          if (res.code == 0) {
            let {
              data
            } = res
            this.pagination.total = data.count
            this.BookingTableData = data.list
            data.list.forEach(v => {
              v.roomtype_info
            });
          } else {
            this.message("error", res.message)
          }
        })
      },
      // 时间选择器change
      handleChangePicker() {
        let start = getAllTime(this.BookingForm.value1[0])
        let end = getAllTime(this.BookingForm.value1[1])
         if(!start||!end){
          this.getRows()
        }
        this.getRows(start, end)
      },
      // inputChange时间
      handleChangeOfTel(){
        if(!this.BookingForm.name){
           this.getRows()
        }
      },
      // 根据手机号查询
      searchOfTel() {
        this.getRows("", "", this.BookingForm.name)
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



         //预订取消
      handleCancel(id) {
        this.confirm()
          .then(() => {
            orderCancel({
              id
            }).then((res) => {
              res = JSON.parse(res);
              // console.log(res)
              if (res.code === 0) {
                this.getRows();
                this.message("success", "取消成功");
              } else {
                this.message("error", res.message);
              }
            });
          })
          .catch(() => {});
      },


      //详情
      handleDetail(row){
        console.log(row)
        this.detail=row
        this.detailDialogVisible=true;
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

    /deep/.el-dialog {
      .el-dialog__footer {
        text-align: center;
      }
    }

    .checkWarp {
      .checkIn-search {
        margin-left: -150px;
      }

      .duCard {
        height: 40px;
        line-height: 40px;
        margin-left: 5px;
        padding: 0 5px;
      }

      .days {
        margin-left: -350px;
      }

      .chooseTitle {
        text-align: left;
        font-size: 18px;
      }

      .chooseRoom {
        background: #f9f9f9;
        padding: 20px 20px 0;
        margin: 10px 0 20px;

        /deep/.el-checkbox {
          text-align: left;
          display: block;
          margin-bottom: 20px;
        }

        .chooseRoomRight {
          height: 280px;
          overflow-y: auto;
        }

        .floorItem {
          text-align: left;

          p {
            margin-bottom: 10px;
          }

          ul {
            display: flex;

            flex-wrap: wrap;

            li {
              padding: 5px 10px;
              border: 1px solid #333;
              margin: 0 10px 10px 0;

              span {
                display: block;
                color: #333;
                font-size: 14px;
                cursor: pointer;
              }
            }
          }
        }
      }

      .btn {
        margin-top: 30px;

        .el-button {
          width: 100px;
        }
      }

      .el-table {
        margin-bottom: 30px;
      }

      .roomSetting {
        display: flex;
        justify-content: center;

        .el-input {
          width: 45px;
        }
      }
    }

    .payForList li {
      text-align: left;
      padding: 20px;
      border-bottom: 1px solid #f3f3f3;
      font-size: 18px;

      span,
      p {
        padding: 0 20px;
      }
    }

    /deep/.el-dialog__footer {
      text-align: center;
    }

    .qianzi {
      text-align: right;
      margin: 40px 200px 40px 0;
    }
  }
</style>


<style scoped>
  /* .el-form-item {
  margin-bottom: 35px !important;
} */
  .el-input,
  .el-input__inner {
    width: 256px;
  }

  div /deep/.el-checkbox {
    font-size: 18px;
  }

  div /deep/.el-checkbox__inner {
    width: 20px;
    height: 20px;
  }

  div /deep/.el-checkbox__inner::after {
    height: 11px;
    left: 8px;
    top: 2px;
  }

  div /deep/.el-checkbox__label {
    font-size: 18px;
    line-height: 20px;
  }
</style>