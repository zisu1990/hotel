<template>
  <el-container>
    <el-main>
      <h2>入住登记</h2>
      <div class="checkWarp">
        <el-form ref="checkInForm" :model="checkInForm" :rules="checkInRef" label-width="140px">
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8">
              <el-form-item label="客户类型：">
                <el-select
                  v-model="checkInForm.personType"
                  placeholder="选择客客户类型"
                  :style="{width: '100%'}"
                >
                  <el-option
                    v-for="(item, index) in personTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="团体名称：">
                <el-input
                  v-model="checkInForm.teamName"
                  placeholder="请输入团体名称"
                  clearable
                  :style="{width: '100%'}"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="国籍：">
                <el-select v-model="checkInForm.native" placeholder="选择国籍" :style="{width: '100%'}">
                  <el-option
                    v-for="(item, index) in nativeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8" style="display:flex; align-content: center;">
              <el-form-item label="证件类型：">
                <el-select
                  v-model="checkInForm.certificate"
                  placeholder="选择证件类型"
                  :style="{width: '100%'}"
                >
                  <el-option
                    v-for="(item, index) in certificateOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-button type="primary" class="duCard">读身份证</el-button>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话：">
                <el-input
                  v-model="checkInForm.tel"
                  placeholder="请输入联系电话"
                  clearable
                  :style="{width: '100%'}"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="会员卡号：">
                <el-input
                  v-model="checkInForm.vipNumber"
                  placeholder="请输入会员卡号"
                  clearable
                  :style="{width: '100%'}"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8">
              <el-form-item label="客主姓名：">
                <el-input
                  v-model="checkInForm.name"
                  placeholder="请输入客主姓名"
                  clearable
                  :style="{width: '100%'}"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码：">
                <el-input
                  v-model="checkInForm.idNumber"
                  placeholder="请输入证件号码"
                  clearable
                  :style="{width: '100%'}"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button
                type="success"
                round
                class="checkIn-search"
                @click="ResidentsDialogVisible=true"
              >住客登记查询</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="24">
              <el-form-item label="证件地址：">
                <el-input
                  v-model="checkInForm.adderss"
                  placeholder="请输入证件地址"
                  clearable
                  :style="{width: '100%'}"
                ></el-input>
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
                <el-input
                  v-model="checkInForm.days"
                  placeholder
                  clearable
                  :style="{width: '40%'}"
                  class="days"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <p class="chooseTitle">可选房型：</p>
          <div class="chooseRoom">
            <el-row :gutter="20" type="flex" justify="left">
              <el-col :span="8">
                <el-check-group v-model="roomType">
                  <el-checkbox
                    v-for="(v,i) in roomType"
                    :key="i"
                    :name="v.roomtype"
                  >{{v.roomtype}}({{v.sheng}}/{{v.sum}})</el-checkbox>
                </el-check-group>
              </el-col>

              <el-col :span="16" class="chooseRoomRight">
                <div class="floorItem" v-for="(v,i) in louceng" :key="i">
                  <p>{{v.floor}}：</p>
                  <ul>
                    <li v-for="(f,id) in v.listItem" :key="id">
                      <span>{{f.floorNo}}</span>
                      <span>{{f.type}}</span>
                    </li>
                  </ul>
                </div>
              </el-col>
            </el-row>
          </div>
          <p class="chooseTitle">已选客房：</p>
          <el-row>
            <el-col :span="24">
              <el-table
                stripe
                :header-cell-style="tableStyle"
                :cell-style="tableStyle"
                :data="roomTableData"
                style="width: 100%"
                 max-height="500px"
              >
                <el-table-column prop="homeName" label="房间类型" width="150px"></el-table-column>
                <el-table-column prop="roomNum" label="房间号"></el-table-column>
                <el-table-column prop="pric" label="房间单价(元)"></el-table-column>
                <el-table-column prop="sum" label="房间数">
                  <template slot-scope="scope">
                    <div class="roomSetting">
                      <el-button size="mini" icon="el-icon-minus" type="danger" @click="handleReduce(scope.$index, scope.row)"></el-button>
                      <el-input v-model="scope.row.sum"></el-input>
                      <el-button size="mini"    icon="el-icon-plus"  type="primary" @click="handleAdd(scope.$index, scope.row)"></el-button>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="suMoney" label="房间费用"></el-table-column>
              </el-table>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" justify="left">
            <el-col :span="8">
              <el-form-item label="房费总金额（元）：">
                <el-input v-model="checkInForm.RoomSumMoney" disabled :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="押金（元）：">
                <el-input v-model="checkInForm.deposit" :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="已付预款（元）：">
                <el-input v-model="checkInForm.advancePay" :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" justify="left">
            <el-col :span="8">
              <el-form-item label="应交预付款（元）：">
                <el-input v-model="checkInForm.RoomSumMoney" disabled :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预付方式：">
                <el-select
                  v-model="checkInForm.payfor"
                  placeholder="选择支付方式"
                  :style="{width: '100%'}"
                >
                  <el-option label="现金" value="1"></el-option>
                  <el-option label="支付宝" value="2"></el-option>
                  <el-option label="微信" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预付金额（元）：">
                <el-input v-model="checkInForm.advanceMoney" :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" justify="left">
            <el-col :span="16" style="display:flex; align-content: center;">
              <el-form-item label="会员卡支付：">
                <el-select
                  v-model="checkInForm.isCardPayfor"
                  placeholder="选择支付方式"
                  :style="{width: '100%'}"
                >
                  <el-option label="会员卡支付" value="1"></el-option>
                  <el-option label="否" value="2"></el-option>
                </el-select>
              </el-form-item>
              <span
                style="font-size:14px; color:#005AB9; padding-top:10px;padding-left:5px;"
              >余额：300元</span>
            </el-col>
            <el-col :span="8">
              <el-form-item label="卡扣金额（元）：">
                <el-input v-model="checkInForm.cardPayfor" :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" justify="center" class="btn">
            <el-button>重置</el-button>
            <el-button type="primary" @click="GateCardDialogVisible=true">确认</el-button>
          </el-row>
        </el-form>
      </div>

      <!-- 住客登记查询 -->
      <el-dialog title="住客登记查询" :visible.sync="ResidentsDialogVisible" width="50%" center>
        <el-table :data="ResidentsTableData" style="width: 100%" border>
          <el-table-column prop="roomNum" label="房间号" width="80" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" width="100" align="center"></el-table-column>
          <el-table-column prop="sex" label="性别" width="80" align="center"></el-table-column>
          <el-table-column prop="cardType" label="证件类型" width="80" align="center"></el-table-column>

          <el-table-column prop="address" label="证件地址" align="center"></el-table-column>
          <el-table-column prop="operation" label="操作" align="center" width="80">
            <template>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ResidentsDialogVisible = false">取 消</el-button>
          <el-button type="success">读取身份证</el-button>
          <el-button type="primary" @click="ResidentsDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 门卡写入 -->
      <el-dialog title="门卡写入" :visible.sync="GateCardDialogVisible" width="50%" center>
        <el-table :data="GateCardTableData" style="width: 100%" border>
          <el-table-column prop="roomNum" label="房间号" width="80" align="center"></el-table-column>
          <el-table-column prop="time" label="入住时间" align="center"></el-table-column>
          <el-table-column prop="cardSum" label="卡数量" width="80" align="center"></el-table-column>
          <el-table-column prop="operation" label="操作" align="center" width="150">
            <template>
              <el-button type="warning" size="small">清卡</el-button>
              <el-button type="primary" size="small">读卡</el-button>
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer" style="text-align:center;">
          <el-button @click="payforDialogVisible = true">下一步</el-button>
        </span>
      </el-dialog>

      <!-- 预付款单打印 -->
      <el-dialog title="预付款单" :visible.sync="payforDialogVisible" width="50%">
        <ul class="payForList">
          <li>
            <span>单据号：12345688</span>
            <span>房间号：8102</span>
            <span>同住房号：8103</span>
          </li>
          <li>
            <span>姓名：张三</span>
            <span>性别：男</span>
            <span>身份证号：340881199921004896</span>
          </li>
          <li>
            <span>入住时间：2020-11-04 14:47</span>
            <span>预离时间：2020-11-08 14:00</span>
          </li>
          <li>
            <span>消费类型：住宿预交款（含押金）</span>
            <span>金额：1000元</span>
          </li>
          <li>
            <span>收款时间：2020-11-04 14:47</span>
          </li>
          <li>
            <p>注：1、续住请在14时前到总台办理；</p>
            <p>2、入住时间超过次日14—18时加收房费半价，超过18时按一天结账；</p>
            <p>3、请妥善保管好您的贵重物品。</p>
          </li>
          <li>
            <span>宾客电话：13156894556</span>
            <span>本酒店电话：0551-68686868</span>
            <span>打印时间：2020-11-04 14:47</span>
          </li>
        </ul>
        <div class="qianzi">客户签字：</div>

        <span slot="footer" class="dialog-footer" style="text-align:center;">
          <el-button @click="budayin">暂不打印</el-button>
          <el-button type="primary" @click="dayin">打印</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    var bookMoney = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("预订金额不能为空"));
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
      checkInForm: {
        personType: "",
        teamName: "",
        certificate: "",
        tel: "",
        vipNumber: "",
        name: "",
        idNumber: "",
        adderss: "",
        value1: "",
        value2: "",
        days: "4天",
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
      personTypeOptions: [
        {
          label: "散客",
          value: 1
        },
        {
          label: "团体",
          value: 2
        }
      ],
      nativeOptions: [
        {
          label: "中国",
          value: 1
        },
        {
          label: "美国",
          value: 2
        }
      ],
      certificateOptions: [
        {
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
      roomType: [
        {
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
      louceng: [
        {
          floor: "1楼",
          listItem: [
            {
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
          listItem: [
            {
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
          listItem: [
            {
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
      // 表格对应的数据
      roomTableData: [
        {
          homeName: "单人间",
          roomNum: 8102,
          pric: 200,
          suMoney: 0,
          sum: 0
        },

        {
          homeName: "标间",
          roomNum: 8104,
          pric: 200,
          suMoney: 0,
          sum: 0
        },
        {
          homeName: "三人间",
          roomNum: 8105,
          pric: 200,
          suMoney: 0,
          sum: 0
        },

        {
          homeName: "五人间",
          roomNum: 8106,
          pric: 200,
          suMoney: 0,
          sum: 0
        },
        {
          homeName: "十人间",
          roomNum: 8108,
          pric: 200,
          suMoney: 0,
          sum: 0
        }
      ],
      // 表格样式
      tableStyle: {
        textAlign: "center"
      },

      // 弹框住客登记、
      ResidentsDialogVisible: false,
      // 住客登记表格
      ResidentsTableData: [
        {
          roomNum: 8102,
          name: "张三",
          sex: "男",
          cardType: "身份证",
          address: "安徽省合肥市滨湖新区西藏路"
        }
      ],
      // 门卡写入
      GateCardDialogVisible: false,
      // 门卡写入表格
      GateCardTableData: [
        {
          roomNum: 8102,
          time: "2020-11-11 10:20:45—2020-11-12 14:00:00",
          cardSum: 1
        },
        {
          roomNum: 8104,
          time: "2020-11-11 10:20:45—2020-11-12 14:00:00",
          cardSum: 1
        },
        {
          roomNum: 8104,
          time: "2020-11-11 10:20:45—2020-11-12 14:00:00",
          cardSum: 1
        },
        {
          roomNum: 8104,
          time: "2020-11-11 10:20:45—2020-11-12 14:00:00",
          cardSum: 1
        }
      ],

      // 酒店预付款单打印
      payforDialogVisible: false
    };
  },
  methods: {
    // 加，减，总
    handleAdd(i, t) {
      let roomTableData = this.roomTableData[i];
      roomTableData.sum += 1;
      roomTableData.suMoney += roomTableData.pric;
    },
    handleReduce(i, t) {
      let roomTableData = this.roomTableData[i];
      if (roomTableData.sum - 1 < 0) {
        this.$message({
          message: "输入的值不能小于0",
          type: "warning"
        });
        return;
      } else {
        roomTableData.sum -= 1;
        roomTableData.suMoney -= roomTableData.pric;
      }
    },
    dayin() {
      this.payforDialogVisible = false;
      this.GateCardDialogVisible = false;
    },
    budayin() {
      this.payforDialogVisible = false;
      this.GateCardDialogVisible = false;
    }
  }
};
</script>


<style lang="less" scoped>
.el-main {
  background: #fff;
  h2 {
    margin-top: 20px;
    font-size: 26px;
    color: #005ab9;
    font-weight: normal;
  }
  .checkWarp {
    width: 70%;
    margin-left: 15%;
    margin-top: 40px;
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
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 256px;
}
/deep/.el-checkbox {
  font-size: 18px;
}
/deep/.el-checkbox__inner {
  width: 20px;
  height: 20px;
}
/deep/.el-checkbox__inner::after {
  height: 11px;
  left: 8px;
  top: 2px;
}
/deep/.el-checkbox__label {
  font-size: 18px;
  line-height: 20px;
}
</style>


