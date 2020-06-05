<template>
  <div id="app">
    <router-view @lock="lock()" v-if="isRouterAlive"/>
    <Lock ref="lock"></Lock>
    <object ref="DemoPlugin" type="brown/DemoPlugin" style="visibility:hidden; width:0px; height:0px;" @onRouter="onRouter"></object>
  </div>
</template>

<script>
import Lock from "./components/Lock.vue"
export default {
  name: "App",
  components:{Lock},
  provide(){
    return {
      reload:this.reload
    }
  },
   created:function(){
    var self=this;
  },
  data(){
    return {
      isRouterAlive:true
    }
  },
  methods:{
    lock(){
      console.log("lock......");
      this.$refs.lock.show();
  },
  reload:function(){
    this.isRouterAlive=false;
    this.$nextTick(function(){
      this.isRouterAlive=true;
    })
  },
  onRouter(path){
    console.log(".....receive router....");
    console.log(path);
    let p=path.splice("/");
    let view=p[1];
    switch(p[0]){
      case "setting":
      this.$router.push({name:view});
    }
  }
}
}
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
</style>
