<template>
  <div class="backs">
    <router-link :to="path" @click.native="sendRora()">
      <div class="back iconfont">&#xe655;</div>
    </router-link>
    <div class="title">{{postTitle}}</div>
  </div>
</template>
<script>
export default {
  props: ["postTitle", "path"],
  inject:['getDatas'],
  data() {
    return {
      plugin:null
    };
  }
  ,created:function(){
    this.plugin=this.getDatas().plugin;
  },
  methods: {
    sendRora:function(){
      this.fns.roar(this.plugin);
    }
  }
};
</script>
<style scoped>
.back {
  position: relative;
  z-index: 120;
  font-size: 30px;
  width: 48px;
  height: 48px;
  text-align: center;
  line-height: 48px;
  color: white;
}
.backs {
  display: -webkit-flex;
  line-height: 48px;
  font-size: 25px;
}
</style>


