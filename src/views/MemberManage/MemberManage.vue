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

      <el-table :data="MemberTableData" style="width: 100%" border stripe>
        <el-table-column type="index" width="30" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" width="50" align="center"></el-table-column>
        <el-table-column prop="telphone" label="手机号" width="100" align="center"></el-table-column>
        <el-table-column prop="idCard" label="身份证号" width="120" align="center"></el-table-column>
        <el-table-column prop="address" label="地址" align="center"></el-table-column>
        <el-table-column prop="yue" label="卡余额" width="80" align="center"></el-table-column>
        <el-table-column prop="Native" label="国籍" width="60" align="center"></el-table-column>
        <el-table-column prop="integral" label="积分" align="center"></el-table-column>
        <el-table-column prop="store" label="办理门店" width="120" align="center"></el-table-column>
        <el-table-column prop="OperationTime" label="操作时间" align="center"></el-table-column>
        <el-table-column prop="OperationPerson" label="操作员" width="80" align="center"></el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <el-switch
              active-color="#13ce66"
              inactive-color="#999"
              @change="handleChangeSwitch(scope.row)"
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template>
            <el-button type="primary" size="small" @click="RechargeDialogVisible=true">充值</el-button>
            <el-button type="warning" size="small" @click="EditDialogVisible=true">修改</el-button>
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
            <el-input v-model="AddForm.tel"></el-input>
          </el-form-item>

          <el-form-item label="身份证号：">
            <el-input v-model="AddForm.idcard"></el-input>
          </el-form-item>
          <el-form-item label="身份证地址：" prop="address">
            <el-input v-model="AddForm.address"></el-input>
          </el-form-item>
          <el-row :gutter="20" type="flex"  class="select">
            <el-col :span="12">
              <el-form-item label="会员等级：">
                <el-select v-model="AddForm.level" placeholder="请选择">
                  <el-option label="钻石会员" value="1"></el-option>
                  <el-option label="白金会员" value="2"></el-option>
                  <el-option label="普通会员" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="国籍：">
                <el-select v-model="AddForm.native" placeholder="请选择">
                  <el-option label="中国" value="1"></el-option>
                  <el-option label="美国" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20"  class="select">
            <el-col :span="12">
              <el-form-item label="性别：">
                <el-select v-model="AddForm.sex" placeholder="请选择">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="2"></el-option>
 
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="办理门店：">
                <el-select v-model="AddForm.store" placeholder="请选择">
                  <el-option label="宿松路滨湖分店" value="1"></el-option>
                  <el-option label="大学城店" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="AddDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="AddDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改会员 -->
      <el-dialog title="修改" :visible.sync="EditDialogVisible" width="30%">
        <el-form :model="EditForm" label-width="120px" :rules="EditFormRules" ref="EditFormRef">
          <el-form-item label="会员姓名：" prop="name">
            <el-row :gutter="10">
              <el-col :span="14">
                <el-input v-model="EditForm.name"></el-input>
              </el-col>
              <el-col :span="4">
                <el-button type="primary">读身份证</el-button>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="手机号：">
            <el-input v-model="EditForm.tel"></el-input>
          </el-form-item>

          <el-form-item label="身份证号：">
            <el-input v-model="EditForm.idcard"></el-input>
          </el-form-item>
          <el-form-item label="身份证地址：" prop="address">
            <el-input v-model="EditForm.address"></el-input>
          </el-form-item>
          <el-row :gutter="20" type="flex"  class="select">
            <el-col :span="12">
              <el-form-item label="会员等级：">
                <el-select v-model="EditForm.level" placeholder="请选择">
                  <el-option label="钻石会员" value="1"></el-option>
                  <el-option label="白金会员" value="2"></el-option>
                  <el-option label="普通会员" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="国籍：">
                <el-select v-model="EditForm.native" placeholder="请选择">
                  <el-option label="中国" value="1"></el-option>
                  <el-option label="美国" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20"  class="select">
            <el-col :span="12">
              <el-form-item label="性别：">
                <el-select v-model="EditForm.sex" placeholder="请选择">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="2"></el-option>
 
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="办理门店：">
                <el-select v-model="EditForm.store" placeholder="请选择">
                  <el-option label="宿松路滨湖分店" value="1"></el-option>
                  <el-option label="大学城店" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="EditDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="EditDialogVisible = false">确 定</el-button>
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
              <el-col :span="2">充</el-col>
              <el-col :span="7">
                <el-input v-model="RechargeForm.jine"></el-input>
              </el-col>
              
              <el-col :span="2">赠</el-col>
              <el-col :span="7">
                <el-input v-model="RechargeForm.give_money"></el-input>
              </el-col>
              <el-col :span="1">元</el-col>
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
    // 自定义手机号验证
    var checkMible = (rule, value, callback) => {
      // 验证手机号的正则表达式
      const regMiblel = /^1[3456789]\d{9}$/;

      if (regMiblel.test(value)) {
        // 合法的手机号
        return callback();
      } else {
        callback(new Error("请输入正确的手机号"));
      }
    };

    // 身份证号码的校验
    var idCard = (rule, value, callback) => {
      // 验证手机号的正则表达式
      const regcard = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

      if (regcard.test(value)) {
        // 合法的手机号
        return callback();
      } else {
        callback(new Error("请输入正确的身份证号码"));
      }
    };

    return {
      BookingForm: {
        value1: "",
        name: "",
        tel: ""
      },
      MemberTableData: [
        {
          name: "张三",
          sex: "男",
          idCard: "340881199910265489",
          address: "安徽省合肥市西藏路1110号",
          telphone: "18256032124",
          yue: 1000,
          Native: "中国",
          integral: 3000,
          store: "宿松路店",
          OperationTime: "2020-04-13 13:12",
          OperationPerson: "小吴",
          state: 1
        },
        {
          name: "张三",
          sex: "男",
          idCard: "340881199910265489",
          address: "安徽省合肥市西藏路1110号",
          telphone: "18256032124",
          yue: 1000,
          Native: "中国",
          integral: 3000,
          store: "宿松路店",
          OperationTime: "2020-04-13 13:12",
          OperationPerson: "小吴",
          state: 1
        },
        {
          name: "张三",
          sex: "男",
          idCard: "340881199910265489",
          address: "安徽省合肥市西藏路1110号",
          telphone: "18256032124",
          yue: 1000,
          Native: "中国",
          integral: 3000,
          store: "宿松路店",
          OperationTime: "2020-04-13 13:12",
          OperationPerson: "小吴",
          state: 1
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
      AddForm: {
        name:'',
        tel:'',
        idcard:'',
        address:'',
        level:'',
        native:'',
        sex:'',
        store:''

      },
      EditDialogVisible:false,
      EditForm: {
        name:'',
        tel:'',
        idcard:'',
        address:'',
        level:'',
        native:'',
        sex:'',
        store:''
      },
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
.select {
  .el-form {
    /deep/.el-select {
      width:100%;
    }
  }
}
/deep/.el-dialog__footer {
  text-align: center;
}
</style>








   










   










   