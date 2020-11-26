<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :offset="3" :span="18">
          <el-row>
            <p class="title">换房登记</p>
          </el-row>
          <el-form ref="formRoomChange" label-width="130px" :model="formRoomChange" :rules="rules">
            <el-row type="flex" justify="space-between">
              <el-col :span="6">
                <el-form-item label="客户类型：">
                  <el-select v-model="formRoomChange.clientType" style="width: 100%">
                    <el-option label="散客" value="sanke"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="团体名称：">
                  <el-input clearable v-model="formRoomChange.groupName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="国籍：">
                  <el-select v-model="formRoomChange.nationality" style="width: 100%">
                    <el-option label="中国" value="中国"></el-option>
                    <el-option label="英国" value="英国"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="8">
                <el-form-item label="证件类型：" prop="IDtype">
                  <el-select v-model="formRoomChange.IDtype" style="width: 63%">
                    <el-option label="农村" value="nongcun"></el-option>
                    <el-option label="城市" value="chengshi"></el-option>
                  </el-select>
                  <el-button size="small " style="margin-left: 16px" type="primary">读身份证</el-button>
                </el-form-item>
              </el-col>
              <el-col :pull="1" :span="6">
                <el-form-item label="联系电话：" prop="userPhone">
                  <el-input clearable v-model="formRoomChange.phoneNum"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="会员卡号：">
                  <el-input clearable v-model="formRoomChange.cardNum"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="6">
                <el-form-item label="客主姓名：" prop="username">
                  <el-input clearable v-model="formRoomChange.username"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="证件号：" prop="IDcardNum">
                  <el-input clearable v-model="formRoomChange.IDcardNum"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-button style="width: 100%" type="success">住客登记>></el-button>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="6">
                <el-form-item label="离店时间：" prop="goOutTime">
                  <el-date-picker
                    style="width: 100%"
                    v-model="formRoomChange.goOutTime"
                    type="datetime"
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="已预付款(元)：">
                  <el-input clearable v-model="formRoomChange.haveImprest"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="原客房类型：" prop="oldRoomType">
                  <el-select v-model="formRoomChange.oldRoomType" style="width: 100%">
                    <el-option label="三人间" value="three"></el-option>
                    <el-option label="两人间" value="two"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="6">
                <el-form-item label="原房间号：">
                  <el-input clearable v-model="formRoomChange.oldRoomNum"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="原房价(元)：">
                  <el-input clearable v-model="formRoomChange.oldRoomPrice"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="会员卡支付：">
                  <el-select v-model="formRoomChange.isVipPay" style="width: 100%">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <p class="chooseTitle">可选房型：</p>
          <div class="chooseRoom">
            <el-row :gutter="20" type="flex" justify="left">
              <el-col :span="8">
                <el-check-group v-model="roomType">
                  <el-checkbox
                    v-for="(v,i) in roomType"
                    :key="i"
                    :name="v.roomtype"
                  >{{v.roomtype}}({{v.sheng}}/{{v.sum}})</el-checkbox>
                </el-check-group>
              </el-col>

              <el-col :span="16" class="chooseRoomRight">
                <div class="floorItem" v-for="(v,i) in louceng" :key="i">
                  <p>{{v.floor}}：</p>
                  <ul>
                    <li v-for="(f,id) in v.listItem" :key="id">
                      <span>{{f.floorNo}}</span>
                      <span>{{f.type}}</span>
                    </li>
                  </ul>
                </div>
              </el-col>
            </el-row>
          </div>

            <el-row type="flex" justify="space-between">
              <el-col :span="6">
                <el-form-item label="新客房类型：" prop="newRoomType">
                  <el-select v-model="formRoomChange.newRoomType" style="width: 100%">
                    <el-option label="三人间" value="three"></el-option>
                    <el-option label="两人间" value="two"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="新房号(元)：" prop="newRoomNum">
                  <el-input clearable v-model="formRoomChange.newRoomNum"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="新房价(元)：" prop="newRoomPrice">
                  <el-input clearable v-model="formRoomChange.newRoomPrice"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-between">
              <el-col :span="6">
                <el-form-item label="卡扣金额：">
                  <el-input clearable v-model="formRoomChange.cardKkNum"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预付款方式：" prop="payWay">
                  <el-select v-model="formRoomChange.payWay" style="width: 100%">
                    <el-option label="现金" value="xianjin"></el-option>
                    <el-option label="支付宝" value="zhifubao"></el-option>
                    <el-option label="微信" value="weixin"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预付订金额：" prop="bookMoney">
                  <el-input clearable v-model="formRoomChange.bookMoney"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" style="margin-top: 20px" justify="start">
              <el-col :span="22">
                <el-form-item label="备注：" prop="remark">
                  <el-input type="textarea" v-model="formRoomChange.remark" placeholder="填写备注"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="start">
              <el-col :span="12">
                <p class="handleStaff">
                  <span>操作员：店小二</span>
                  <span>操作时间：2020-11-11 15:20</span>
                </p>
              </el-col>
            </el-row>

            <el-row style="margin-top: 30px">
              <el-form-item>
                <el-button style="width: 100px" size="medium" type="success" @click="submitForm">提交</el-button>
                <el-button style="width: 100px" @click="resetForm">重置</el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    const idCardValidity = (rule, code, callback) => {
      var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
      };
      var tip = "";
      var pass = true;
      if (
        !code ||
        !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
          code
        )
      ) {
        tip = "身份证号格式错误";
        pass = false;
      } else if (!city[code.substr(0, 2)]) {
        // tip = "地址编码错误"
        tip = "身份证输入错误";
        pass = false;
      } else {
        // 18位身份证需要验证最后一位校验位
        if (code.length === 18) {
          code = code.split("");
          // ∑(ai×Wi)(mod 11)
          // 加权因子
          var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          // 校验位
          var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
          var sum = 0;
          var ai = 0;
          var wi = 0;
          for (var i = 0; i < 17; i++) {
            ai = code[i];
            wi = factor[i];
            sum += ai * wi;
          }
          var last = parity[sum % 11];
          if (parity[sum % 11] != code[17]) {
            // tip = "校验位错误"
            tip = "身份证输入错误";
            pass = false;
          }
        }
      }
      if (!pass) {
        callback(new Error(tip));
      } else {
        callback();
      }
    };
    var newRoomNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("新房号不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 100);
    };
    var newRoomPrice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("新房价不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 100);
    };
    var bookMoney = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("预付定金额不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 100);
    };

    return {
      formRoomChange: {
        clientType: "",
        groupName: "",
        nationality: "",
        IDtype: "",
        phoneNum: "",
        cardNum: "",
        username: "",
        IDcardNum: "",
        goInTime: "",
        haveImprest: "",
        oldRoomType: "",
        oldRoomNum: "",
        oldRoomPrice: "",
        newRoomType: "",
        newRoomNum: "",
        newRoomPrice: "",
        newRoomNum: "",
        isVipPay: "",
        cardKkNum: "",
        payWay: "",
        bookMoney: "",
        remark: ""
      },
      //   表单规则
      rules: {
        goOutTime: [
          { required: true, message: "请选择离店时间", trigger: "change" }
        ],
        goInTime: [
          { required: true, message: "请选择续住时间", trigger: "change" }
        ],
        IDtype: [
          { required: true, message: "请选择证件类型", trigger: "change" }
        ],
        remark: [
          {
            required: true,
            message: "换房预付款为免费时必填",
            trigger: "blue"
          }
        ],
        username: [
          { required: true, message: "请输入客户姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        payWay: [
          { required: true, message: "请选择预订支付方式", trigger: "change" }
        ],
        oldRoomType: [
          { required: true, message: "请选择原客房类型", trigger: "change" }
        ],
        newRoomType: [
          { required: true, message: "请选择新客房类型", trigger: "change" }
        ],
        IDcardNum: [{ validator: idCardValidity, trigger: "blur" }],
        newRoomNum: [{ validator: newRoomNum, trigger: "blur" }],
        newRoomPrice: [{ validator: newRoomPrice, trigger: "blur" }],
        payWay: [
          { required: true, message: "请选择预付款方式", trigger: "change" }
        ],
        bookMoney: [{ validator: bookMoney, trigger: "blur" }]
      },
            roomType: [
        {
          roomtype: "单人间",
          sheng: 10,
          sum: 30
        },
        {
          roomtype: "标间",
          sheng: 10,
          sum: 30
        },
        {
          roomtype: "三人间",
          sheng: 10,
          sum: 30
        },
        {
          roomtype: "五人间",
          sheng: 10,
          sum: 30
        },
        {
          roomtype: "十人间",
          sheng: 10,
          sum: 30
        },
        {
          roomtype: "钟点房",
          sheng: 10,
          sum: 30
        }
      ],
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
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 2,
              floorNo: 8103,
              status: "空闲中",
              type: "五人间",
              background: "#005AB9",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 3,
              floorNo: 8104,
              status: "入住中",
              type: "五人间",
              background: "#FE775E",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 4,
              floorNo: 8105,
              status: "空闲中",
              type: "五人间",
              background: "#005AB9",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 5,
              floorNo: 8106,
              status: "空闲中",
              type: "五人间",
              background: "#005AB9",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 6,
              floorNo: 8107,
              status: "空闲中",
              type: "五人间",
              background: "#005AB9",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 7,
              floorNo: 8108,
              status: "空闲中",
              type: "五人间",
              background: "#005AB9",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 8,
              floorNo: 8102,
              status: "预订中",
              type: "三人间",
              background: "#FCB634",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 9,
              floorNo: 8103,
              status: "空闲中",
              type: "五人间",
              background: "#005AB9",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 10,
              floorNo: 8104,
              status: "入住中",
              type: "五人间",
              background: "#FE775E",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 11,
              floorNo: 8105,
              status: "空闲中",
              type: "五人间",
              background: "#005AB9",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 12,
              floorNo: 8106,
              status: "空闲中",
              type: "五人间",
              background: "#005AB9",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 13,
              floorNo: 8107,
              status: "空闲中",
              type: "五人间",
              background: "#005AB9",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 14,
              floorNo: 8108,
              status: "空闲中",
              type: "五人间",
              background: "#005AB9",
              icon: "@/assets/image/zhong.png"
            }
          ]
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
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 25,
              floorNo: 8102,
              status: "空闲中",
              type: "五人间",
              background: "#005AB9",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 26,
              floorNo: 8102,
              status: "预订中",
              type: "三人间",
              background: "#FCB634",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 27,
              floorNo: 8103,
              status: "空闲中",
              type: "五人间",
              background: "#005AB9",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 28,
              floorNo: 8104,
              status: "入住中",
              type: "五人间",
              background: "#FE775E",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 29,
              floorNo: 8105,
              status: "空闲中",
              type: "五人间",
              background: "#005AB9",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 30,
              floorNo: 8106,
              status: "空闲中",
              type: "五人间",
              background: "#005AB9",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 31,
              floorNo: 8107,
              status: "空闲中",
              type: "五人间",
              background: "#005AB9",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 32,
              floorNo: 8108,
              status: "空闲中",
              type: "五人间",
              background: "#005AB9",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 33,
              floorNo: 8108,
              status: "空闲中",
              type: "五人间",
              background: "#005AB9",
              icon: "@/assets/image/zhong.png"
            }
          ]
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
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 16,
              floorNo: 8102,
              status: "空闲中",
              type: "五人间",
              background: "#005AB9",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 17,
              floorNo: 8102,
              status: "预订中",
              type: "三人间",
              background: "#FCB634",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 18,
              floorNo: 8103,
              status: "空闲中",
              type: "五人间",
              background: "#005AB9",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 19,
              floorNo: 8104,
              status: "入住中",
              type: "五人间",
              background: "#FE775E",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 20,
              floorNo: 8105,
              status: "空闲中",
              type: "五人间",
              background: "#005AB9",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 21,
              floorNo: 8106,
              status: "空闲中",
              type: "五人间",
              background: "#005AB9",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 22,
              floorNo: 8107,
              status: "空闲中",
              type: "五人间",
              background: "#005AB9",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 23,
              floorNo: 8108,
              status: "空闲中",
              type: "五人间",
              background: "#005AB9",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 34,
              floorNo: 8108,
              status: "空闲中",
              type: "五人间",
              background: "#005AB9",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 35,
              floorNo: 8108,
              status: "空闲中",
              type: "五人间",
              background: "#005AB9",
              icon: "@/assets/image/zhong.png"
            },
            {
              id: 36,
              floorNo: 8108,
              status: "空闲中",
              type: "五人间",
              background: "#005AB9",
              icon: "@/assets/image/zhong.png"
            }
          ]
        }
      ],
    };
  },

  methods: {
    // 提交表单
    submitForm() {
      this.$refs.formRoomChange.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm() {
      this.$refs.formRoomChange.resetFields();
    }
  }
};
</script>
<style lang="less" scoped>
.chooseTitle {
      text-align: left;
    }
        .chooseRoom {
      background: #f9f9f9;
      padding: 20px 20px 0;
      margin: 10px 0 20px;

      /deep/.el-checkbox {
        text-align: left;
        display: block;
        margin-bottom: 20px;
      }
      .chooseRoomRight {
        height: 280px;
        overflow-y: auto;
      }
      .floorItem {
        text-align: left;
        p {
          margin-bottom: 10px;
        }
        ul {
          display: flex;

          flex-wrap: wrap;
          li {
            padding: 5px 10px;
            border: 1px solid #333;
            margin: 0 10px 10px 0;
            span {
              display: block;
              color: #333;
              font-size: 14px;
              cursor: pointer;
            }
          }
        }
      }
    }
</style>

<style scoped>
/* .el-form-item {
  margin-bottom: 35px !important;
} */
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 256px;
}
/deep/.el-checkbox {
  font-size: 18px;
}
/deep/.el-checkbox__inner {
  width: 20px;
  height: 20px;
}
/deep/.el-checkbox__inner::after {
  height: 11px;
  left: 8px;
  top: 2px;
}
/deep/.el-checkbox__label {
  font-size: 18px;
  line-height: 20px;
}
</style>