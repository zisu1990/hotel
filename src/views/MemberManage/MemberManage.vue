<template>
  <!-- 会员管理 -->
  <el-container>
    <el-main>
      <el-form :model="BookingForm" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="办理时间：">
              <el-date-picker v-model="BookingForm.value1" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-input
                v-model="BookingForm.name"
                placeholder="请输入姓名/身份证号/手机号"
                clearable
                :style="{width: '100%'}"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="2">
            <el-button type="primary">查询</el-button>
          </el-col>
        </el-row>
      </el-form>

      <div class="btn">
        <el-row>
          <el-button type="primary" @click="AddDialogVisible=true">增加</el-button>
        </el-row>
      </div>

      <el-table :data="BookingTableData" style="width: 100%" border stripe>
        <el-table-column type="index" width="30" align="center"></el-table-column>
        <el-table-column prop="OddNumber" label="预订单号" width="100" align="center"></el-table-column>
        <el-table-column prop="PersonType" label="客户类型" width="80" align="center"></el-table-column>
        <el-table-column prop="GroupName" label="团体名称" width="80" align="center"></el-table-column>
        <el-table-column prop="Subscriber" label="预订人" width="80" align="center"></el-table-column>
        <el-table-column prop="Telphone" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="YuDaoTime" label="预到时间" align="center"></el-table-column>
        <el-table-column prop="YuLiTime" label="预离时间" align="center"></el-table-column>
        <el-table-column prop="RoomType" label="房间类型" width="80" align="center"></el-table-column>
        <el-table-column prop="Sum" label="数量" width="50" align="center"></el-table-column>
        <el-table-column prop="PayFor" label="预付方式" width="80" align="center"></el-table-column>
        <el-table-column prop="ParForPrice" label="预付金额" width="80" align="center"></el-table-column>
        <el-table-column prop="CardNum" label="会员卡号" align="center"></el-table-column>
        <el-table-column prop="Native" label="国籍" width="60" align="center"></el-table-column>
        <el-table-column prop="OperationTime" label="操作时间" align="center"></el-table-column>
        <el-table-column prop="Remarks" label="备注" align="center"></el-table-column>
        <el-table-column prop="OperationPerson" label="操作员" width="80" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template>
            <el-button type="primary" size="small" @click="RechargeDialogVisible=true">充值</el-button>
            <el-button type="warning" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>

      <!-- 新增会员 -->

      <el-dialog title="会员充值" :visible.sync="AddDialogVisible" width="30%">
        <el-form :model="AddForm" label-width="100px">
          <el-form-item label="会员姓名：">
            <el-row :gutter="10">
              <el-col :span="14">
                <el-input v-model="AddForm.name"></el-input>
              </el-col>
              <el-col :span="4">
                <el-button type="primary">读身份证</el-button>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="手机号：">
            <el-input v-model="AddForm.name"></el-input>
          </el-form-item>

          <el-form-item label="身份证号：">
            <el-input v-model="AddForm.name"></el-input>
          </el-form-item>
          <el-form-item label="身份证地址：">
            <el-input v-model="AddForm.name"></el-input>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="会员等级：">
                <el-select v-model="AddForm.name" placeholder="请选择">
                  <el-option label="所有" value="1"></el-option>
                  <el-option label="客房每日营收统计表" value="2"></el-option>
                  <el-option label="在店客人费用统计表" value="3"></el-option>
                  <el-option label="结账客人费用报表" value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="会员等级：">
                <el-select v-model="AddForm.name" placeholder="请选择">
                  <el-option label="所有" value="1"></el-option>
                  <el-option label="客房每日营收统计表" value="2"></el-option>
                  <el-option label="在店客人费用统计表" value="3"></el-option>
                  <el-option label="结账客人费用报表" value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="会员等级：">
                <el-select v-model="AddForm.name" placeholder="请选择">
                  <el-option label="所有" value="1"></el-option>
                  <el-option label="客房每日营收统计表" value="2"></el-option>
                  <el-option label="在店客人费用统计表" value="3"></el-option>
                  <el-option label="结账客人费用报表" value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="会员等级：">
                <el-select v-model="AddForm.name" placeholder="请选择">
                  <el-option label="所有" value="1"></el-option>
                  <el-option label="客房每日营收统计表" value="2"></el-option>
                  <el-option label="在店客人费用统计表" value="3"></el-option>
                  <el-option label="结账客人费用报表" value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="AddDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="RechargeDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 充值 -->
      <el-dialog title="会员充值" :visible.sync="RechargeDialogVisible" width="30%">
        <el-form :model="RechargeForm" label-width="100px">
          <el-form-item label="会员姓名：">
            <el-input v-model="RechargeForm.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="会员等级：">
            <el-input v-model="RechargeForm.level" disabled></el-input>
          </el-form-item>
          <el-form-item label="现有金额：">
            <el-input v-model="RechargeForm.money" disabled></el-input>
          </el-form-item>
          <el-form-item label="支付方式：">
            <el-row>
              <el-col :span="7">
                <el-select v-model="RechargeForm.payforType" placeholder="请选择">
                  <el-option label="现金" value="1"></el-option>
                  <el-option label="支付宝" value="2"></el-option>
                  <el-option label="微信" value="3"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="充值金额：">
            <el-row>
              <el-col :span="7">
                <el-input v-model="RechargeForm.jine"></el-input>
              </el-col>
              <el-col :span="1">元</el-col>
              <el-col :span="4">赠 50 元</el-col>
            </el-row>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="RechargeDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="RechargeDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>


