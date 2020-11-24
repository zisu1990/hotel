<template>
  <el-container>
    <el-main>
      <h2>入住登记</h2>
      <div class="checkWarp">
        <el-form ref="checkInForm" :model="checkInForm" :rules="checkInRef" label-width="100px">
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8">
              <el-form-item label="客户类型：">
                <el-select
                  v-model="checkInForm.personType"
                  placeholder="选择客客户类型"
                  :style="{width: '100%'}"
                >
                  <el-option
                    v-for="(item, index) in personTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="团体名称：">
                <el-input
                  v-model="checkInForm.teamName"
                  placeholder="请输入团体名称"
                  clearable
                  :style="{width: '100%'}"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="国籍：">
                <el-select v-model="checkInForm.native" placeholder="选择国籍" :style="{width: '100%'}">
                  <el-option
                    v-for="(item, index) in nativeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8">
              <el-form-item label="证件类型：">
                <el-select
                  v-model="checkInForm.certificate"
                  placeholder="选择证件类型"
                  :style="{width: '100%'}"
                >
                  <el-option
                    v-for="(item, index) in certificateOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
                <!-- <el-button>读取身份证</el-button> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话：">
                <el-input
                  v-model="checkInForm.tel"
                  placeholder="请输入联系电话"
                  clearable
                  :style="{width: '100%'}"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="会员卡号：">
                <el-input
                  v-model="checkInForm.vipNumber"
                  placeholder="请输入会员卡号"
                  clearable
                  :style="{width: '100%'}"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            
            <el-col :span="8">
              <el-form-item label="客主姓名：">
                <el-input
                  v-model="checkInForm.name"
                  placeholder="请输入客主姓名"
                  clearable
                  :style="{width: '100%'}"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码：">
                <el-input
                  v-model="checkInForm.idNumber"
                  placeholder="请输入证件号码"
                  clearable
                  :style="{width: '100%'}"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button type="success">住客登记查询</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      checkInForm: {
        personType: "",
        teamName: "",
        certificate: "",
        tel: "",
        vipNumber: "",
        name:'',
        idNumber:''
        
      },
      checkInRef: {
        personType: [],
        teamName: []
      },
      personTypeOptions: [
        {
          label: "散客",
          value: 1
        },
        {
          label: "团体",
          value: 2
        }
      ],
      nativeOptions: [
        {
          label: "中国",
          value: 1
        },
        {
          label: "美国",
          value: 2
        }
      ],
      certificateOptions: [
        {
          label: "身份证",
          value: 1
        },
        {
          label: "驾驶证",
          value: 2
        },
        {
          label: "学生证",
          value: 3
        }
      ]
    };
  },
  methods: {}
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
  }
}
</style>

