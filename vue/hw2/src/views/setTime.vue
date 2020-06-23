<template>
  <div class="main_content">
   <div class="timer">
    <Ring
        class="center"
        :base="hour.base"
        :isshow="hour.isshow"
        :num="hour.num"
        ref="hour"
        :start="hour.start"
        @click.native="pressKey(hour)"
      >
        <div class="ClassyCountdown-value">
          <div>{{$t(hour.name)}}</div>
          <div class="num">{{hour.num}}</div>
        </div>
      </Ring>
      <Ring
        class="center"
        :base="minute.base"
        :isshow="minute.isshow"
        :num="minute.num"
        ref="minute"
        :start="minute.start"
        @click.native="pressKey(minute)"
      >
        <div class="ClassyCountdown-value">
          <div>{{$t(minute.name)}}</div>
          <div class="num">{{minute.num}}</div>
        </div>
      </Ring>
   </div>
    <div class="button" @click="tip()"> <img src="../assets/img/HWMLayerCmpltngConfirmButton_BackgroundImage.png"></div>
    <Tip :title="$t(title)" ref="tip"></Tip>
  </div>
</template>
<script>
import Ring from "../components/Ring.vue";
import Tip from "../components/Tip.vue";
export default {
  components: { Ring,Tip },
  inject:['getDatas'],
  data() {
    return {
      title:'time_set',
      hour:{ name: 'hour', isshow: true, base: 23 ,num:5,start:0,key:"hour"},
      minute: { name: 'minute', isshow: false, base: 59 ,num:5,start:0,key:"minute"},
      plugin:null
    };
  },
  created:function(){
    this.plugin=this.getDatas().plugin;
  },
  beforeMount: function() {
    const date = new Date();
    this.hour.num = date.getHours();
    this.minute.num = date.getMinutes();
    try{
      this.plugin.setting("setTime",this.hour.key,this.hour.num);
    }catch(e){}
  },
  computed: {},
  methods: {
    pressKey: function(item) {
      this.hour.isshow=false;
      this.minute.isshow=false;
      item.isshow = true;
      try{
        this.plugin.setting("setTime",item.key,item.num);
      }catch(e){}
    },
    tip:function(){
      this.$refs.tip.show();
      try{
        console.log("settime "+this.hour.num+":"+this.minute.num);
        this.plugin.setTime(this.hour.num,this.minute.num);
      }catch(e){}
    },
    updateNum:function(type,num){
      this[type].num=num;
      this.$refs[type].blueCircle(num);
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
    margin-top: 50px;
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
.button{
  margin-top: 10px;
}
</style>