<script>
export default {
  data() {
    return {
      BookingForm: {
        value1: "",
        name: "",
        tel: ""
      },
      BookingTableData: [
        {
          OddNumber: "yd123456",
          PersonType: "散客",
          GroupName: "无",
          Subscriber: "张三",
          Telphone: "18256032124",
          YuDaoTime: "2020-04-12 13:12",
          YuLiTime: "2020-04-13 13:12",
          RoomType: "三人间",
          Sum: 1,
          PayFor: "现金",
          ParForPrice: "2000",
          CardNum: "NO.123456789",
          Native: "中国",
          OperationTime: "2020-04-13 13:12",
          Remarks: "无",
          OperationPerson: "小吴"
        },
        {
          OddNumber: "yd123456",
          PersonType: "散客",
          GroupName: "无",
          Subscriber: "张三",
          Telphone: "18256032124",
          YuDaoTime: "2020-04-12 13:12:12",
          YuLiTime: "2020-04-13 13:12:12",
          RoomType: "三人间",
          Sum: 1,
          PayFor: "现金",
          ParForPrice: "2000",
          CardNum: "NO.123456789",
          Native: "中国",
          OperationTime: "2020-04-13 13:12:12",
          Remarks: "无",
          OperationPerson: "小吴"
        },
        {
          OddNumber: "yd123456",
          PersonType: "散客",
          GroupName: "无",
          Subscriber: "张三",
          Telphone: "18256032124",
          YuDaoTime: "2020-04-12 13:12:12",
          YuLiTime: "2020-04-13 13:12:12",
          RoomType: "三人间",
          Sum: 1,
          PayFor: "现金",
          ParForPrice: "2000",
          CardNum: "NO.123456789",
          Native: "中国",
          OperationTime: "2020-04-13 13:12:12",
          Remarks: "无",
          OperationPerson: "小吴"
        }
      ],
      currentPage4: 4,
      RechargeDialogVisible: false,
      RechargeForm: {
        name: "张丹",
        level: "黑钻会员",
        money: "4600元",
        payforType: "",
        jine: ""
      },
      AddDialogVisible: false,
      AddForm: {}
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
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
  .btn {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
  }
}

/deep/.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 280px;
}
.el-form {
  /deep/.el-select {
    width: 200px;
  }
}
/deep/.el-dialog__footer {
  text-align: center;
}
</style>








   










   










   