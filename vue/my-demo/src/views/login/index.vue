<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form
          autocomplete="on"
          :model="loginForm"
          status-icon
          :rules="rules2"
          ref="loginForm"
          class="demo-ruleForm"
        >
          <el-form-item prop="userName">
            <el-input
              type="text"
              v-model="loginForm.userName"
              auto-complete="on"
              placeholder="请输入用户名"
            >
              <span slot="prefix">
                <svg-icon icon-class="user" class="color-main"></svg-icon>
              </span>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :type="pwdType"
              v-model="loginForm.password"
              auto-complete="on"
              placeholder="请输入密码"
            >
              <span slot="prefix">
                <svg-icon icon-class="password" class="color-main"></svg-icon>
              </span>
              <span slot="suffix" @click="showPwd">
                <svg-icon icon-class="eye" class="color-main"></svg-icon>
              </span>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">登陆</el-button>
            <el-button @click="resetForm('loginForm')">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import { isvalidUsername } from "@/util/validate";
import { setCookie ,getCookie} from "@/util/cookie";
export default {
  data() {
    var validateUserName = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value.trim().length < 3) {
        callback(new Error("密码不能小于3位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        userName: "",
        password: ""
      },
      rules2: {
        userName: [
          { required: true, validator: validateUserName, trigger: "blur" }
        ],
        password: [{ required: true, validator: validatePass, trigger: "blur" }]
      },
      pwdType: "password"
    };
  },
  created:function(){
    this.loginForm.userName=getCookie("username");
    this.loginForm.password=getCookie("password");
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('Login',this.loginForm).then(()=>{
            setCookie("username",this.loginForm.userName,15);
            setCookie("password",this.loginForm.password,15);
            this.$router.push({path:'/'});
          }).catch((error)=>{
            console.log("zhanghaomima cuowu ");
          });
        } else {
          console.log("参数不合法!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType == "password";
      }
    }
  }
};
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  margin: auto;
}
</style>
