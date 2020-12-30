<template>
  <el-container v-cloak>
    <el-main>
      <el-row type="flex" justify="center">
        <el-col :span="20">
          <el-row>
            <p class="title">计费设置</p>
          </el-row>

          <el-row align="middle" type="flex" justify="start">
            1、当天
            <el-time-picker
              is-range
              arrow-control
              v-model="formDevice.setTime"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              value-format="HH:mm:ss"
              @change="handlePickerChange"
            ></el-time-picker>时入住客人加收
            <el-input v-model="formDevice.yz_date" clearable></el-input>天房费；
          </el-row>

          <el-row align="middle" type="flex" justify="start">
            2、 退房超时
            <el-time-picker
              v-model="formDevice.tfend_time1"
              placeholder="请选择时间"
              style="width: 180px"
               value-format="HH:mm:ss"
            ></el-time-picker>每超过1小时加
            <el-input v-model="formDevice.tf_money1" clearable></el-input>元房费；退房超过
            <el-time-picker
              v-model="formDevice.tfend_time2"
              placeholder="请选择时间"
              style="width: 180px"
               value-format="HH:mm:ss"
            ></el-time-picker>加收
            <el-input v-model="formDevice.tf_date" clearable></el-input>天房费；
          </el-row>

          <el-row align="middle" type="flex" justify="start">
            3、当住客离店时间与当前时间的时间差小于
            <el-input v-model="formDevice.datecount" clearable></el-input>分钟时，消息提醒前台查看；
          </el-row>

          <el-row align="middle" type="flex" justify="start">
            4、会员入住退房时间点超过
            <el-time-picker
              v-model="formDevice.membertf_end_time1"
              placeholder="请选择时间"
               value-format="HH:mm:ss"
              style="width: 180px"
            ></el-time-picker>，每小时加收
            <el-input v-model="formDevice.membertf_tf_money1" clearable></el-input>元房费；退房超过
            <el-time-picker
              v-model="formDevice.membertf_end_time2"
               value-format="HH:mm:ss"
              placeholder="请选择时间"
              style="width: 180px"
            ></el-time-picker>加收
            <el-input v-model="formDevice.membertf_tf_date" clearable></el-input>天房费；
          </el-row>

          <el-row align="middle" type="flex" justify="start">
            5、酒店LOGO：
            <!-- <el-button type="primary">点击上传</el-button> -->
            <el-upload
              style="border:1px dashed #ddd"
              class="avatar-uploader"
              :multiple="false"
              action="https://api.anhuiqingyou.com/uploads/"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :http-request="selectPicUpload"
            >
              <img v-if="logo" :src="logo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon">上传</i>
            </el-upload>
          </el-row>

          <el-row align="middle" type="flex" justify="start">
            6、酒店总台电话：
            <el-input style="width: 180px" clearable v-model="formDevice.tel"></el-input>
          </el-row>

          <el-row align="middle" type="flex" justify="start">
            7、酒店业务系统自动夜审时间设置
            <el-time-picker v-model="formDevice.ys_time"  value-format="HH:mm:ss" placeholder="请选择时间"></el-time-picker>
          </el-row>

          <el-row align="middle" type="flex" justify="start">8、酒店业务员班次设置:</el-row>

          <el-row>
            <el-col>
              <el-table
                :data="tableData"
                :header-cell-style="{ textAlign: 'center' }"
                :cell-style="{ textAlign: 'center' }"
                style="width: 100%"
              >
                <el-table-column prop="name" label="班次名">
                  <template v-slot="scope">
                    <el-input style="width: 200px" v-model="scope.row.name" placeholder="请输入班次"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="date" label="班次工作时段">
                  <template v-slot="scope">
                    <el-time-picker
                     value-format="HH:mm:ss"
                      is-range
                      v-model="scope.row.time"
                      range-separator="至"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      placeholder="选择时间范围"
                    ></el-time-picker>
                  </template>
                </el-table-column>
                <el-table-column prop="setting" label="操作">
                  <template v-slot="scope">
                    <el-button icon="el-icon-minus" @click="reduceClass(scope)"></el-button>
                    <el-button icon="el-icon-plus" @click="addClass(scope)"></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>

          <el-row class="footer" type="flex" justify="center">
            <el-col>
              <el-button>取消</el-button>
              <el-button type="primary" @click="submitForm">保存</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import { getAllTime, getDayTime } from "@/utils/moment.js";
