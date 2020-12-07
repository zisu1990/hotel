<template>
  <el-container>
    <el-main>
      <el-card>
        <span @click="pushPage(item)" class="hv" v-for="(item, index) in navList" :key="index">{{ item.name }}</span>
      </el-card>
      <div class="roomTip">
        <span v-for="item in roomTip" :key="item.key">
          <b :style="{ background: item.background }">{{ item.text }}</b>
          {{ item.sum }}
        </span>
      </div>
      <el-card class="floorItem">
        <el-collapse :value="opened">
          <el-collapse-item v-for="(f, i) in louceng" :key="i" :name="f.floor">
            <template slot="title">
              <i class="iconBlue"></i>
              {{ f.floor }}
            </template>

            <ul class="floorList">
              <li v-for="v in f.floorItem" :key="v.id" :style="{ background: v.background }">
                <div class="roomStatus">
                  <span>{{ v.room_no }}</span>
                  <span>{{ v.roomtype }}</span>
                </div>
                <p>{{ v.status | updataStatus }}</p>
              </li>
            </ul>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </el-main>

    <el-aside width="250px">
      <div class="aside-top">
        <span>营业实况/房间检索</span>
        <div class="roomType">
          <div>
            <div class="roomType-title">
              <span class="iconBlue"></span>
              <h2>房间</h2>
            </div>
            <div class="roomType-choose">
              <el-checkbox-group @change="checkChangeRoom" v-model="checkRoomState">
                <el-checkbox :label="item.id" v-for="(item,index) in roomState" :key="index">{{ item.name }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>

        <div class="roomType">
          <div>
            <div class="roomType-title">
              <span class="iconBlue"></span>
              <h2>房型</h2>
            </div>
            <div class="roomType-choose">
              <el-checkbox-group @change="handleChangeRoomType" v-model="checkRoomType">
                <el-checkbox v-for="(v, i) in roomType" :key="i" :label="v.name">
                  {{ v.name }}</el-checkbox>
              </el-checkbox-group>
              <!-- ({{ v.sheng }}/{{ v.sum }}) -->
            </div>
          </div>
        </div>
        <div class="roomType">
          <div>
            <div class="roomType-title">
              <span class="iconBlue"></span>
              <h2>房态维护</h2>
            </div>
            <ul class="roomType-icon">
              <li>
                <img src="@/assets/image/cleaning.png" alt srcset />
                <span>打扫</span>
              </li>
              <li>
                <img src="@/assets/image/repair.png" alt srcset />
                <span>维修</span>
              </li>
              <li>
                <img src="@/assets/image/repairOver.png" alt srcset />
                <span>维修结束</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="aside-bottom">
        <div class="roomType">
          <div>
            <div class="roomType-title">
              <span class="iconBlue"></span>
              <h2>系统消息</h2>
            </div>
            <div class="systemMessage">
              <p>
                <span>已读:</span>
                XX预订房间 即将到期,请及时处理.
              </p>
              <p>
                <span>未读:</span>
                XX预订房间 即将到期,请及时处理.
              </p>
            </div>
          </div>
        </div>
      </div>
    </el-aside>
  </el-container>
</template>
<script>
  import {
    roomstateList,
    roomsRoomcount,
    roomLists,
    roomtypeLists
  } from "@/api/RoomFirstPage.js";
  export default {
    data() {
      return {
        // 房态标识
        roomTip: [{
            text: "总",
            background: "#666",
            sum: 0,
          },

          {
            text: "空",
            background: "#005AB9",
            sum: 0,
          },
          {
            text: "订",
            background: "#FCB634",
            sum: 0,
          },
          {
            text: "住",
            background: "#FE775E",
            sum: 0,
          },
          {
            text: "住脏",
            background: "#FE775E",
            sum: 0,
          },
          {
            text: "脏",
            background: "#989898",
            sum: 0,
          },
          {
            text: "修",
            background: "#A763EE",
            sum: 0,
          },
        ],
        roomState: [],
        checkRoomState: [],
        roomType: [],
        checkRoomType: [],

        // 楼层数据
        louceng: [],
        // 客房业务导航
        navList: [{
            name: "预订",
            path: "RoomBooking",
          },
          {
            name: "入住",
            path: "Check_in",
          },
          {
            name: "补录住客",
            path: "Replenishuser",
          },
          {
            name: "续住",
            path: "StayOver",
          },
          {
            name: "换房",
            path: "RoomChange",
          },
          {
            name: "退房",
            path: "CheckOut",
          },
          {
            name: "房卡管理",
            path: "RoomCard",
          },
          {
            name: "损赔录入",
            path: "DamageRecad",
          },
          {
            name: "换班结算",
            path: "ShiftWorkPage",
          },
          {
            name: "重新登陆",
            path: "login",
          },
        ],
      };
    },
    created() {
      this.getRows();
    },
    filters: {
      updataStatus(v) {
        let str = "";
        switch (v) {
          case 1:
            str = "空净房";
            break;
          case 2:
            str = "空脏房";
            break;
          case 3:
            str = "住净房";
            break;
          case 4:
            str = "住脏房";
            break;
          case 5:
            str = "预定发";
            break;
          case 6:
            str = "维修费";
            break;
          default:
            str = "未知";
        }
        return str;
      },
    },
    computed: {
      opened() {
        return this.louceng.map((i) => {
          return i.floor;
        });
      },
    },
    methods: {
      pushPage(data) {
        this.isShowRoute = true;
        // console.log(data.path);
        this.$router.push({
          path: data.path,
        });
      },
      getRows() {
        this.getTotalState();
        this.getStateLists();
        this.getroomtypeLists()
        roomLists().then((res) => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          // console.log(res.data);
          if (res.code == 0) {
            let {
              data
            } = res;
            let arr = [];
            Object.keys(data).forEach((key, index) => {
              arr[index] = {};
              arr[index].floor = key;
              arr[index].floorItem = data[key];
            });
            // console.log(arr);
            this.louceng = arr;
          } else {
            this.message("error", res.message);
          }
        });
      },
      // 获取房态列表
      getStateLists() {
        roomstateList().then((res) => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          // console.log(res);
          if (res.code == 0) {
            this.roomState = res.data;
          } else {
            this.message("error", res.message);
          }
        });
      },
      // 获取总数房态
      getTotalState() {
        roomsRoomcount().then((res) => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          if (res.code == 0) {
            let {
              data
            } = res;
            this.roomTip[0].sum = data.count;
            this.roomTip[1].sum = data.kjf_count;
            this.roomTip[2].sum = data.ydf_count;
            this.roomTip[3].sum = data.zjf_count;
            this.roomTip[4].sum = data.zzf_count;
            this.roomTip[5].sum = data.kzf_count;
            this.roomTip[6].sum = data.wxf_count;
          } else {
            this.message("error", res.message);
          }
        });
      },
      // 获取房型
      getroomtypeLists() {
        roomtypeLists().then(res => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          console.log(res)
          if (res.code == 0) {
            let {
              data
            } = res
            this.roomType = data
          } else {
            this.message("error", res.message)
          }
        })
      },
      // 搜索房间
      checkChangeRoom() {
        let checkRoomState = this.checkRoomState
        let roomType = ""
        let room = ""
        try {
          roomType = this.checkRoomType.join(',')
          room = this.checkRoomState.join(',')
        } catch (err) {
          console.log(err)
        }
        roomLists({
          state: room,
          roomtype: roomType
        }).then((res) => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          console.log(res);
          if (res.code == 0) {
            let {
              data
            } = res;
            let arr = [];
            Object.keys(data).forEach((key, index) => {
              arr[index] = {};
              arr[index].floor = key;
              arr[index].floorItem = data[key];
            });
            // console.log(arr);
            this.louceng = arr;
          } else {
            this.message("error", res.message);
          }
        });
      },
      // 搜索房型
      handleChangeRoomType() {
        let roomType = ""
        let room = ""
        try {
          roomType = this.checkRoomType.join(',')
          room = this.checkRoomState.join(',')
        } catch (err) {
          console.log(err)
        }
        roomLists({
          state: room,
          roomtype: roomType
        }).then((res) => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          console.log(res);
          if (res.code == 0) {
            let {
              data
            } = res;
            let arr = [];
            Object.keys(data).forEach((key, index) => {
              arr[index] = {};
              arr[index].floor = key;
              arr[index].floorItem = data[key];
            });
            // console.log(arr);
            this.louceng = arr;
          } else {
            this.message("error", res.message);
          }
        });
      }
    },
  };
