<template>
  <!-- 会员管理 -->
  <el-container>
    <el-main>
      <el-form :model="memberForm" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="入住时间段：">
              <el-date-picker
                v-model="memberForm.value1"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="getTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="6">
            <el-form-item>
              <el-input
                v-model="memberForm.keys"
                placeholder="请输入住客姓名/身份证号/手机号"
                clearable
                @change="handelChange"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="getMemberList()">查询</el-button>
          </el-col>
        </el-row>
      </el-form>

      <div class="btn">
        <el-row>
          <el-button type="primary" @click="AddMemberDialog">增加</el-button>
        </el-row>
      </div>

      <el-table :data="MemberTableData" style="width: 100%" border stripe>
        <el-table-column type="index" width="50" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" width="80" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" width="50" align="center"></el-table-column>
        <el-table-column prop="level" label="会员等级" width="100" align="center"></el-table-column>
        <el-table-column prop="mobile" label="手机号" width="120" align="center"></el-table-column>
        <el-table-column
          prop="card_no"
          label="身份证号 "
          show-overflow-tooltip
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip width="180" align="center"></el-table-column>
        <el-table-column prop="balance" label="卡余额" width="80" align="center"></el-table-column>
        <el-table-column prop="nationality" label="国籍" width="80" align="center"></el-table-column>
        <el-table-column prop="integral" label="积分" width="80" align="center"></el-table-column>
        <el-table-column
          prop="company_name"
          label="办理门店"
          show-overflow-tooltip
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="操作时间"
          width="120"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="username"
          label="操作员"
          width="80"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column label="状态" align="center" width="80">
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
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="RechargeDialog(scope.row)">充值</el-button>
            <el-button type="warning" size="small" @click="EditDialog(scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="DeleteDialog(scope.row.member_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="memberForm.page"
        :page-sizes="[10, 20, 30,50,100]"
        :page-size="memberForm.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 新增会员 -->
      <el-dialog title="新增会员" :visible.sync="AddDialogVisible" width="30%" @closed="cleranAddForm">
        <el-form :model="AddForm" label-width="120px" :rules="AddFormRules" ref="AddFormRef">
          <el-form-item label="会员姓名：" prop="name">
            <el-row :gutter="10">
              <el-col :span="14">
                <el-input v-model="AddForm.name"></el-input>
              </el-col>
              <el-col :span="4">
                <el-button type="primary">读身份证</el-button>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="手机号：" prop="mobile">
            <el-input v-model="AddForm.mobile"></el-input>
          </el-form-item>

          <el-form-item label="身份证号：" prop="card_no">
            <el-input v-model="AddForm.card_no"></el-input>
          </el-form-item>
          <el-form-item label="身份证地址：" prop="address">
            <el-input v-model="AddForm.address"></el-input>
          </el-form-item>
          <el-row :gutter="20" type="flex" class="select">
            <el-col :span="12">
              <el-form-item label="会员等级：" prop="level">
                <el-select v-model="AddForm.level" placeholder="请选择" @change="selectLevel($event)">
                  <el-option
                    v-for="(item,index) in memberlevel"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="国籍：" prop="nationality">
                <el-select
                  v-model="AddForm.nationality"
                  placeholder="请选择"
                  @change="selectNative($event)"
                >
                  <el-option
                    v-for="(item,index) in nativeList"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="select">
            <el-col :span="12">
              <el-form-item label="性别：">
                <el-select v-model="AddForm.sex" placeholder="请选择" @change="selectSex($event)">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="AddDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="AddMemberSubmit">确 定</el-button>
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

          <el-form-item label="手机号：" prop="mobile">
            <el-input v-model="EditForm.mobile"></el-input>
          </el-form-item>

          <el-form-item label="身份证号：" prop="card_no">
            <el-input v-model="EditForm.card_no"></el-input>
          </el-form-item>
          <el-form-item label="身份证地址：" prop="address">
            <el-input v-model="EditForm.address"></el-input>
          </el-form-item>
          <el-row :gutter="20" type="flex" class="select">
            <el-col :span="12">
              <el-form-item label="会员等级：" prop="level">
                <el-select
                  v-model="EditForm.level"
                  placeholder="请选择"
                  @change="editSelectLevel($event)"
                >
                  <el-option
                    v-for="(item,index) in memberlevel"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="国籍：" prop="nationality">
                <el-select
                  v-model="EditForm.nationality"
                  placeholder="请选择"
                  @change="editSelectNative($event)"
                >
                  <el-option
                    v-for="(item,index) in nativeList"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="select">
            <el-col :span="12">
              <el-form-item label="性别：" prop="sex">
                <el-select v-model="EditForm.sex" placeholder="请选择" @change="editSelectSex($event)">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="EditDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleEditInfo()">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 充值 -->
      <el-dialog title="会员充值" :visible.sync="RechargeDialogVisible" width="30%">
        <el-form
          :model="RechargeForm"
          label-width="100px"
          :rules="RechargeFormRules"
          ref="RechargeFormRef"
        >
          <el-form-item label="会员姓名：">
            <el-input v-model="RechargeForm.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="会员等级：">
            <el-input v-model="RechargeForm.level" disabled></el-input>
          </el-form-item>
          <el-form-item label="现有金额：">
            <el-input v-model="RechargeForm.balance" disabled></el-input>
          </el-form-item>
          <el-form-item label="支付方式：">
            <el-row>
              <el-col :span="7">
                <el-select v-model="RechargeForm.recharge_type" placeholder="请选择">
                  <el-option
                    v-for="(item,index) in paymethod"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="充值金额：" prop="money">
            <el-row>
              <el-col :span="2">充</el-col>
              <el-col :span="7">
                <el-input v-model="RechargeForm.money" @input="getMoney()"></el-input>
              </el-col>

              <el-col :span="2">赠</el-col>
              <el-col :span="7">
                <el-input v-model="RechargeForm.give_money" disabled></el-input>
              </el-col>
              <el-col :span="1">元</el-col>
            </el-row>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="RechargeDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleRecharge">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>


<script>
import { getAllTime, getDayTime } from "@/utils/moment.js";
import {
  memberList,
  addMember,
  memberlevel,
  native,
  editMember,
  deleteMember,
  paymethod,
  memberAccount,
  memberStatus,
  memberGiveMoney
} from "@/api/member.js";

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
      memberForm: {
        value1: [],
        keys: "",
        page: 1,
        page_size: 10
      },

      total: 0,
      MemberTableData: [],

      //充值
      RechargeDialogVisible: false,
      RechargeForm: {
        name: "",
        level: "",
        balance: "",
        recharge_type: "",
        money: "",
        member_id: "",
        give_money: ""
      },

      //充值jiaoyan
      RechargeFormRules: {
        money: [{ required: true, message: "请输入充值金额", trigger: "blur" }]
      },

      AddDialogVisible: false,
      AddForm: {
        name: "",
        mobile: "",
        card_no: "",
        address: "",
        level: "",
        nationality: "",
        sex: ""
      },
      AddFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMible, trigger: "blur" }
        ],
        card_no: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
          { validator: idCard, trigger: "blur" }
        ],
        level: [{ required: true, message: "请选择会员等级", trigger: "blur" }],
        nationality: [
          { required: true, message: "请选择国籍", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }]
      },
      EditFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMible, trigger: "blur" }
        ],
        card_no: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
          { validator: idCard, trigger: "blur" }
        ],
        level: [{ required: true, message: "请选择会员等级", trigger: "blur" }],
        nationality: [
          { required: true, message: "请选择国籍", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }]
      },

      // 会员等级列表
      memberlevel: [],

      // 国籍列表
      nativeList: [],

      // 充值列表
      paymethod: [],

      EditDialogVisible: false,
      EditForm: {
        name: "",
        mobile: "",
        card_no: "",
        address: "",
        level: "",
        nationality: "",
        sex: ""
      },
      member_id: "", //会员id

      start_time: "",
      end_time: ""
    };
  },
  created() {
    this.getMemberList();
  },
  methods: {
    // 获取时间
    getTime() {
      console.log(this.memberForm.value1);
      this.start_time = getAllTime(this.memberForm.value1[0]);
      this.end_time = getAllTime(this.memberForm.value1[1]);
      console.log(this.start_time);
      console.log(this.end_time);
    },

    // //会员列表
    // getMemberList() {
    //   let params = {
    //     page: this.memberForm.page,
    //     page_size: this.memberForm.page_size
    //   };
    //   memberList(params).then(res => {
    //     res = typeof res == "string" ? JSON.parse(res) : res;
    //     console.log(res, "会员列表");
    //     if (res.code === 0) {
    //       this.MemberTableData = res.data.list;
    //       this.total = res.data.count;
    //     }
    //   });
    // },

    // 查询
    getMemberList() {
      let params = {
        page: this.memberForm.page,
        page_size: this.memberForm.page_size,
        start_time: this.start_time,
        end_time: this.end_time,
        keys: this.memberForm.keys
      };
      memberList(params).then(res => {
        res = typeof res == "string" ? JSON.parse(res) : res;
        console.log(res, "会员查询列表");
        if (res.code === 0) {
         this.MemberTableData = res.data.list;
          this.total = res.data.count;
        }
      });
    },

    // 分页
    handleSizeChange(val) {
      console.log(val);
      this.memberForm.page_size = val;
      this.getMemberList();
    },
    handleCurrentChange(val) {
      this.memberForm.page = val;
      this.getMemberList();
    },

    // 获取会员等级列表
    getMemberLevel() {
      memberlevel().then(res => {
        res = JSON.parse(res);
        console.log(res, "获取会员等级列表");
        if (res.code === 0) {
          this.memberlevel = res.data;
        } else {
          this.message("error", res.message);
        }
      });
    },

    selectLevel(e) {
      this.AddForm.level = e;
    },
    selectNative(e) {
      this.AddForm.nationality = e;
    },
    selectSex(e) {
      // console.log(e)
      this.AddForm.sex = e;
    },

    editSelectLevel(e) {
      this.EditForm.level = e;
    },
    editSelectNative(e) {
      this.EditForm.nationality = e;
    },
    editSelectSex(e) {
      this.EditForm.sex = e;
    },

    //获取国籍列表
    getNativeList() {
      native().then(res => {
        res = JSON.parse(res);
        console.log(res, "获取国籍列表");
        if (res.code === 0) {
          this.nativeList = res.data.list;
        } else {
          this.message("error", res.message);
        }
      });
    },

    // 增加会员弹框
    AddMemberDialog() {
      this.AddDialogVisible = true;
      this.getMemberLevel();
      this.getNativeList();
    },

    //提交新增会员
    AddMemberSubmit() {
      this.$refs.AddFormRef.validate(vaild => {
        if (vaild) {
          addMember(this.AddForm).then(res => {
            res = JSON.parse(res);
            console.log(res, "新增");
            if (res.code === 0) {
              this.message("success", "添加成功");
              this.getMemberList();
              this.memberlevel = {};
              this.nativeList = {};
              this.AddDialogVisible = false;
              this.AddForm = {};
            } else {
              this.message("error", res.message);
            }
          });
        }
      });
    },

    //关闭弹框清空表单
    cleranAddForm() {
      this.AddForm = {};
      this.memberlevel = {};
      this.nativeList = {};
    },

    //修改会员弹框
    EditDialog(v) {
      console.log(v);
      this.EditDialogVisible = true;
      this.EditForm.name = v.name;
      this.EditForm.mobile = v.mobile;
      this.EditForm.card_no = v.card_no;
      this.EditForm.address = v.address;
      this.EditForm.level = v.level;
      this.EditForm.nationality = v.nationality;
      this.EditForm.sex = v.sex;
      this.member_id = v.member_id;
      this.getMemberLevel();
      this.getNativeList();
    },

    //提交修改信息
    handleEditInfo() {
      let params = {
        name: this.EditForm.name,
        mobile: this.EditForm.mobile,
        card_no: this.EditForm.card_no,
        address: this.EditForm.address,
        level: this.EditForm.level,
        nationality: this.EditForm.nationality,
        sex: this.EditForm.sex,
        member_id: this.member_id
      };
      this.$refs.EditFormRef.validate(vaild => {
        if (vaild) {
          editMember(params).then(res => {
            res = JSON.parse(res);
            if (res.code === 0) {
              this.message("success", "修改成功");
              this.getMemberList();
              this.EditDialogVisible = false;
            } else {
              this.message("error", res.message);
            }
          });
        }
      });
    },

    //会员删除
    DeleteDialog(member_id) {
      console.log(member_id);
      this.confirm()
        .then(() => {
          deleteMember({ member_id }).then(res => {
            res = JSON.parse(res);
            if (res.code === 0) {
              this.getMemberList();
              this.message("success", "删除成功");
            } else {
              this.message("error", res.message);
            }
          });
        })
        .catch(() => {});
    },

    //充值方式
    getPaymethodList() {
      paymethod().then(res => {
        res = JSON.parse(res);
        console.log(res, "获取充值列表");
        if (res.code === 0) {
          this.paymethod = res.data;
        } else {
          this.message("error", res.message);
        }
      });
    },

    //充值弹框
    RechargeDialog(v) {
      this.RechargeDialogVisible = true;
      this.RechargeForm.name = v.name;
      this.RechargeForm.level = v.level;
      this.RechargeForm.balance = v.balance;
      this.RechargeForm.member_id = v.member_id;
      this.getPaymethodList();
    },

    //充值提交
    handleRecharge() {
      let params = {
        member_id: this.RechargeForm.member_id,
        recharge_type: this.RechargeForm.recharge_type,
        money: this.RechargeForm.money,
        give_money: this.RechargeForm.give_money
      };
      this.$refs.RechargeFormRef.validate(vaild => {
        if (vaild) {
          memberAccount(params).then(res => {
            res = JSON.parse(res);
            console.log(res, "充值");
            if (res.code === 0) {
              this.getMemberList();
              this.RechargeDialogVisible = false;
              this.RechargeForm.recharge_type = "";
              this.RechargeForm.money = "";
              this.RechargeForm.give_money = "";
              this.message("success", "充值成功");
            } else {
              this.message("error", res.message);
            }
          });
        }
      });
    },

    // 改变会员状态
    handleChangeSwitch(v) {
      console.log(v);
      let params = {
        member_id: v.member_id,
        status: v.status
      };
      memberStatus(params).then(res => {
        res = typeof res == "string" ? JSON.parse(res) : res;
        if (res.code == 0) {
          this.message("success", res.message);
        } else {
          this.message("error", res.message);
        }
      });
    },
    handelChange(){
      if(!this.memberForm.keys){
        this.getMemberList()
      }
    },
    getMoney(){
      memberGiveMoney({money:this.RechargeForm.money}).then(res => {
        res = typeof res == "string" ? JSON.parse(res) : res;
        // console.log(res,'22222222222222')
        if (res.code == 0) {
          this.RechargeForm.give_money=res.data
        } else {
          this.message("error", res.message);
        }
      });
    },

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
  /deep/.el-dialog__footer{
    text-align: center;
  }
}
</style>








   










   










   