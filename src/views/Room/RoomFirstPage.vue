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
              <li v-for="v in f.floorItem" @click.prevent.stop="setRoomState(v)"
                :class="[v.id == roomID?'roomStyle':'']" :key="v.id" :style="{ background: v.color }">
                <div class="roomStatus">
                  <span>{{ v.room_no }}</span>
                  <span>{{ v.roomtype }}</span>
                </div>
                <p>{{ v.name }}</p>
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
                  {{ v.name }} ({{ v.jing_count }}/{{ v.count }})
                </el-checkbox>
              </el-checkbox-group>
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
              <li v-for="(item,index) in stateList" :key="index" @click="submitRoomState(item)">
                <img :src="item.img" alt srcset />
                <span>{{item.text}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- <el-dialog title="房态维护" :visible.sync="dialogVisible" width="30%">
        <el-form ref="adddialogVisible" :model="formRoomFirstPage" label-width="100px">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item prop="addRoomNum" label="房号：">
                <el-input clearable v-model="formRoomFirstPage.addRoomNum" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="onRoomFloor" label="所在楼层：">
                <el-input clearable v-model="formRoomFirstPage.onRoomFloor" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item prop="addRoomNum" label="房号：">
                <el-select clearable v-model="roomStateValue" placeholder="请选择">
                  <el-option v-for="(item,index) in roomStateOption" :key="index" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitRoomState">确 定</el-button>
        </span>
      </el-dialog> -->

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
    roomtypeLists,
    roomModify
  } from "@/api/RoomFirstPage.js";
  import {
    saveToken,
    getToken,
    removeToken
  } from "@/utils/token.js";
  export default {
    data() {
      return {
        stateList: [{
            img: require("@/assets/image/cleaning.png"),
            text: "清扫",
            state: "1"
          },
          {
            img: require("@/assets/image/repair.png"),
            text: "维修",
            state: "2"
          },
          {
            img: require("@/assets/image/repairOver.png"),
            text: "维修结束",
            state: "3"
          }
        ],
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
        // roomStateValue: "",
        // roomStateOption: [{
        //   name: "清扫",
        //   id: 1
        // }, {
        //   name: "维修",
        //   id: 2
        // }, {
        //   name: "维修结束",
        //   id: 3
        // }],
        // 房间id
        roomID: "",
        // 选择的房间状态
        chooseState: "",
        formRoomFirstPage: {
          addRoomNum: "",
          onRoomFloor: "",
        },
        dialogVisible: false,
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
        ws: null, //建立的连接
        lockReconnect: false, //是否真正建立连接
        timeout: 120000, //30秒一次心跳
        timeoutObj: null, //心跳心跳倒计时
        serverTimeoutObj: null, //心跳倒计时
        timeoutnum: null, //断开 重连倒计时
      };
    },
    created() {
      this.getRows();
      // this.initWebpack();
    },
    mounted() {
      let that = this
      document.onclick = function () {
        that.roomID = ""
        that.formRoomFirstPage.addRoomNum = ""
        that.formRoomFirstPage.onRoomFloor = ""
        that.chooseState = ""
      }
    },
    filters: {
      updataStatus(v) {
        // console.log(v)
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
            str = "预定房";
            break;
          case 6:
            str = "维修房";
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
      initWebpack() {
        let url = "wss://api.anhuiqingyou.com/api/notice/index"
        this.ws = new WebSocket(url);
        this.ws.onopen = this.onopen;
        this.ws.onmessage = this.onmessage;
        this.ws.onclose = this.onclose;
        this.ws.onerror = this.onerror;
      },
      reconnect() { //重新连接
        var that = this;
        if (that.lockReconnect) {
          return;
        };
        that.lockReconnect = true;
        //没连接上会一直重连，设置延迟避免请求过多
        that.timeoutnum && clearTimeout(that.timeoutnum);
        that.timeoutnum = setTimeout(function () {
          //新连接
          that.initWebpack();
          that.lockReconnect = false;
        }, 5000);
      },
      reset() { //重置心跳
        var that = this;
        //清除时间
        clearTimeout(that.timeoutObj);
        clearTimeout(that.serverTimeoutObj);
        //重启心跳
        that.start();
      },
      start() { //开启心跳
        var self = this;
        self.timeoutObj && clearTimeout(self.timeoutObj);
        self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
        self.timeoutObj = setTimeout(function () {
          //这里发送一个心跳，后端收到后，返回一个心跳消息，
          if (self.ws.readyState == 1) { //如果连接正常
            self.ws.send("heartCheck");
          } else { //否则重连
            self.reconnect();
          }
          self.serverTimeoutObj = setTimeout(function () {
            //超时关闭
            self.ws.close();
          }, self.timeout);

        }, self.timeout)
      },
      onopen() {
        var msg = JSON.stringify({
          token: getToken()
        });
        this.ws.send(msg);
        console.log("open");
        this.getNoReadRecords();
        //开启心跳
        this.start();
      },
      onmessage(e) {
        this.mydata = JSON.parse(e.data);
        if (this.mydata.fromID == this.states.customerId) {
          this.mydata.chatType = 2;
        } else {
          this.mydata.chatType = 1;
        }
        var content = this.getContentTypes(this.mydata.content, this.mydata.chatType);
        this.records.push(this.mydata);
        //收到服务器信息，心跳重置
        this.reset();
      },
      onclose(e) {
        console.log("连接关闭");
        console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean);
        var msg = JSON.stringify({
          token: getToken()
        });
        this.ws.send(msg);
        //重连
        this.reconnect();
      },
      onerror(e) {
        console.log("出现错误");
        //重连
        this.reconnect();
      },
      pushPage(data) {
        this.isShowRoute = true;
        // console.log(data)
        // console.log(data.path);
        let roomID = this.roomID
        let RoomNum = this.formRoomFirstPage.addRoomNum
        let query = {}
        let arr = ['RoomBooking', 'Check_in', 'ShiftWorkPage', 'login']
        let result = arr.some(item => data.path == item)
        if (result) {
          this.$router.push({
            path: data.path,
          });
        } else {
          if (this.chooseState != 3) {
            this.roomID = ""
            this.formRoomFirstPage.addRoomNum = ""
            this.formRoomFirstPage.onRoomFloor = ""
            this.chooseState = ""
            this.message('error', '请选择有效的房间')
            return
          }
          if (roomID && RoomNum) {
            query = {
              id: roomID,
              room_no: RoomNum
            }
          } else {
            return this.message('warning', '请选择房间')
          }
          this.$router.push({
            path: data.path,
            query
          });
        }

      },
      getRows() {
        this.getTotalState();
        this.getStateLists();
        this.getroomtypeLists()
        roomLists().then((res) => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          // console.log(res)
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
          // console.log(res)
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
          // console.log(err)
        }
        roomLists({
          state: room,
          roomtype: roomType
        }).then((res) => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          // console.log(res);
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
          // console.log(err)
        }
        roomLists({
          state: room,
          roomtype: roomType
        }).then((res) => {
          res = typeof res == "string" ? JSON.parse(res) : res;
          // console.log(res);
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
      // 修改房态
      setRoomState(v) {
        // console.log(v)
        if (v.id === this.roomID) {
          this.roomID = ""
          this.formRoomFirstPage.addRoomNum = ""
          this.formRoomFirstPage.onRoomFloor = ""
          this.chooseState = ""
        } else {
          this.roomID = v.id
          this.chooseState = v.state
          this.formRoomFirstPage.addRoomNum = v.room_no
          this.formRoomFirstPage.onRoomFloor = v.floor
        }

        // console.log(v)
      },
      submitRoomState(v) {
        // console.log(typeof this.roomID)
        if (!this.roomID) {
          return this.message('error', '请选择有效的房间')
        }
        let params = {
          ids: this.roomID + "",
          repair: v.state
        }
        this.confirm("您确定修改此房间的房态吗").then(() => {
          roomModify(params).then(res => {
            res = typeof res == "string" ? JSON.parse(res) : res;
            // console.log(res)
            if (res.code == 0) {
              this.message("success", res.message)
              this.getRows()
            } else {
              this.message("error", res.message)
            }
          })
        }).catch(() => {
          this.roomID = ''
        })

      },
    },
  };
</script>
<style lang="less" scoped>
  .roomStyle {
    transform: scale(1.1);
    box-shadow: #989898 5px 5px 5px;
    transition: all 200ms;
  }

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

      li:hover {
        cursor: pointer;
      }

      li:hover span {
        color: red;
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

          li:hover {
            cursor: pointer;
          }

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