</script>
<style lang="less" scoped>
  .el-aside {
    // border: 1px solid #f00;

    text-align: center;
    //
    box-sizing: border-box;

    .aside-top {
      background: #fff;
      padding: 20px 10px;
    }

    .aside-bottom {
      margin-top: 20px;
      background: #fff;
      padding: 5px 10px 10px;

      .systemMessage {
        padding-top: 10px;
        font-size: 14px;
        color: #989898;

        p {
          padding-bottom: 10px;

          span {
            color: #000;
          }
        }
      }
    }

    .roomType {
      margin-top: 20px;
      text-align: left;

      .roomType-title {
        display: flex;
        align-items: center;
        align-content: center;

        h2 {
          line-height: 22px;
          font-size: 20px;
          font-weight: normal;
        }

        span {
          display: inline-block;
          width: 5px;
          height: 22px;
          background: #005ab9;
          border-radius: 80px;
          margin-right: 6px;
        }
      }

      .roomType-choose {
        padding: 15px;

        /deep/.el-checkbox {
          margin-bottom: 10px;
        }
      }
    }

    .roomType-icon {
      padding-top: 20px;
      display: flex;

      li {
        flex: 1;
        text-align: center;

        img {
          width: 50px;
          height: 50px;
        }

        span {
          display: block;
          font-size: 14px;
          color: #989898;
        }
      }
    }
  }

  .el-main {
    background: #fff;
    margin-right: 20px;
    padding: 0;
    text-align: left;

    .el-card {
      text-align: left;

      span {
        padding: 0 20px;
        display: inline-block;
      }
    }

    .roomTip {
      margin: 20px 0;

      span {
        padding: 0 15px;

        b {
          padding: 5px;
          border-radius: 5px;
          color: #fff;
          font-weight: normal;
          font-size: 14px;
        }
      }
    }

    .floorItem {
      padding: 0 20px;
      margin-top: 20px;

      .el-collapse {
        border-top: 0;

        /deep/.el-collapse-item__header {
          font-size: 24px;
          height: 55px;
          line-height: 55px;
        }

        .iconBlue {
          width: 5px;
          height: 25px;
          background: #005ab9;
          border-radius: 80px;
          margin-right: 8px;
        }

        /deep/.el-collapse-item__header.is-active {
          border-bottom: 1px solid #ebeef5;
        }

        /deep/.el-collapse-item__content {
          padding-top: 25px;
        }

        .floorList {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          margin-left: 10px;

          li {
            background: #005ab9;
            color: #fff;
            padding: 8px;
            box-sizing: border-box;
            width: 15%;
            margin-right: 18px;
            margin-bottom: 20px;
            border-radius: 5px;

            .roomStatus {
              padding-bottom: 15px;
              display: flex;
              justify-content: space-between;
              align-items: center;

              span {
                padding: 0;
              }
            }
          }
        }
      }
    }
  }
</style>