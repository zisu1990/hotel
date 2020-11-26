<template>
  <el-container>
    <el-main>
      <h2>退房</h2>
      <div class="checkWarp">
        <el-row :gutter="20" type="flex" justify="center">
          <el-col :span="6">客户名称：张三</el-col>
          <el-col :span="6">客户类型：散客</el-col>
          <el-col :span="6">会员卡号：No.1234567</el-col>
          <el-col :span="6">会员卡金额：5000元</el-col>
        </el-row>
        <p class="chooseTitle">消费明细：</p>
        <el-table
          ref="multipleTable"
          :data="xiaoFeiTableData"
          tooltip-effect="dark"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="roomNum" label="房间号" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="time" label="入住时间" align="center"></el-table-column>
          <el-table-column prop="days" label="天数" align="center"></el-table-column>
          <el-table-column prop="discount" label="折扣" align="center"></el-table-column>
          <el-table-column prop="status" label="状态" align="center"></el-table-column>
        </el-table>
        <p class="chooseTitle">赔损明细：</p>
        <el-table
          ref="multipleTable1"
          :data="peiSunTableData"
          tooltip-effect="dark"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange1"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="roomNum" label="房间号" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="time" label="录入时间" align="center"></el-table-column>
          <el-table-column prop="sunhuai" label="损坏物品" align="center"></el-table-column>
          <el-table-column prop="sum" label="数量" align="center"></el-table-column>
          <el-table-column prop="price" label="单价" align="center"></el-table-column>
          <el-table-column prop="peiPrice" label="赔损金额" align="center"></el-table-column>
          <el-table-column prop="status" label="状态" align="center"></el-table-column>
        </el-table>

        <el-form ref="checkOutForm" :model="checkOutForm" :rules="checkOutRef" label-width="140px">
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8">
              <el-form-item label="消费金额（元）：">
                <el-input v-model="checkOutForm.parForMoney" :style="{width: '100%'}" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="使用预付款：">
                <el-select
                  v-model="checkOutForm.payfor"
                  placeholder="选择预付款"
                  :style="{width: '100%'}"
                >
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="已预交费用（元）：">
                <el-input v-model="checkOutForm.paid" :style="{width: '100%'}" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8">
              <el-form-item label="待支付金额（元）：">
                <el-input v-model="checkOutForm.ToBePaid" :style="{width: '100%'}" disabled></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="待退金额（元）：">
                <el-input v-model="checkOutForm.toBeReturned" :style="{width: '100%'}" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="会员卡支付：">
                <el-select
                  v-model="checkOutForm.IsCardPayfor"
                  placeholder="选择会员卡支付"
                  :style="{width: '100%'}"
                >
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8">
              <el-form-item label="卡扣金额（元）：">
                <el-input v-model="checkOutForm.CardPaid" :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结算方式：">
                <el-select
                  v-model="checkOutForm.IsCardPayfor"
                  placeholder="选择结算方式"
                  :style="{width: '100%'}"
                >
                  <el-option label="现金" value="1"></el-option>
                  <el-option label="支付宝" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结算金额（元）：">
                <el-input v-model="checkOutForm.SettlementAmount" :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center" class="btn">
            <el-button>重置</el-button>
            <el-button type="primary" @click="OutDialogVisible=true">确认</el-button>
          </el-row>
        </el-form>
      </div>

      <!-- 结账单打印 -->
      <el-dialog title="结账单" :visible.sync="OutDialogVisible" width="50%">
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
            <span>离店时间：2020-11-08 14:00</span>
          </li>
          <li>
            <span>会员卡号：NO.123456789</span>
            <span>消费总金额：￥2000（房费：￥1940, 赔损：￥60）</span>
          </li>
          <li>
            <span>消费清单</span>
            <el-table
              ref="multipleTable"
              :data="xiaoFeiTableData"
              tooltip-effect="dark"
              style="width: 100%"
              border
            >
              <el-table-column prop="roomNum" label="房间号" align="center"></el-table-column>
              <el-table-column prop="name" label="姓名" align="center"></el-table-column>
              <el-table-column prop="time" label="入住时间" align="center"></el-table-column>
              <el-table-column prop="days" label="天数" align="center"></el-table-column>
            </el-table>
          </li>
          <li>
            <span>赔损清单</span>
            <el-table
              ref="multipleTable1"
              :data="peiSunTableData"
              tooltip-effect="dark"
              style="width: 100%"
              border
            >
              <el-table-column prop="roomNum" label="房间号" align="center"></el-table-column>
              <el-table-column prop="name" label="姓名" align="center"></el-table-column>
              <el-table-column prop="time" label="录入时间" align="center"></el-table-column>
              <el-table-column prop="sunhuai" label="损坏物品" align="center"></el-table-column>
              <el-table-column prop="sum" label="数量" align="center"></el-table-column>
              <el-table-column prop="price" label="单价" align="center"></el-table-column>
              <el-table-column prop="peiPrice" label="赔损金额" align="center"></el-table-column>
            </el-table>
          </li>
          <li>
            <span>宾客电话：13156894556</span>
            <span>本酒店电话：0551-68686868</span>
            <span>打印时间：2020-11-04 14:47</span>
          </li>
        </ul>
        <div class="qianzi">客户签字：</div>

        <span slot="footer" class="dialog-footer" style="text-align:center;">
          <el-button @click="OutDialogVisible=false">暂不打印</el-button>
          <el-button type="primary" @click="OutDialogVisible=false">打印</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      //消费明细
      xiaoFeiTableData: [
        {
          roomNum: 8102,
          name: "张三",
          time: "2020-11-11 10:20:45",
          days: 1,
          discount: "无",
          status: "退房"
        },
        {
          roomNum: 8103,
          name: "张花",
          time: "2020-11-11 10:20:45",
          days: 1,
          discount: "无",
          status: "退房"
        },
        {
          roomNum: 8104,
          name: "张三",
          time: "2020-11-11 10:20:45",
          days: 1,
          discount: "无",
          status: "在住"
        },
        {
          roomNum: 8105,
          name: "张三",
          time: "2020-11-11 10:20:45",
          days: 1,
          discount: "无",
          status: "退房"
        },
        {
          roomNum: 8107,
          name: "张三",
          time: "2020-11-11 10:20:45",
          days: 1,
          discount: "无",
          status: "在住"
        }
      ],
      multipleSelection: [],

      //赔损明细
      peiSunTableData: [
        {
          roomNum: 8107,
          name: "张三",
          time: "2020-11-11 10:20:45",
          sum: 1,
          sunhuai: "电吹风",
          price: 60,
          peiPrice: 60,
          status: "未支付"
        }
      ],
      multipleSelection1: [],

      checkOutForm: {
        parForMoney: 2000,
        isadvanceMoney: "",
        paid: 3000,
        ToBePaid: 2000,
        toBeReturned: 200,
        IsCardPayfor: "",
        CardPaid: "",
        SettlementAmount: ""
      },
      //退款收据弹框
      OutDialogVisible: false
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSelectionChange1(val) {
      this.multipleSelection = val;
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
    .el-col {
      text-align: left;
    }
    .chooseTitle {
      text-align: left;
      margin: 30px 0 10px;
    }
    .el-form {
      margin-top: 30px;
    }
  }
  .payForList li {
    text-align: left;
    padding: 20px;
    border-bottom: 1px solid #f3f3f3;
    font-size: 18px;
    span,
    p{
      padding: 0 20px;
    }
    .el-table{
        margin:20px 20px 0;
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


