<template>
  <div id="app">
    <router-view @lock="lock()" v-if="isRouterAlive"/>
    <Lock ref="lock"></Lock>
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
    // setTimeout(() => {
    //   self.$router.push({name:"brightness",params:{message:{
    //     list: [
    //     { name: "Brightness", isshow: false, base: 9 ,num:9,start:0}
    //     ],
    //     tipTitle:"Brightness Set"
    //   }}});
    // }, 10000);

    // setTimeout(() => {
    //   self.$router.push({name:"defrost",params:{message:{
    //     list: [
    //     { name: "Voice", isshow: false, base: 3 ,num:1,start:0}
    //     ],
    //     tipTitle:"Voice Set"
    //   }}});
    // }, 20000);
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
