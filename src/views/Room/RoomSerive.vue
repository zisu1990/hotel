<template>
  <el-container>
    <el-main>
      <el-card>
        <span>预订</span>
        <span>入住</span>
        <span>补录住客</span>
        <span>续住</span>
        <span>换房</span>
        <span>退房</span>
        <span>房卡管理</span>
        <span>损赔录入</span>
        <span>换班结算</span>
        <span>重新登陆</span>
      </el-card>
      <div class="roomTip">
        <span v-for="item in roomTip" :key="item.key">
          <b :style="{'background':item.background}">{{item.text}}</b>
          {{item.sum}}
        </span>
      </div>
      <el-card style="margin-top:20px;"></el-card>
    </el-main>
    <el-aside width="230px">
      <span>营业实况/房间检索</span>
      <div class="roomType">
        <b class="biaoqian"></b>
        <span>房态</span>
      </div>
    </el-aside>
  </el-container>
</template>


<script>
export default {
  data() {
    return {
      roomTip: [
        {
          text: "总",
          background: "#666",
          sum: 200
        },

        {
          text: "空",
          background: "#005AB9",
          sum: 30
        },
        {
          text: "订",
          background: "#FCB634",
          sum: 30
        },
        {
          text: "住",
          background: "#FE775E",
          sum: 30
        },
        {
          text: "住脏",
          background: "#FE775E",
          sum: 30
        },        
        {
          text: "脏",
          background: "#989898",
          sum: 30
        },      
        {
          text: "修",
          background: "#A763EE",
          sum: 30
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.el-aside {
  background-color: #fff;
  text-align: center;
  padding: 20px 10px;
  box-sizing: border-box;
  .roomType {
    margin-top: 20px;
    text-align: left;
    .biaoqian {
      content: "";
      width: 2px;
      height: 10px;
      color: #fff;
    }
    span {
      font-size: 20px;
    }
  }
}

.el-main {
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
      }
    }
  }
}
</style>








   