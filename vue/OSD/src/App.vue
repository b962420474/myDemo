<template>
  <div id="app">
    <router-view/>
    <object
      ref="plugin"
      type="brown/UartPlugin"
      style="visibility:hidden; width:0px; height:0px;"
    ></object>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted:function(){
    this.plugin.init(this.$refs.plugin);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
@font-face {
  font-family: "iconfont";
  src: url("./assets/iconfont.woff?t=1588148113549") format("woff");
}
.iconfont {
  font-family: "iconfont" !important;
  /* font-size: 16px; */
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*{
  list-style: none;
  margin:0
}
</style>
