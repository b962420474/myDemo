<template>
  <div id="app">
    <router-view/>
    <Greyscreen ref="Greyscreen" :isshow="isshow"></Greyscreen>
    <object ref="DemoPlugin" type="brown/UartPlugin" style="visibility:hidden; width:0px; height:0px;"></object>
  </div>

</template>

<script>
import Greyscreen from "./components/Greyscreen.vue"
import test from "@/test/test.js"
export default {
  components:{Greyscreen},
  data(){
    return {
      isshow:false,
      datas:{
        plugin:null
      }
    }
  },
  provide(){
    return {
      getDatas:this.getDatas
    }
  },
  created:function(){
    console.log("......");
  },
  mounted:function(){
    this.datas.plugin=this.$refs.DemoPlugin;
    try{
      this.$refs.DemoPlugin.uart_init();
    }
    catch(e){

    }
    //test(this.$router);
  },
  methods:{
    Greyscreen(){
      console.log("lock......");
      this.isshow=true;
    },
    getDatas:function(){
      return this.datas;
    }
  },
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  width: 480px;
  height: 272px;
  margin: auto;
  overflow: hidden;
  background: black;
  position: relative;
}
@font-face {
  font-family: "iconfont";
  src: url("./assets/iconfont.woff?t=1588148113549") format("woff");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a {
  text-decoration: none;
}
.home {
  display: -webkit-flex;
  -webkit-justify-content: center;
  z-index: 2;
  position: absolute;
  top: 10px;
  right: 20px;
}
</style>
