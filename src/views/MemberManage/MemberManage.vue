<template>
  <!-- 会员管理 -->
  <el-container>
    <el-main>
      <el-form :model="memberForm" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="开始时间：">
              <el-date-picker v-model="memberForm.start_time" type="datetime" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="办理时间：">
              <el-date-picker v-model="memberForm.end_time" type="datetime" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-input
                v-model="memberForm.keys"
                placeholder="请输入姓名/身份证号/手机号"
                clearable
                :style="{width: '100%'}"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="2">
            <el-button type="primary" @click="Querybtn()">查询</el-button>
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
        <el-table-column prop="levelname" label="会员等级" width="100" align="center"></el-table-column>
        <el-table-column prop="mobile" label="手机号" width="120" align="center"></el-table-column>
        <el-table-column prop="card_no" label="身份证号 "  show-overflow-tooltip width="120" align="center"></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip width="200" align="center"></el-table-column>
        <el-table-column prop="balance" label="卡余额" width="80" align="center"></el-table-column>
        <el-table-column prop="navname" label="国籍" width="60" align="center"></el-table-column>
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
        <el-table-column prop="username" label="操作员" width="80" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="状态" align="center" width="80">
          <template v-slot="scope">
            <el-switch v-model="scope.row.state" active-color="#13ce66" inactive-color="#999"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="RechargeDialogVisible=true">充值</el-button>
            <el-button type="warning" size="small" @click="EditDialog(scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="DeleteDialog(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="memberForm.page"
        :page-sizes="[5, 10, 20, 30,50,100]"
        :page-size="memberForm.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 新增会员 -->
      <el-dialog title="新增会员" :visible.sync="AddDialogVisible" width="30%" @closed="cleranAddForm">
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
            <el-input v-model="AddForm.mobile"></el-input>
          </el-form-item>

          <el-form-item label="身份证号：">
            <el-input v-model="AddForm.card_no"></el-input>
          </el-form-item>
          <el-form-item label="身份证地址：">
            <el-input v-model="AddForm.address"></el-input>
          </el-form-item>
          <el-row :gutter="20" type="flex" class="select">
            <el-col :span="12">
              <el-form-item label="会员等级：">
                <el-select v-model="level" placeholder="请选择" @change="selectLevel($event)">
                  <el-option
                    v-for="(item,index) in memberlevel"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="国籍：">
                <el-select v-model="native" placeholder="请选择" @change="selectNative($event)">
                  <el-option
                    v-for="(item,index) in nativeList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
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
        <el-form :model="EditForm" label-width="100px">
          <el-form-item label="会员姓名：">
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
            <el-input v-model="EditForm.mobile"></el-input>
          </el-form-item>

          <el-form-item label="身份证号：">
            <el-input v-model="EditForm.card_no"></el-input>
          </el-form-item>
          <el-form-item label="身份证地址：">
            <el-input v-model="EditForm.address"></el-input>
          </el-form-item>
          <el-row :gutter="20" type="flex" class="select">
            <el-col :span="12">
              <el-form-item label="会员等级：">
                <el-select
                  v-model="EditForm.level"
                  placeholder="请选择"
                  @change="editSelectLevel($event)"
                >
                  <el-option
                    v-for="(item,index) in memberlevel"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="国籍：">
                <el-select
                  v-model="EditForm.native"
                  placeholder="请选择"
                  @change="editSelectNative($event)"
                >
                  <el-option
                    v-for="(item,index) in nativeList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="select">
            <el-col :span="12">
              <el-form-item label="性别：">
                <el-select v-model="EditForm.sex" placeholder="请选择" @change="editSelectSex($event)">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="办理门店：">
                <el-select v-model="EditForm.store" placeholder="请选择">
                  <el-option label="宿松路滨湖分店" value="1"></el-option>
                  <el-option label="大学城店" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>-->
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
import {
  memberList,
  addMember,
  memberlevel,
  native,
  editMember
} from "@/api/member.js";
export default {
  data() {
    return {
      memberForm: {
        start_time: "",
        end_time: "",
        keys: "",
        page: 1,
        page_size: 10
      },

      total: 0,
      MemberTableData: [],
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
        name: "",
        mobile: "",
        card_no: "",
        address: "",
        level_id: "",
        nationality_id: "",
        sex: "",
        // store: ""
        status: 1
      },

      // 会员等级列表
      memberlevel: [],

      level: "", //会员等级

      native: "", //国籍

      // 国籍列表
      nativeList: [],

      EditDialogVisible: false,
      EditForm: {
        name: "",
        tel: "",
        idcard: "",
        address: "",
        level_id: 0,
        nationality_id: 0,
        sex: "",
        store: "",
        level: "", //会员等级
        native: "" //国籍
      }
    };
  },
  created() {
    this.getMemberList();
  },
  methods: {
    //会员列表
    getMemberList() {
      let params = {
        page: this.memberForm.page,
        page_size: this.memberForm.page_size
      };
      memberList(params).then(res => {
        res = JSON.parse(res);
        console.log(res, "会员列表");
        if (res.code === 0) {
          this.MemberTableData = res.data.list;
          this.total = res.data.count;
        }
      });
    },

    // 查询
    Querybtn() {
      let params = {
        page: this.memberForm.page,
        page_size: this.memberForm.page_size,
        start_time: this.memberForm.start_time,
        end_time: this.memberForm.end_time,
        keys: this.memberForm.keys
      };
      memberList(params).then(res => {
        res = JSON.parse(res);
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
      this.AddForm.level_id = e;
    },
    selectNative(e) {
      this.AddForm.nationality_id = e;
    },
    selectSex(e) {
      console.log(e);
      this.AddForm.sex = e;
    },

    editSelectLevel(e) {
      this.EditForm.level_id = e;
    },
    editSelectNative(e) {
      this.EditForm.nationality_id = e;
    },
    editSelectSex(e) {
      console.log(e);
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
      addMember(this.AddForm).then(res => {
        res = JSON.parse(res);
        console.log(res, "新增");
        if (res.code === 0) {
          this.message("success", "添加成功");
          this.getMemberList();
                this.memberlevel={};
      this.nativeList={}
          this.AddDialogVisible = false;
          this.AddForm = {};
        } else {
          this.message("error", res.message);
        }
      });
    },

    //关闭弹框清空表单
    cleranAddForm() {
      this.AddForm = {};
      this.memberlevel={};
      this.nativeList={}
    },

    //修改会员弹框
    EditDialog(v) {
      console.log(v);
      this.EditDialogVisible = true;
      this.EditForm = v;
      this.EditForm.level_id = v.level_id;
      this.EditForm.nationality_id = v.nationality_id;
      this.getMemberLevel();
      this.getNativeList();
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
      width: 100%;
    }
  }
}
/deep/.el-dialog__footer {
  text-align: center;
}
</style>








   










   










   