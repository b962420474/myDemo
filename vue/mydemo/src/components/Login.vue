<template>
  <div>
    <div class="login">
      <div class="login_main">
        <div class="item">
          <input type="text" v-model="name" @focus="focus" @blur="blur" placeholder="用户名">
          <label class="iconfont icon-shanchu" v-show="iconShow" @mousedown="clear($event)"></label>
          <span></span>
        </div>
        <div class="item">
          <input :type="pwdType" v-model="password" placeholder="密码">
          <label class="iconfont" :class="iconeye" @click="handleEye"></label>
          <span></span>
        </div>
        <div class="item">
          <button @click="login" class="btn">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "../libs/service";
import $ from 'jquery'
export default {
  name: "Login",
  data() {
    return {
      name: "",
      password: "",
      iconShow: false,
      iconeye: "icon-yanjing",
      pwdType: "password"
    };
  },
  methods: {
    login: function() {
      var param = {
        name: this.name,
        password: this.password
      };
      service.ajax
        .post("login", param)
        .then(res => {
          console.log("登陆成功");
        })
        .catch(res => {
          console.log(res);
        });
        this.$router.push({path:"home"});
    },
    focus: function() {
      this.iconShow = true;
    },
    blur: function() {
      this.iconShow = false;
    },
    handleEye: function() {
      if (this.pwdType === "text") {
        this.iconeye = "icon-yanjing";
        this.pwdType = "password";
      } else {
        this.iconeye = "icon-iconcloseeye";
        this.pwdType = "text";
      }
    },
    clear: function(e) {
      this.name = "";
      $(e.target).prev().focus();
      e.preventDefault();
    }
  }
};
</script>
<style lang="css" scoped>
.login {
  width: 450px;
  height: 444px;
  margin: auto;
  position: relative;
  padding: 30px 0;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
}
.login_main {
  width: 50%;
  margin: 44px auto 0;
}
.login_main input {
  display: block;
  width: 100%;
  height: 32px;
  border-radius: 4px 4px;
  line-height: 32px;
  font-size: 14px;
  color: #4d4d4d;
  border: 1px solid #ccc;
  background-color: #fff;
  background-image: none;
  padding-right: 10%;
  padding-left: 3%;
}
.item {
  margin: 10px auto;
  position: relative;
}
.item label {
  position: absolute;
  right: -15%;
  top: 0;
  cursor: pointer;
  width: 35px;
  height: 35px;
  /* text-align: center; */
  z-index: 1;
  font-size: 25px;
  padding: 5px;
}
.btn {
  margin-top: 100px;
  width: 113%;
  background-color: #f5f5f5;
  border-color: transparent;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  border: 1px solid transparent;
  background-image: none;
  white-space: nowrap;
  cursor: pointer;
  touch-action: manipulation;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 400;
  height: 37px;
  line-height: 1.5;
  border-radius: 4px 4px;
  user-select: none;
}
</style>


