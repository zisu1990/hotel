<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :offset="3" :span="18">
          <el-row>
            <p class="title">换房登记</p>
          </el-row>
          <el-form ref="formRoomChange" label-width="130px" :model="formRoomChange" :rules="rules">
            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="客户类型：">
                  <el-input disabled v-model="formRoomChange.type"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="团体名称：">
                  <el-input disabled v-model="formRoomChange.groupname"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="国籍：">
                  <el-input disabled v-model="formRoomChange.nationality"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7" style="display: flex; align-content: center">
                <el-form-item label="证件类型：">
                  <el-input disabled v-model="formRoomChange.nationality"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="联系电话：">
                  <el-input disabled v-model="formRoomChange.tel"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="会员卡号：">
                  <el-input disabled v-model="formRoomChange.member_card"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="客主姓名：">
                  <el-input disabled v-model="formRoomChange.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="证件号：">
                  <el-input disabled v-model="formRoomChange.zhengjian_no"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="离店时间：">
                  <el-input disabled v-model="formRoomChange.end_time"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="已付金额(元)：">
                  <el-input disabled v-model="formRoomChange.count_money"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="原客房类型：">
                  <el-input disabled v-model="formRoomChange.roomtype"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="原房间号：">
                  <el-input disabled v-model="formRoomChange.room_no"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="原房价(元)：">
                  <el-input disabled v-model="formRoomChange.price"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="会员卡支付：">
                  <el-select v-model="formRoomChange.isVipPay" style="width: 100%">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                  </el-select>
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

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="新客房类型：" prop="newRoomType">
                  <el-select v-model="formRoomChange.newRoomType" style="width: 100%">
                    <el-option label="三人间" value="three"></el-option>
                    <el-option label="两人间" value="two"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="新房号(元)：" prop="newRoomNum">
                  <el-input clearable v-model="formRoomChange.newRoomNum"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="新房价(元)：" prop="newRoomPrice">
                  <el-input clearable v-model="formRoomChange.newRoomPrice"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="卡扣金额：">
                  <el-input clearable v-model="formRoomChange.cardKkNum"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="预付款方式：" prop="payWay">
                  <el-select v-model="formRoomChange.payWay" style="width: 100%">
                    <el-option label="现金" value="xianjin"></el-option>
                    <el-option label="支付宝" value="zhifubao"></el-option>
                    <el-option label="微信" value="weixin"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="预付订金额：" prop="bookMoney">
                  <el-input clearable v-model="formRoomChange.bookMoney"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" style="margin-top: 20px" justify="start">
              <el-col :span="22">
                <el-form-item label="备注：" prop="remark">
                  <el-input type="textarea" v-model="formRoomChange.remark" placeholder="填写备注"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="start">
              <el-col :span="12">
                <p class="handleStaff">
                  <span>操作员：店小二</span>
                  <span>操作时间：2020-11-11 15:20</span>
                </p>
              </el-col>
            </el-row>

            <el-row style="margin-top: 30px">
              <el-form-item>
                <el-button style="width: 100px" @click="resetForm">重置</el-button>
                <el-button style="width: 100px" size="medium" type="primary" @click="submitForm">确认</el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
  import {
    orderRoom_order
  } from '@/api/RoomChange.js';
  export default {
    data() {
      var bookMoney = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("预付定金额不能为空"));
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
        formRoomChange: {
          clientType: "",
          groupName: "",
          nationality: "",
          IDtype: "",
          phoneNum: "",
          cardNum: "",
          username: "",
          IDcardNum: "",
          goInTime: "",
          haveImprest: "",
          oldRoomType: "",
          oldRoomNum: "",
          oldRoomPrice: "",
          newRoomType: "",
          newRoomNum: "",
          newRoomPrice: "",
          newRoomNum: "",
          isVipPay: "",
          cardKkNum: "",
          payWay: "",
          bookMoney: "",
          remark: "",
        },
        //   表单规则
        rules: {},
        roomType: [{
            roomtype: "单人间",
            sheng: 10,
            sum: 30,
          },
          {
            roomtype: "标间",
            sheng: 10,
            sum: 30,
          },
          {
            roomtype: "三人间",
            sheng: 10,
            sum: 30,
          },
          {
            roomtype: "五人间",
            sheng: 10,
            sum: 30,
          },
          {
            roomtype: "十人间",
            sheng: 10,
            sum: 30,
          },
          {
            roomtype: "钟点房",
            sheng: 10,
            sum: 30,
          },
        ],
        louceng: [{
            floor: "1楼",
            listItem: [{
                id: 1,
                floorNo: 8102,
                status: "预订中",
                type: "三人间",
                background: "#FCB634",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 2,
                floorNo: 8103,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 3,
                floorNo: 8104,
                status: "入住中",
                type: "五人间",
                background: "#FE775E",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 4,
                floorNo: 8105,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 5,
                floorNo: 8106,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 6,
                floorNo: 8107,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 7,
                floorNo: 8108,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 8,
                floorNo: 8102,
                status: "预订中",
                type: "三人间",
                background: "#FCB634",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 9,
                floorNo: 8103,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 10,
                floorNo: 8104,
                status: "入住中",
                type: "五人间",
                background: "#FE775E",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 11,
                floorNo: 8105,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 12,
                floorNo: 8106,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 13,
                floorNo: 8107,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 14,
                floorNo: 8108,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png",
              },
            ],
          },
          {
            floor: "2楼",
            listItem: [{
                id: 24,
                floorNo: 8102,
                status: "预订中",
                type: "三人间",
                background: "#FCB634",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 25,
                floorNo: 8102,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 26,
                floorNo: 8102,
                status: "预订中",
                type: "三人间",
                background: "#FCB634",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 27,
                floorNo: 8103,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 28,
                floorNo: 8104,
                status: "入住中",
                type: "五人间",
                background: "#FE775E",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 29,
                floorNo: 8105,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 30,
                floorNo: 8106,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 31,
                floorNo: 8107,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 32,
                floorNo: 8108,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 33,
                floorNo: 8108,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png",
              },
            ],
          },
          {
            floor: "3楼",
            listItem: [{
                id: 15,
                floorNo: 8102,
                status: "预订中",
                type: "三人间",
                background: "#FCB634",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 16,
                floorNo: 8102,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 17,
                floorNo: 8102,
                status: "预订中",
                type: "三人间",
                background: "#FCB634",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 18,
                floorNo: 8103,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 19,
                floorNo: 8104,
                status: "入住中",
                type: "五人间",
                background: "#FE775E",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 20,
                floorNo: 8105,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 21,
                floorNo: 8106,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 22,
                floorNo: 8107,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 23,
                floorNo: 8108,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 34,
                floorNo: 8108,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 35,
                floorNo: 8108,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png",
              },
              {
                id: 36,
                floorNo: 8108,
                status: "空闲中",
                type: "五人间",
                background: "#005AB9",
                icon: "@/assets/image/zhong.png",
              },
            ],
          },
        ],
        // 房间id，房号
        roomInfo: {},
      };
    },
    created() {
      this.roomInfo.room_no = this.$route.query.room_no
      this.roomInfo.room_id = this.$route.query.id
      this.getRows()
    },
    methods: {
      getRows() {
        orderRoom_order(
          this.roomInfo
        ).then(res => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          console.log(res)
          if (res.code == 0) {
            let {
              data
            } = res
            this.formRoomChange = data
          } else {
            this.message("error", res.message)
          }
        })
      },
      // 提交表单
      submitForm() {
        this.$refs.formRoomChange.validate((valid) => {
          if (valid) {
            alert("submit!");
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      // 重置表单
      resetForm() {
        this.$refs.formRoomChange.resetFields();
      },
    },
  };
</script>
<style lang="less" scoped>
  .el-main {
    background: #fff;
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
</style>

<style scoped>
  /* .el-form-item {
  margin-bottom: 35px !important;
} */
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
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

  .duCard {
    height: 40px;
    line-height: 40px;
    margin-left: 5px;
    padding: 0 5px;
  }
</style>