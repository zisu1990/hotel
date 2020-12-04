<template>
  <el-container>
    <el-main>
      <el-card>
        <span
          @click="pushPage(item)"
          class="hv"
          v-for="(item, index) in navList"
          :key="index"
          >{{ item.name }}</span
        >
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
              <li
                v-for="v in f.listItem"
                :key="v.id"
                :style="{ background: v.background }"
              >
                <div class="roomStatus">
                  <span>{{ v.floorNo }}</span>
                  <span>{{ v.type }}</span>
                </div>
                <p>{{ v.status }}</p>
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
              <el-check-group v-model="roomState">
                <el-checkbox v-for="v in roomState" :key="v" :name="v">{{
                  v
                }}</el-checkbox>
              </el-check-group>
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
              <el-check-group v-model="roomType">
                <el-checkbox
                  v-for="(v, i) in roomType"
                  :key="i"
                  :name="v.roomtype"
                  
                  >{{ v.roomtype }}({{ v.sheng }}/{{ v.sum }})</el-checkbox
                >
              </el-check-group>
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
import { saveToken, getToken, removeToken } from "@/utils/token.js";
export default {
  data() {
    return {
      // 房态标识
      roomTip: [
        {
          text: "总",
          background: "#666",
          sum: 200,
        },

        {
          text: "空",
          background: "#005AB9",
          sum: 30,
        },
        {
          text: "订",
          background: "#FCB634",
          sum: 30,
        },
        {
          text: "住",
          background: "#FE775E",
          sum: 30,
        },
        {
          text: "住脏",
          background: "#FE775E",
          sum: 30,
        },
        {
          text: "脏",
          background: "#989898",
          sum: 30,
        },
        {
          text: "修",
          background: "#A763EE",
          sum: 30,
        },
      ],
      roomState: ["空净房", "空脏房", "住净房", "住脏房", "预定房", "维修房"],
      roomType: [
        {
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

      // 楼层数据
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
          listItem: [
            {
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
          ],
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
          ],
        },
      ],

      // 客房业务导航
      navList: [
        {
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
  created(){
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
      console.log(data.path);
      this.$router.push({
        path: data.path,
      });
    },
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