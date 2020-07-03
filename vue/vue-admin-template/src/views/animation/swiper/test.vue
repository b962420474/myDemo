<template>
  <div class="main">
    <swiper :list="list" class="swiper">
      <template slot="todo" slot-scope="{item}">
        <div class="item">
          <li v-for="(data,index) in item" :key="index"><i :class="data.name" @click="click"></i></li>
        </div>
      </template>
    </swiper>
  </div>
</template>
<script>
import swiper from "./components/swiper.vue";
export default {
  components: { swiper },
  data() {
    return {
      list: [[
        {name:"el-icon-edit"},
        {name:"el-icon-share"},
        {name:"el-icon-delete"},
        {name:"el-icon-share"},
        {name:"el-icon-share"},
        {name:"el-icon-share"},
        {name:"el-icon-share"},
      ],[
        {name:"el-icon-share"},
        {name:"el-icon-share"},
        {name:"el-icon-share"},
        {name:"el-icon-share"},
        {name:"el-icon-share"},
        {name:"el-icon-share"},
      ]]
    };
  },
  computed: {
  },
  methods:{
  }
};
</script>
<style scoped>
.main {
  width: 100%;
  overflow: hidden;
  height: 100%;
}
.swiper {
  display: flex;
  height: 300px;
}
.item {
    /* background: yellow; */
    text-align: center;
    border: 1px solid;
    height: 100%;
    display: flex;
    justify-content: center;
}
.item li{
   font-size: 100px;
   margin: 30px;
}
</style>


