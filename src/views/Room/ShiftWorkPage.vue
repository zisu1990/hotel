<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :offset="3" :span="18">
          <el-row>
            <p class="title">换班结算</p>
          </el-row>

          <el-form ref="jiaoBanRef" :model="jiaoban" label-width="130px" :rules="rules">
            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="交班人：">
                  <el-input disabled v-model="jiaoban.jiaoban_name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="原接班现金额：">
                  <el-input disabled v-model="jiaoban.yjieban_money"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="交班时间：">
                  <el-input disabled v-model="jiaoban.jiaoban_time"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="5">
                <p class="roomTittle">交班明细</p>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col>
                <el-table
                  stripe
                  :data="banTableData"
                  :header-cell-style="{ textAlign: 'center' }"
                  :cell-style="{ textAlign: 'center' }"
                  style="width: 100%"
                  max-height="500px"
                >
                  <el-table-column label="房号" prop="room_no"></el-table-column>
                  <el-table-column label="客户名称" prop="name"></el-table-column>
                  <el-table-column label="入住时间" prop="start_time"></el-table-column>
                  <el-table-column label="离店时间" prop="end_time"></el-table-column>
                  <el-table-column label="支付方式" prop="paymethod"></el-table-column>
                  <el-table-column label="房费" prop="fangfei"></el-table-column>
                  <el-table-column label="实际房费" prop="fangfei"></el-table-column>
                  <el-table-column label="物损费用" prop="sunpei_money"></el-table-column>
                  <el-table-column label="押金" prop="yajin_money"></el-table-column>
                  <el-table-column label="已退金额" prop="tui_yajin_money"></el-table-column>
                  <el-table-column label="退款方式" prop="tui_paymethod"></el-table-column>
                </el-table>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="5">
                <p class="roomTittle">交班统计(合计)</p>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center" style="margin: 20px 0 40px 0">
              <!-- <el-col>
                <el-table
                  border
                  stripe
                  :header-cell-style="{ textAlign: 'center' }"
                  :cell-style="{ textAlign: 'center' }"
                  style="width: 100%"
                  max-height="500px"
                >
                  <el-table-column label="收入现金金额"></el-table-column>
                  <el-table-column label="其他收入金额"></el-table-column>
                  <el-table-column label="房费"></el-table-column>
                  <el-table-column label="押金"></el-table-column>
                  <el-table-column label="物损金额"></el-table-column>
                  <el-table-column label="会员充值额"></el-table-column>
                  <el-table-column label="现金退押"></el-table-column>
                  <el-table-column label="其他退押"></el-table-column>
                </el-table>
              </el-col>-->
              <el-col :span="3">
                <span style="margin-bottom:20px; display:inline-block;">类目</span>
                <br>
                <span>合计</span>
              </el-col>
              <el-col :span="3">
                <span style="margin-bottom:20px; display:inline-block;">收入现金金额</span>
                <br>
                <span>{{xianjin_count}}</span>
              </el-col>
              <el-col :span="3">
                <span style="margin-bottom:20px; display:inline-block;">其他收入金额</span>
                <br>
                <span>{{other_money_count}}</span>
              </el-col>
              <el-col :span="3">
                <span style="margin-bottom:20px; display:inline-block;">房费</span>
                <br>
                <span>{{fangfei_count}}</span>
              </el-col>
              <el-col :span="3">
                <span style="margin-bottom:20px; display:inline-block;">押金</span>
                <br>
                <span>{{yajin_count}}</span>
              </el-col>
              <el-col :span="3">
                <span style="margin-bottom:20px; display:inline-block;">会员充值额</span>
                <br>
                <span>{{chongzhi_money}}</span>
              </el-col>
              <el-col :span="3">
                <span style="margin-bottom:20px; display:inline-block;">物损金额</span>
                <br>
                <span>{{sunpei_count}}</span>
              </el-col>
              <el-col :span="3">
                <span style="margin-bottom:20px; display:inline-block;">现金退押</span>
                <br>
                <span>{{xianjin_tui_money}}</span>
              </el-col>
              <el-col :span="3">
                <span style="margin-bottom:20px; display:inline-block;">其他退押</span>
                <br>
                <span>{{other_tui_money}}</span>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="接班人：" prop="jieban_name">
                  <el-select v-model="jiaoban.jieban_name">
                    <el-option
                      v-for="(item,index) in userList"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="现金总金额：">
                  <el-input clearable v-model="jiaoban.xianjin" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="上交现金额：">
                  <el-input clearable v-model="jiaoban.shangjiao_money" @input="moneyInput"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="交班现金额：">
                  <el-input v-model="jiaoban.jieban_money" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7"></el-col>

              <el-col :span="7"></el-col>
            </el-row>

            <el-row style="margin-top: 30px">
              <el-form-item>
                <el-button style="width: 140px">交班暂不打印</el-button>
                <el-button style="width: 100px" size="medium" type="primary" @click="submit">交班并打印</el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import { banUserList, banInfo, banAdd } from "@/api/jiaoban";