import { SetLogo, GetInfo ,SetBill} from "@/api/BillSetting";
export default {
  data() {
    return {
      formDevice: {},

      // 夜间入住时间段
      start_time: "",
      end_time: "",

      tableData: [
        {
          name: "早班",
          time: ""
        }
      ],

      logo: "",

    };
  },
  created() {
    this.GetBillInfo();
  },
  methods: {
    // 获取计费详情
    GetBillInfo() {
      GetInfo().then(res => {
        res = typeof res == "string" ? JSON.parse(res) : res;
        console.log(res, "计费详情");
        if (res.code === 0) {
          this.formDevice = res.data;
   
          this.logo=res.data.logo;
          this.tableData = res.data.ban_info;
          // this.formDevice.tfend_time1=res.data.tfend_time1
            this.tableData = res.data.ban_info;
            let arrTime = []
            arrTime.push(res.data.yzstart_time)
            arrTime.push(res.data.yzend_time)
            this.formDevice.setTime = arrTime
            console.log(arrTime)
        } else {
          this.message("error", res.message);
        }
      });
    },

    // 上传logo
    selectPicUpload(f) {
      let fd = new FormData();
      fd.append("file", f.file);
      SetLogo(fd).then(res => {
        res = typeof res == "string" ? JSON.parse(res) : res;
        console.log(res);
        if (res.code == 0) {
          this.logo =
            "https://api.anhuiqingyou.com/uploads/" + res.data[0][0];
        } else {
          this.message("error", res.message);
        }
      });
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG/png格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG || (isPNG && isLt2M);
    },

    // 增加
    addClass(v) {
      let tableData = this.tableData;
      if (tableData.length >= 3) {
        return this.$message({
          message: "最多添加三个班次",
          type: "error"
        });
      }
      tableData.push({
        name: "早班",
        time: ""
      });
    },

    // 减少
    reduceClass(v) {
      let tableData = this.tableData;
      if (tableData.length <= 1) {
        return this.$message({
          message: "此班次不可删除",
          type: "error"
        });
      }
      tableData.splice(v.$index, 1);
    },
  handlePickerChange(){
    this.$forceUpdate()
  },
    // 提交表单
    submitForm() {
        let ban_info="";
        this.tableData.forEach(item =>{
          let zaoTime=item.time[0]
          let wanTime=item.time[1]
          let time=zaoTime+"-"+wanTime
          ban_info += `${item.name},${time};`;
        });
          ban_info = ban_info.substring(0, ban_info.length - 1);
          // console.log(ban_info)

      let parmas = {
        yzstart_time: this.formDevice.setTime[0],
        yzend_time: this.formDevice.setTime[1],
        yz_date: this.formDevice.yz_date,
        tfend_time1: this.formDevice.tfend_time1,
        tf_money1: this.formDevice.tf_money1,
        tfend_time2: this.formDevice.tfend_time2,
        tf_date: this.formDevice.tf_date,
        datecount: this.formDevice.datecount,
        membertf_end_time1: 
          this.formDevice.membertf_end_time1
        ,
        membertf_tf_money1: this.formDevice.membertf_tf_money1,
        membertf_end_time2: this.formDevice.membertf_end_time2,
        membertf_tf_date: this.formDevice.membertf_tf_date,
        ban_info: ban_info,
        logo: this.logo,
        tel: this.formDevice.tel,
        ys_time: this.formDevice.ys_time
      };
      SetBill(parmas).then(res => {
        res = typeof res == "string" ? JSON.parse(res) : res;
        console.log(res);
        if (res.code === 0) {
          this.message("success", res.message);
        } else {
          this.message("error", res.message);
        }
      });
    },

  
  }
};
</script>


<style lang="less" scoped>
.el-select {
  width: 90px;
}
.el-input {
  width: 100px;
}
.el-date-editor,
.el-input,
.el-select {
  margin: 0 10px;
}
.el-row.is-align-middle {
  margin-bottom: 20px;
}
.el-button {
  margin: 0 10px;
}
.footer {
  margin-top: 20px;
  .el-button {
    width: 100px;
  }
}
.el-upload {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>









   