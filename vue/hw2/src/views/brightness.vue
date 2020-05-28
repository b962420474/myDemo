<template>
  <div class="main_content">
   <div class="timer">
      <MyCircle
      v-for="(item,index) in datas.list"
      :key="index"
      :title="item.name"
      :base="item.base"
      :isshow="item.isshow"
      :num="item.num"
      :ref="item.name"
      :start="item.start"
      @click.native="pressKey(index)"
    ></MyCircle>
   </div>
    <div class="button" @click="tip()"> <img src="../assets/img/HWMLayerCmpltngConfirmButton_BackgroundImage.png"></div>
    <Tip :title="datas.tipTitle" ref="tip"></Tip>
  </div>
</template>
<script>
import MyCircle from "../components/MyCircle.vue";
import Tip from "../components/Tip.vue";
export default {
  components: { MyCircle,Tip },
  data() {
    return {
      // list: [
      //   { name: "Brightness", isshow: false, base: 9 ,num:9,start:0}
      // ],
      // tipTitle:"Brightness Set"
    };
  },
  beforeMount: function() {
    this.datas=this.$route.params.message;
  },
  computed: {},
  methods: {
    pressKey: function(index) {
      this.datas.list.forEach((element, i) => {
        if (i === index) {
          element.isshow = true;
        } else {
          element.isshow = false;
        }
      });
    },
    tip:function(){
      this.$refs.tip.show();
    }
  }
};
</script>
<style scoped>
.main_content {
  /* display: -webkit-flex; */
  height: 100%;
  width: 100%;
}
.timer{
    display: -webkit-flex;
    width: 100%;
}
.date {
  position: relative;
  -webkit-align-self: center;
  width: 66%;
}
.item {
  /* margin: 20px auto; */
  display: -webkit-flex;
  -webkit-justify-content: center;
}
.time {
  font-size: 60px;
}
.icon {
  -webkit-align-self: center;
}
.icon div {
  margin: 30px;
}
.week div {
  margin: 0 4px;
  font-size: 14px;
}
.button{
  margin-top: 10px;
}
</style>


