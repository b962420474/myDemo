<template>
  <div class="header">
    <div class="items logo"></div>
    <div class="items">
      <router-link to="/">首页</router-link>
    </div>
    <div class="items inputBox">
      <input type="text" v-model="searchText">
      <label class="iconfont">&#xe610;</label>
    </div>
    <div class="items">
      <ul>
        <el-dropdown v-for="item in items" :key="item.title">
          <span class="el-dropdown-link">
            {{item.title}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(d,index) in item.children" :key="index">
              <router-link :to="d.path">{{d.title}}</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown>
          <img class="el-dropdown-link" src="../assets/default.jpg">
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link to="/">个人中心</router-link>
            </el-dropdown-item>
            <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          path: "/edit",
          title: "创作中心",
          children: [{ path: "/edit", title: "写博客" }]
        }
      ],
      searchText: ""
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout");
      this.$router.push({ path: "/login" });
    }
  }
};
</script>
<style scoped>
.header {
  position: absolute;
  top: 0px;
  color: #333;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  min-width: 1200px;
  width: 100%;
  padding: 10px 28px 10px 17px;
}
.logo {
  width: 26px;
  height: 26px;
  background-image: url("../assets/logo.png");
  background-size: cover;
  position: absolute;
  left: 100px;
  top: 12px;
}
.items {
  display: inline-block;
  margin: auto 10px;
}
.items li {
  padding: 0 10px;
}
.inputBox {
  padding: 3px;
  border: solid 1px;
  border-radius: 5px;
}
.inputBox label {
  cursor: pointer;
  z-index: 1;
}
input {
  border: 0;
}
img {
  color: #d4d4d4;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: inline-block;
  margin-top: -7px;
  background-color: #eee;
  vertical-align: top;
}
</style>


