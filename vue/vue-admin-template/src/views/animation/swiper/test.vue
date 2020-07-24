<template>
  <div class="main">
    <swiper :list="list" class="swiper" :num="num">
      <template slot="todo" slot-scope="{item,isClick}">
        <div class="item" @click="click($event,isClick)" :style="{background:item.bg}">
          {{item.name}}
          <!-- <li v-for="(data,index) in item" :key="index"><i :class="data.name" @click="click($event,isClick)"></i></li> -->
        </div>
      </template>
      <template slot="btn" slot-scope="{left,right}">
        <button @click="left()">left</button>
        <button @click="right()">right</button>
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
      // list: [[
      //   {name:"el-icon-edit"},
      //   {name:"el-icon-share"},
      //   {name:"el-icon-delete"},
      //   {name:"el-icon-share"},
      //   {name:"el-icon-share"},
      //   {name:"el-icon-share"},
      //   {name:"el-icon-share"},
      // ],[
      //   {name:"el-icon-share"},
      //   {name:"el-icon-share"},
      //   {name:"el-icon-share"},
      //   {name:"el-icon-share"},
      //   {name:"el-icon-share"},
      //   {name:"el-icon-share"},
      // ]]
      num:3,
      list: [
        {name:"1",bg:"red"},
        {name:"2",bg:"blue"},
        {name:"3",bg:"white"},
        {name:"4",bg:"green"},
        {name:"5",bg:"gray"},
        {name:"6",bg:"yellow"},
        {name:"7",bg:"red"},
      ]
    };
  },
  computed: {
  },
  methods:{
    click(e,isClick){
      console.log(isClick);
    }
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


