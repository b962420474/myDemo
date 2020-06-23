<template>
  <div id="app">
    <router-view @lock="lock()" ref="route" v-if="isRouterAlive" :key="$route.fullPath"/>
    <Lock ref="lock"></Lock>
    <Greyscreen :isshow="isshow"></Greyscreen>
    <object
      ref="DemoPlugin"
      type="brown/UartPlugin"
      style="visibility:hidden; width:0px; height:0px;"
      @onRoute="onRouter"
      @onSetting="receive"
    ></object>
  </div>
</template>

<script>
import Lock from "./components/Lock.vue";
import Greyscreen from "./components/Greyscreen.vue";
export default {
  name: "App",
  components: { Lock,Greyscreen },
  provide() {
    return {
      reload: this.reload,
      getDatas:this.getDatas
    };
  },
  created: function() {
    var self = this;
  },
  mounted: function() {
    var self = this;
    this.datas.plugin=this.$refs.DemoPlugin;
    try{
      this.$refs.DemoPlugin.uart_init();
    }catch(e){
      
    }
  },
  data() {
    return {
      isRouterAlive: true,
      isshow:false,
      datas:{
        plugin:null
      }
    };
  },
  methods: {
    lock() {
      console.log("lock......");
      this.$refs.lock.show();
    },
    reload: function() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    onRouter(path) {
      console.log(".....receive router....");
      console.log(path);
      let p = path.split("?");
      let view = "/"+p[1];
      switch (p[0]) {
        case "setting":
        this.isshow=false;
          this.$router.push({ path: view });
          break;
        case "defrost":
        this.isshow=false;
          this.$router.push({ path: "/defrost"+view });
          break;
        case "presets":
        this.isshow=false;
          this.$router.push({ path: "/presets"+view });
          break;
        case "heating":
        this.isshow=false;
          this.$router.push({ path: "/heating"+view });
          break;
        case "main":
        this.isshow=false;
          this.$router.push({ path: "/"});
          break;
        case "gray":
          this.isshow=true;
          break;
      }
    },
    receive:function(path,type,num){
      console.log(path+","+type+","+num);
      this.$refs.route.updateNum(type,num);
    },
    getDatas:function(){
      return this.datas;
    }
  }
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
.center {
  margin: auto;
}
.ClassyCountdown-value {
  width: 100%;
  line-height: 1em;
  position: absolute;
  top: 50%;
  text-align: center;
  left: 0;
  display: block;
  font-family: "Open Sans";
  font-weight: 300;
  -webkit-transform: translateY(-50%);
  font-size: 15px;
}
.num {
  font-size: 30px;
  margin-top: 10px;
  font-weight: 500;
}
</style>
