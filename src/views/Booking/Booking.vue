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
              <el-input v-model="BookingForm.name" placeholder="请输入姓名/手机号" @change="handleChangeOfTel" clearable
                :style="{width: '100%'}">
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
<<<<<<< HEAD
=======
        
>>>>>>> 955ed261aa2fb78d3101c774158d684e14e6f303
        <el-table-column prop="type" label="客户类型" width="80" align="center"></el-table-column>
        <el-table-column prop="groupname" label="团体名称" show-overflow-tooltip width="80" align="center">
        </el-table-column>
        <el-table-column prop="name" label="预订人" width="80" align="center"></el-table-column>
        <el-table-column prop="tel" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="start_time" label="预到时间" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="end_time" label="预离时间" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="paymethod" label="预付方式" width="80" align="center"></el-table-column>
        <el-table-column prop="pre_money" label="预付金额" width="80" align="center"></el-table-column>
        <el-table-column prop="member_card" label="会员卡号" align="center"></el-table-column>
        <el-table-column prop="nationality" label="国籍" width="60" align="center"></el-table-column>
        <el-table-column prop="create_time" label="操作时间" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="beizhu" label="备注" align="center"></el-table-column>
        <el-table-column prop="username" label="操作员" width="80" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="250">
          <template v-slot="scope">
            <el-button type="danger" size="small" @click="handleCancel(scope.row.id)">取消</el-button>
            <el-button type="primary" size="small" @click="handleDetail(scope.row)">详情</el-button>
            <el-button type="warning" size="small" @click="bookingRoom(scope.row.id)">入住</el-button>
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
      <el-dialog @close="CheckInDialogVisibleClose" title="预订入住" :visible.sync="CheckInDialogVisible" width="60%"
        class="checkWarp">
        <el-form :rules="rules" ref="checkInForm" :model="checkInForm" label-width="140px">
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8">
              <el-form-item label="客户类型：">
                <el-input v-model="bookingInfo.type" disabled style="width: 100%"> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="团体名称：">
                <el-input v-model="bookingInfo.groupname" disabled style="width: 100%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="国籍：">
                <el-input v-model="bookingInfo.nationality" disabled style="width: 100%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8" style="display: flex; align-content: center">
              <el-form-item label="证件类型：">
                <el-input v-model="bookingInfo.zhengjian" disabled style="width: 100%"></el-input>
              </el-form-item>
              <el-button type="primary" class="duCard">读身份证</el-button>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话：">
                <el-input v-model="bookingInfo.tel" disabled style="width: 100%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="会员卡号：">
                <el-input v-model="bookingInfo.member_card" disabled style="width: 100%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8">
              <el-form-item label="客主姓名：">
                <el-input v-model="bookingInfo.name" disabled style="width: 100%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码：">
                <el-input v-model="bookingInfo.zhengjian_no" disabled style="width: 100%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="24">
              <el-form-item label="证件地址：">
                <el-input v-model="bookingInfo.address" disabled style="width: 100%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8">
              <el-form-item label="入住时间：">
                <el-input v-model="bookingInfo.start_time" disabled style="width: 100%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="离店时间：">
                <el-input v-model="bookingInfo.end_time" disabled style="width: 100%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-input v-model="bookingInfo.datecount" disabled style="width: 40%" class="days"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <p class="chooseTitle">可选房型：</p>
          <div class="chooseRoom">
            <div style="text-align:center;padding-bottom:20px;color:#999" v-show="!roomType.length">
              ---------无房间---------</div>
            <el-row :gutter="20" type="flex" justify="left">
              <el-col :span="8">
                <el-checkbox-group @change="handleChangeRoomType" v-model="checkRoomType">
                  <el-checkbox v-for="(v, i) in roomType" :key="i" :value="v.name" :label="v.name">
                    {{ v.name }}({{ v.kx_count }}/{{ v.count }})
                  </el-checkbox>
                </el-checkbox-group>
              </el-col>

              <el-col :span="16" class="chooseRoomRight">
                <div class="floorItem" v-for="(v, i) in louceng" :key="i">
                  <p>{{ v.floor }}：</p>
                  <ul>
                    <!-- :class="setColor(f,index)" -->

                    <li class="fangjian" v-for="(f, index) in v.item"
                      :class="{'activeBlue':isActiveArr.indexOf(f.id)!=-1}" ref="roomSetCorlor" @click="chooseRoom(f)"
                      :key="index">
                      <span>{{ f.room_no }}</span>
                      <span>{{ f.roomtype }}</span>
                    </li>
                  </ul>
                </div>
              </el-col>
            </el-row>
          </div>
          <p class="chooseTitle">已选客房：</p>
          <el-row>
            <el-col :span="24">
              <el-table stripe show-summary :summary-method="getSumMoney" :header-cell-style="tableStyle"
                :cell-style="tableStyle" :data="roomTableData" style="width: 100%; margin-top: 10px" max-height="500px">
                <el-table-column align="center" prop="roomtype" label="房间类型" width="150px"></el-table-column>
                <el-table-column align="center" prop="room_no" label="房间号"></el-table-column>
                <el-table-column align="center" prop="price" label="房间单价(元)"></el-table-column>
                <el-table-column align="center" label="操作">
                  <template v-slot="scope">
                    <el-button icon="el-icon-delete" circle type="danger"
                      @click="handleReduce(scope.$index, scope.row)"></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" justify="left">
            <el-col :span="8">
              <el-form-item label="房费总金额：">
                <el-input v-model="checkInForm.RoomSumMoney" disabled :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="加收金额：">
                <el-input v-model="checkInForm.chargeAmount" disabled :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="优惠金额：">
                <el-input v-model="checkInForm.couponMoney" disabled :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="left">
            <el-col :span="8">
              <el-form-item label="应交预付款：">
                <el-input v-model="checkInForm.residueMoney" disabled :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="押金金额：" prop="deposit">
                <el-input v-model="checkInForm.deposit" :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="已付预款：">
                <el-input v-model="bookingInfo.pre_money" disabled :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>


          </el-row>
          <el-row :gutter="20" type="flex" justify="left">
            <el-col :span="8">
              <el-form-item label="预付方式：" prop="payfor">
                <el-select v-model="checkInForm.payfor" placeholder="选择支付方式" :style="{ width: '100%' }">
                  <el-option v-for="(item,index) in payForForhod" :key="index" :label="item.name" :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预付金额：" prop="advanceMoney">
                <el-input v-model="checkInForm.advanceMoney" :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="会员卡支付：">
                <el-select v-model="checkInForm.is_card_pay" :disabled="disabledMeber" placeholder="请选择"
                  :style="{ width: '100%' }">
                  <el-option label="是" value="是"></el-option>
                  <el-option label="否" value="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="left">
            <el-col :span="8">
              <el-form-item label="卡扣金额：">
                <el-input :style="{ width: '100%' }" :disabled="disabledCardKkNum" clearable
                  v-model="checkInForm.payCardMoney"></el-input>
                <span style="
                  font-size: 14px;
                  color: #005ab9;
                   position: absolute;
                   right:-100px;
                ">{{vipCardMoney}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8"></el-col>
            <el-col :span="8"></el-col>
          </el-row>

          <el-row :gutter="20" type="flex" justify="center" class="btn">
            <el-button @click="CheckInDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitForm">确认</el-button>
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
    orderCancel,
    orderInfo,
    settingInfo,
    orderYdroomtype,
    orderMemberinfo,
    paymethod,
    orderlivein
  } from '@/api/Booking.js'
  import {
    getAllTime,
    getDayTime,
    isBefore
  } from '@/utils/moment.js'
  import Moment from 'moment'
  export default {
    data() {
      var deposit = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("请输入押金金额"));
        }
        setTimeout(() => {
          if (Number(value) < 0 || !Number(value)) {
            callback(new Error("请输入有效数字"));
          } else {
            callback();
          }
        }, 100);
      };
      var advanceMoney = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("请输入预付金额"));
        }
        setTimeout(() => {
          if (Number(value) >= 0) {
            callback();
          } else {
            callback(new Error("请输入有效数字"));
          }
        }, 100);
      };
      return {
        BookingForm: {
          value1: [],
          name: "",
          tel: ""
        },
        BookingTableData: [],
        rules: {
          deposit: [{
            validator: deposit,
            trigger: "blur"
          }],
          advanceMoney: [{
            validator: advanceMoney,
            trigger: "blur"
          }],
        },

        //预订房间查询
        BookRoomDialogVisible: false,
        SearchBookRoomTableData: [{
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
        }],

        //入住
        CheckInDialogVisible: false,
        checkInForm: {},
        checkInRef: {
          personType: [],
          teamName: []
        },
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        // 表格对应的数据
        roomTableData: [],
        // 表格样式
        tableStyle: {
          textAlign: "center"
        },
        checkRoomType: [],
        louceng: "",
        roomType: [],
        settingInfo: "",
        isActiveArr: [],
        //预订详情
        detailDialogVisible: false,
        detail: {
          name: ""
        },
        // 预订入住
        bookingInfo: {},
        VIPInfo: "",
        // 支付方式
        payForForhod: [],
        // 会员卡号是否禁用
        disabledMeber: true,
        // 卡扣是否禁用
        disabledCardKkNum: true,
        // 会员余额
        vipCardMoney: "",
      };
    },
    computed: {
      Newis_card_pay() {
        return this.checkInForm.is_card_pay
      },
      Newmember_card() {
        return this.checkInForm.payCardMoney
      },
    },
    watch: {
      Newis_card_pay(val) {
        if (val == '否' || !val) {
          this.checkInForm.payCardMoney = ''
          this.disabledCardKkNum = true
        } else
          this.disabledCardKkNum = false
        deep: true
      },
      isActiveArr(val) {
        let arr = []
        val.length > 0 ? val.forEach(v => Object.keys(this.louceng).forEach(key => this.louceng[key].item.forEach(v1 =>
          v1.id == v ? arr.push(v1) : ''))) : ""
        this.roomTableData = arr
      },
      tableChangeSum() {
        let sumPirce = this.getTablePice(this.roomTableData)
        let totolMoneny
        let checkInForm = this.checkInForm
        let settingInfo = this.settingInfo
        let bookingInfo = this.bookingInfo
        let HHstart_time = Moment(bookingInfo.start_time).format('HH:mm:ss')
        let HHend_time = Moment(bookingInfo.end_time).format('HH:mm:ss')
        let YYstart_time = Moment(bookingInfo.start_time).format('YYYY-MM-DD')
        let YYend_time = Moment(bookingInfo.end_time).format('YYYY-MM-DD')
        let chargeAmount = 0
        let couponMoney = 0
        let diffDay = Moment(YYend_time).diff(Moment(YYstart_time), 'days')
        // 需要支付的房费

        // 凌晨订房
        if (HHstart_time >= settingInfo.yzstart_time && HHstart_time < settingInfo.yzend_time) {
          //根据时间当天的房费
          totolMoneny = sumPirce * Number(settingInfo.yz_date) + sumPirce
          chargeAmount += sumPirce * Number(settingInfo.yz_date)
          // console.log(sums[2] * Number(settingInfo.yz_date))
          // console.log(sums[2])
          // 当天

          if (diffDay == 0) {
            // console.log('凌晨订房-结束时间当天')
            // 非会员
            if (!this.bookingInfo.member_card) {
              // console.log('凌晨订房-结束时间当天-非会员')
              // 下午退房时间之内按小时收费
              if (HHend_time > settingInfo.tfend_time1 && HHend_time <= settingInfo.tfend_time2) {
                // console.log('凌晨订房-结束时间当天-非会员-下午退房时间之内按小时收费')
                let hh = Number(Moment(bookingInfo.end_time).format('HH'))
                let mm = Number(Moment(bookingInfo.end_time).format('mm'))
                let hh1 = Number(settingInfo.tfend_time1.substring(0, 2))
                let mm2 = Number(settingInfo.tfend_time1.substring(3, 5))


                if (hh1 - hh == 0) {
                  // console.log('凌晨订房-结束时间当天-非会员-下午退房时间之内按小时收费-超过十几分钟')
                  totolMoneny += Number(settingInfo.tf_money1)
                  chargeAmount += Number(settingInfo.tf_money1)
                } else {
                  // console.log(mm , mm2)
                  // console.log(mm > mm2)
                  if (mm > mm2) {
                    // console.log('凌晨订房-结束时间当天-非会员-下午退房时间之内按小时收费-几个小时')
                    totolMoneny += Number(settingInfo.tf_money1) * ((hh - hh1) + 1)
                    chargeAmount += Number(settingInfo.tf_money1) * ((hh - hh1) + 1)
                    // console.log(hh1 - hh)
                    // console.log(Number(settingInfo.tf_money1))
                  } else {
                    // console.log('凌晨订房-结束时间当天-非会员-下午退房时间之内按小时收费-小时')
                    totolMoneny += Number(settingInfo.tf_money1) * (hh - hh1)
                    chargeAmount += Number(settingInfo.tf_money1) * (hh - hh1)
                  }
                }
              } else if (HHend_time > settingInfo.tfend_time2) {
                // 下午退房时间之内按天收费
                totolMoneny += sumPirce * Number(settingInfo.tf_date)
                chargeAmount += sumPirce * Number(settingInfo.tf_date)
              }
            } else {
              // 会员
              if (HHend_time > settingInfo.tfend_time1 && HHend_time <= settingInfo.membertf_end_time2) {
                let hh = Number(Moment(bookingInfo.end_time).format('HH'))
                let mm = Number(Moment(bookingInfo.end_time).format('mm'))
                let hh1 = Number(settingInfo.membertf_end_time1.substring(0, 2))
                let mm2 = Number(settingInfo.membertf_end_time1.substring(3, 5))
                if (hh - hh1 == 0) {
                  if (mm > mm2) {
                    totolMoneny += Number(settingInfo.membertf_tf_money1)
                    chargeAmount += Number(settingInfo.membertf_tf_money1)
                    couponMoney = Number(settingInfo.tf_money1) - Number(settingInfo.membertf_tf_money1)
                  } else {}
                } else {
                  if (mm > mm2) {
                    totolMoneny += Number(settingInfo.membertf_tf_money1) * ((hh - hh1) + 1)
                    chargeAmount += Number(settingInfo.membertf_tf_money1) * ((hh - hh1) + 1)
                    couponMoney = Number(settingInfo.tf_money1) * ((hh - hh1) + 1) - Number(settingInfo
                      .membertf_tf_money1) * ((hh - hh1) + 1)
                  } else {
                    totolMoneny += Number(settingInfo.membertf_tf_money1) * (hh - hh1)
                    chargeAmount += Number(settingInfo.membertf_tf_money1) * (hh - hh1)
                    couponMoney = Number(settingInfo.tf_money1) * (hh - hh1) - Number(settingInfo
                      .membertf_tf_money1) * (hh - hh1)
                  }
                }
              } else {
                totolMoneny += sumPirce * Number(settingInfo.membertf_tf_date)
                chargeAmount += sumPirce * Number(settingInfo.membertf_tf_date)
                couponMoney = sumPirce * Number(settingInfo.tf_date) - sumPirce * Number(settingInfo.membertf_tf_date)
              }
            }

          } else {
            // console.log(HHend_time > settingInfo.tfend_time1)
            // console.log(HHend_time <= settingInfo.tfend_time2)
            totolMoneny += sumPirce * (Number(diffDay))
            console.log('totolMoneny', totolMoneny)
            if (HHend_time > settingInfo.tfend_time1 && HHend_time <= settingInfo.membertf_end_time2) {
              // console.log(123)
              // 非会员
              if (!this.bookingInfo.member_card) {
                // 下午退房时间之内按小时收费
                if (HHend_time > settingInfo.tfend_time1 && HHend_time <= settingInfo.membertf_end_time2) {
                  let hh = Number(Moment(bookingInfo.end_time).format('HH'))
                  let mm = Number(Moment(bookingInfo.end_time).format('mm'))
                  let hh1 = Number(settingInfo.tfend_time1.substring(0, 2))
                  let mm2 = Number(settingInfo.tfend_time1.substring(3, 5))
                  if (hh - hh1 == 0) {
                    if (mm > mm2) {
                      totolMoneny += Number(settingInfo.membertf_tf_money1)
                      chargeAmount += Number(settingInfo.membertf_tf_money1)
                    } else {}
                  } else {
                    if (mm > mm2) {
                      totolMoneny += Number(settingInfo.tf_money1) * ((hh - hh1) + 1)
                      chargeAmount += Number(settingInfo.tf_money1) * ((hh - hh1) + 1)
                    } else {
                      totolMoneny += Number(settingInfo.tf_money1) * (hh - hh1)
                      chargeAmount += Number(settingInfo.tf_money1) * (hh - hh1)
                    }
                  }
                } else if (HHend_time > settingInfo.membertf_end_time2) {
                  // 下午退房时间之内按天收费
                  totolMoneny += sumPirce * Number(settingInfo.tf_date)
                  chargeAmount += sumPirce * Number(settingInfo.tf_date)
                }
              } else {
                // 会员
                if (HHend_time > settingInfo.membertf_end_time1 && HHend_time <= settingInfo.membertf_end_time2) {
                  let hh = Number(Moment(bookingInfo.end_time).format('HH'))
                  let mm = Number(Moment(bookingInfo.end_time).format('mm'))
                  let hh1 = Number(settingInfo.membertf_end_time1.substring(0, 2))
                  let mm2 = Number(settingInfo.membertf_end_time1.substring(3, 5))
                  if (hh - hh1 == 0) {
                    if (mm > mm2) {
                      totolMoneny += Number(settingInfo.membertf_tf_money1)
                      chargeAmount += Number(settingInfo.membertf_tf_money1)
                      couponMoney = Number(settingInfo.membertf_tf_money1) - Number(settingInfo.membertf_tf_money1)
                    } else {}
                  } else {
                    if (mm > mm2) {
                      totolMoneny += Number(settingInfo.membertf_tf_money1) * ((hh - hh1) + 1)
                      chargeAmount += Number(settingInfo.membertf_tf_money1) * ((hh - hh1) + 1)
                      couponMoney = Number(settingInfo.tf_money1) * ((hh - hh1) + 1) - Number(settingInfo
                        .membertf_tf_money1) * ((hh - hh1) + 1)
                    } else {
                      totolMoneny += Number(settingInfo.membertf_tf_money1) * (hh - hh1)
                      chargeAmount += Number(settingInfo.membertf_tf_money1) * (hh - hh1)
                      couponMoney = Number(settingInfo.tf_money1) * (hh - hh1) - Number(settingInfo
                        .membertf_tf_money1) * (hh - hh1)
                    }
                  }
                } else {
                  totolMoneny += sumPirce * Number(settingInfo.membertf_tf_date)
                  chargeAmount += sumPirce * Number(settingInfo.membertf_tf_date)
                  couponMoney = sumPirce * Number(settingInfo.tf_date) - sumPirce * Number(settingInfo.membertf_tf_date)
                }
              }
            }
          }
        } else {
          // 正常时间订房
          console.log('正常时间订房')
          if (diffDay == 0) {
            totolMoneny = sumPirce * (diffDay + 1)
          } else {
            totolMoneny = sumPirce * (diffDay)
            // 非会员
            if (!this.bookingInfo.member_card) {
              // 下午退房时间之内按小时收费
              if (HHend_time > settingInfo.tfend_time1 && HHend_time <= settingInfo.tfend_time2) {
                // console.log('正常时间订房-下午退房时间之内按小时收费')
                let hh = Number(Moment(bookingInfo.end_time).format('HH'))
                let mm = Number(Moment(bookingInfo.end_time).format('mm'))

                let hh1 = Number(settingInfo.tfend_time1.substring(0, 2))
                let mm2 = Number(settingInfo.tfend_time1.substring(3, 5))
                if (hh - hh1 == 0) {
                  if (mm > mm2) {
                    totolMoneny += Number(settingInfo.tf_money1)
                    chargeAmount += Number(settingInfo.tf_money1)

                  } else {}
                } else {
                  if (mm > mm2) {
                    totolMoneny += Number(settingInfo.tf_money1) * ((hh - hh1) + 1)
                    chargeAmount += Number(settingInfo.tf_money1) * ((hh - hh1) + 1)
                  } else {
                    totolMoneny += Number(settingInfo.tf_money1) * (hh - hh1)
                    chargeAmount += Number(settingInfo.tf_money1) * (hh - hh1)
                  }
                }
              } else if (HHend_time > settingInfo.tfend_time2) {
                // 下午退房时间之内按天收费
                totolMoneny += sumPirce * Number(settingInfo.tf_date)
                chargeAmount += sumPirce * Number(settingInfo.tf_date)
              } else {}
            } else {
              // 会员
              if (HHend_time > settingInfo.membertf_end_time1 && HHend_time <= settingInfo.membertf_end_time2) {
                let hh = Number(Moment(bookingInfo.membertf_end_time1).format('HH'))
                let mm = Number(Moment(bookingInfo.membertf_end_time1).format('mm'))
                let hh1 = Number(settingInfo.membertf_end_time1.substring(0, 2))
                let mm2 = Number(settingInfo.membertf_end_time1.substring(3, 5))
                if (hh - hh1 == 0) {
                  if (mm > mm2) {
                    totolMoneny += Number(settingInfo.membertf_tf_money1)
                    chargeAmount += Number(settingInfo.membertf_tf_money1)
                    couponMoney = Number(settingInfo.tf_money1) - Number(settingInfo.membertf_tf_money1)
                  } else {}
                } else {
                  if (mm > mm2) {
                    totolMoneny += Number(settingInfo.membertf_tf_money1) * ((hh - hh1) + 1)
                    chargeAmount += Number(settingInfo.membertf_tf_money1) * ((hh - hh1) + 1)
                    couponMoney = Number(settingInfo.tf_money1) * ((hh - hh1) + 1) - Number(settingInfo
                      .membertf_tf_money1) * ((hh - hh1) + 1)
                    console.log(couponMoney)
                  } else {
                    totolMoneny += Number(settingInfo.membertf_tf_money1) * (hh - hh1)
                    chargeAmount += Number(settingInfo.membertf_tf_money1) * (hh - hh1)
                    couponMoney = Number(settingInfo.tf_money1) * (hh - hh1) - Number(settingInfo
                      .membertf_tf_money1) * (hh - hh1)
                  }
                }
              } else if (HHend_time > settingInfo.membertf_end_time2) {
                totolMoneny += sumPirce * Number(settingInfo.membertf_tf_date)
                chargeAmount += sumPirce * Number(settingInfo.membertf_tf_date)
                couponMoney = sumPirce * Number(settingInfo.tf_date) - sumPirce * Number(settingInfo.membertf_tf_date)
              }
            }
          }
        }
        this.checkInForm.RoomSumMoney = Number(totolMoneny).toFixed(2)
        console.log('chargeAmount', chargeAmount)
        console.log('couponMoney', couponMoney)
        this.checkInForm.chargeAmount = chargeAmount.toFixed(2)
        this.checkInForm.couponMoney = couponMoney.toFixed(2)
        this.checkInForm.residueMoney = Number(totolMoneny).toFixed(2) - Number(bookingInfo.pre_money)
        if (bookingInfo.member_card) {
          this.checkInForm.RoomSumMoney = Number(totolMoneny).toFixed(2) * (Number(this.VIPInfo.discount) / 100)
          this.checkInForm.residueMoney = (Number(totolMoneny).toFixed(2) * (Number(this.VIPInfo.discount) / 100)) -
            Number(bookingInfo.pre_money)
        }
      }
    },
    created() {
      this.getRows()
      this.getMoneyWay()
    },
    methods: {
      submitForm() {
        this.$refs.checkInForm.validate((valid) => {
          if (valid) {
            let bookingInfo = this.bookingInfo
            let checkInForm = this.checkInForm
            let params = {
              id: bookingInfo.id,
              type: bookingInfo.type,
              groupname: bookingInfo.groupname,
              nationality: bookingInfo.nationality,
              zhengjian: bookingInfo.zhengjian,
              tel: bookingInfo.tel,
              member_card: bookingInfo.member_card,
              name: bookingInfo.name,
              zhengjian_no: bookingInfo.zhengjian_no,
              address: bookingInfo.address,
              start_time: bookingInfo.start_time,
              end_time: bookingInfo.end_time,
              datecount: bookingInfo.datecount,
              roomtype_info: this.setTableRoomPrice(this.roomTableData),
              count_money: checkInForm.RoomSumMoney,
              yajin_money: checkInForm.deposit,
              pre_money: bookingInfo.pre_money,
              is_card_pay: checkInForm.is_card_pay,
              card_money: checkInForm.payCardMoney,
              paymethod: checkInForm.payfor,
              other_pay_money: checkInForm.advanceMoney,
              total_count: Number(checkInForm.RoomSumMoney) + Number(checkInForm.deposit),
              jia_money: checkInForm.chargeAmount,
              discount_money: checkInForm.couponMoney,
            }
            orderlivein(params).then(res => {
              res = typeof res == "string" ? JSON.parse(res) : res;
              console.log(res)
              if (res.code == 0) {
                if (res.data == 1) {
                  this.message('success', res.message)
                  this.CheckInDialogVisible = false
                  this.getRows()
                }
              } else {
                this.message("error", res.message)
              }
            })
          }
        })
      },
      // 获取table总价格
      getTablePice(v) {
        let sum = 0
        v.forEach(v => {
          console.log(v.price)
          sum += Number(v.price)
        });
        return Number(sum)
      },
      // 获取房间名房间数
      setTableRoomPrice(v) {
        console.log(v)
        let str = ""
        v.forEach(item => {
          str += `${item.id},${item.roomtype},${item.room_no},${item.price},${item.floor},${item.kx_count};`
        });
        str = str.substring(0, str.length - 1)
        console.log('tag', str)
        return str
      },
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
      // 计费设置
      getMoneyWay() {
        settingInfo().then(res => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          console.log(res)
          if (res.code == 0) {
            this.settingInfo = res.data
          } else {
            this.message("error", res.message)
          }
        })
      },

      // 可选房型查询
      handleChangeRoomType() {
        orderYdroomtype({
          start_time: getAllTime(this.bookingInfo.start_time),
          roomtype: this.setCheckRoomTypeStr(this.checkRoomType),
          end_time: getAllTime(this.bookingInfo.end_time)
        }).then(res => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          // console.log(res)
          if (res.code == 0) {
            this.$forceUpdate()
            this.roomType = res.data
            this.louceng = res.room_list
          } else {
            this.$forceUpdate()
            this.message("error", res.message)
          }
        })
      },
      setCheckRoomTypeStr(v) {
        let str = ""
        v.forEach(element => {
          str += element + ","
        });
        str = str.substring(0, str.length - 1)
        // console.log(str)
        return str
      },
      bookingRoom(id) {
        this.getPaymethodList()
        this.CheckInDialogVisible = true
        orderInfo({
          id
        }).then(async res => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          console.log(res, 'orderInfo')
          if (res.code == 0) {
            let {
              data
            } = res
            this.bookingInfo = data
            let params = {
              start_time: data.start_time,
              end_time: data.end_time,
              order_id: data.id
            }
            await this.cheackRoom(params, data)
            this.IsVIPserarch(data.tel, data.member_card)
          } else {
            this.message("error", res.message)
          }
        })
      },
      //充值方式
      getPaymethodList() {
        paymethod().then(res => {
          res = JSON.parse(res);
          // console.log(res, "获取充值列表");
          if (res.code === 0) {
            this.payForForhod = res.data;
          } else {
            this.message("error", res.message);
          }
        });
      },
      // 查询是否是会员
      IsVIPserarch(member_card, vipcard) {
        if (!vipcard) {
          return
        }
        orderMemberinfo({
          member_card
        }).then(res => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          console.log(res, 'orderMemberinfo')
          if (res.code == 0) {
            this.VIPInfo = res.data
            this.vipCardMoney = res.data.balance + '余额'
            this.disabledMeber = false
          } else {
            this.message("error", res.message)
          }
        })
      },
      // 查询可选房型
      cheackRoom(v, data) {
        orderYdroomtype(v).then(res => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          console.log(res, 'orderYdroomtype')
          if (res.code == 0) {
            this.roomType = res.data
            this.louceng = res.room_list
            data.room_info.forEach((v, i) => this.$set(this.isActiveArr, i, v.room_id))
          } else {
            this.message("error", res.message)
          }
        })
      },
      chooseRoom(v) {
        let roomTableData = this.roomTableData
        let len = -1
        try {
          roomTableData.forEach((item, index) => {
            if (item.id == v.id) {
              len = index
              throw new Error("end")
            } else {
              len = -1
            }
          })
        } catch (e) {}
        if (len >= 0) {
          roomTableData.splice(len, 1)
          this.isActiveArr.splice(len, 1)
          this.$forceUpdate()
          return
        }
        roomTableData.push(v);
        this.isActiveArr.push(v.id);
        this.$forceUpdate()
      },
      // 时间选择器change
      handleChangePicker() {
        let start = getAllTime(this.BookingForm.value1[0])
        let end = getAllTime(this.BookingForm.value1[1])
        if (!start || !end) {
          this.getRows()
        }
        this.getRows(start, end)
      },
      // inputChange时间
      handleChangeOfTel() {
        if (!this.BookingForm.name) {
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
      handleReduce(i, v) {
        let roomTableData = this.roomTableData;
        roomTableData.splice(i, 1);
        this.isActiveArr.forEach((item, i) => {
          if (v.id === item) {
            this.isActiveArr.splice(i, 1)
          }
        })
      },

      // 设置最后一行合计
      getSumMoney({
        columns,
        data
      }) {
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 1 || index === 4) {
            return;
          }
          const values = data.map((item) => Number(item[column.property]));
          if (!values.every((value) => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index];
          } else {
            sums[index] = "结算";
          }
        });
        if (sums[3] != '结算') {
          this.checkInForm.fangfei = sums[3]
        }

        return sums;
      },
      CheckInDialogVisibleClose() {
        this.bookingInfo = {}
        this.VIPInfo = ""
        this.payForForhod = ""
        this.disabledMeber = true
        this.disabledCardKkNum = true
        this.vipCardMoney = ""

        this.roomType = []
        this.checkRoomType = []
        this.louceng = ""
        this.isActiveArr = []
        this.checkInForm = {}



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
      handleDetail(row) {
        console.log(row)
        this.detail = row
        this.detailDialogVisible = true;
      },


    }
  };
</script>

<style lang="less" scoped>
  div /deep/.activeBlue {
    border: 1px solid #f00 !important;
    color: #f00 !important;
    padding: 5px 10px !important;
    margin: 0 10px 10px 0 !important;

    span {
      display: block !important;
      font-size: 14px !important;
      cursor: pointer !important;
    }
  }

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
        min-height: 30px;
        background: #f9f9f9;
        padding: 20px 20px 0;
        margin: 10px 0 20px;

        /deep/.el-checkbox {
          text-align: left;
          display: block;
          margin-bottom: 20px;
        }

        .chooseRoomRight {
          max-height: 280px;
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

            .fangjian {
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