export default {
  data() {
    return {
      jiaoban: {
        jiaoban_name: "",
        yjieban_money: "",
        jiaoban_time: "",
        jieban_name: "",
        xianjin: "",
        shangjiao_money: 0,
        jieban_money: 0
      },

      // 表单验证规则
      rules: {
        jieban_name: [
          { required: true, message: "请选择接班人", trigger: "blur" }
        ]
      },

      //   表格
      banTableData: [],

      userList: [],
      xianjin_count: "",
      other_money_count: "",
      fangfei_count: "",
      other_tui_money: "",
      sunpei_count: "",
      yajin_count: "",
      chongzhi_money: "",
      xianjin_tui_money: ""
    };
  },
  created() {
    this.getUserList();
    this.getInfo();
  },
  methods: {
    getUserList() {
      banUserList().then(res => {
        res = typeof res == "string" ? JSON.parse(res) : res;
        console.log(res, "jiaoban");

        if (res.code == 0) {
          this.userList = res.data;
        } else {
          this.message("error", res.message);
        }
      });
    },
    getInfo() {
      banInfo().then(res => {
        res = typeof res == "string" ? JSON.parse(res) : res;
        console.log(res, "明细");
        if (res.code == 0) {
          this.jiaoban = res.data;
          this.banTableData = res.data.room_info;
          this.xianjin_count = res.data.tj_data.xianjin_count;
          this.other_money_count = res.data.tj_data.other_money_count;
          this.fangfei_count = res.data.tj_data.fangfei_count;
          this.other_tui_money = res.data.tj_data.other_tui_money;
          this.sunpei_count = res.data.tj_data.sunpei_count;
          this.yajin_count = res.data.tj_data.yajin_count;
          this.chongzhi_money = res.data.tj_data.chongzhi_money;
          this.xianjin_tui_money = res.data.tj_data.xianjin_tui_money;
        } else {
          this.message("error", res.message);
        }
      });
    },

    moneyInput(v) {
      this.jiaoban.jieban_money = this.jiaoban.xianjin - v;
      console.log(this.jiaoban.jieban_money);
    },

    submit() {
      this.$refs.jiaoBanRef.validate(vaild => {
        if (vaild) {
          let parmas = {
            jiaoban_name: this.jiaoban.jiaoban_name,
            shangjiao_money: this.jiaoban.shangjiao_money,
            jieban_name: this.jiaoban.jieban_name,
            jieban_money: this.jiaoban.jieban_money,
            xianjin: this.jiaoban.xianjin,
            yjieban_money: this.jiaoban.yjieban_money
          };

          banAdd(parmas).then(res => {
            res = typeof res == "string" ? JSON.parse(res) : res;
            // console.log(res, "提交");
            if (res.code == 0) {
              this.$router.push("RoomFirstPage");
              this.message("success", res.message);
            } else {
              this.message("error", res.message);
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.el-main {
  background: #fff;
}
.roomTittle {
  font-size: 18px;
  text-align: left;
  color: #005ab9;
  margin: 20px 0 10px 0;
}
</style>
