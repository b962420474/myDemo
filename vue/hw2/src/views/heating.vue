<template>
  <div class="main_content">
    <div class="header">
      <img @click="controlLight()" src="../assets/img/HPMLayerDefNoLightButton_BackgroundImage.png">
      <Timmer></Timmer>
      <img @click="startlock()" src="../assets/img/HPMLayerDefLockButton_BackgroundImage.png">
    </div>
    <div class="timer">
      <Ring
      v-focus
        class="center"
        :base="temperature.base"
        :isshow="temperature.isshow"
        :num="temperature.num"
        ref="temperature"
        :start="temperature.start"
        @click.native="pressKey(temperature)"
        @keydown.native="keyEvent($event,temperature)"
        tabindex="1"
      >
        <div class="ClassyCountdown-value">
          <div>{{temperature.name}}</div>
          <div class="num">{{temperature.num}}<span style="font-size:10px;position: absolute;color:#ffffff6e;">{{temperature.unit}}</span></div>
        </div>
      </Ring>
      <Ring
        class="center"
        :base="timer.base"
        :isshow="timer.isshow"
        :num="timer.num"
        ref="timer"
        :start="timer.start"
        @click.native="pressKey(timer)"
        @keydown.native="keyEvent($event,timer)"
        tabindex="1"
      >
        <div class="ClassyCountdown-value">
          <div>{{timer.name}}</div>
          <div class="num">{{getNum}}</div>
        </div>
      </Ring>
    </div>
    <div class="button">
      <img :src="button.img_url" @click="start()">
      <img @click="back()" src="../assets/img/PDPMLayerDefCancelButton_BackgroundImage.png">
    </div>
    <Tip :title="title" ref="tip"></Tip>
    <Pause @next="next()" ref="pause"></Pause>
  </div>
</template>
<script>
import Ring from "../components/Ring.vue";
import Tip from "../components/Tip.vue";
import Timmer from "../components/Timmer.vue";
import Pause from "../components/Pause.vue";
import {start,init,pause,clear} from "../util/time";
import {update} from '@/util/knobUtil'
export default {
  components: { Ring, Tip, Timmer, Pause },
  data() {
    return {
      title: this.$i18n.t("timer_complete"),
      temperature: {},
      timer: {},
      button: {
        img_url: require("../assets/img/HPMLayerDefStartButton_BackgroundImage.png"),
        pause: require("../assets/img/MWMLayerStopButton_BackgroundImage.png"),
        start: require("../assets/img/HPMLayerDefStartButton_BackgroundImage.png"),
        type: "start"
      },
      plugin:null
    };
  },
  inject: ["reload",'getDatas'],
  beforeMount: function() {
    this.plugin=this.getDatas().plugin;
    var type = this.$route.params.id;
    switch(type){
      case 'Standard':
      this.temperature={name: this.$i18n.t('temperature'),isshow: true,base: 220,num: 180,start: 30,unit: "℃",key:"temperature"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 240,num: 0,start: 0,key:"timer"};
      break;
      case 'Convection':
      this.temperature={name: this.$i18n.t('temperature'),isshow: true,base: 200,num: 160,start: 50,unit: "℃",key:"temperature"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 240,num: 0,start: 0,key:"timer"};
      break;
      case 'ECO':
      this.temperature={name: this.$i18n.t('temperature'),isshow: true,base: 100,num: 140,start: 140,unit: "℃",key:"temperature"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 240,num: 0,start: 0,key:"timer"};
      break;
      case 'Fanned':
      this.temperature={name: this.$i18n.t('temperature'),isshow: true,base: 200,num: 160,start: 50,unit: "℃",key:"temperature"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 240,num: 0,start: 0,key:"timer"};
      break;
      case 'Grills':
      this.temperature={name: this.$i18n.t('temperature'),isshow: true,base: 100,num: 180,start: 150,unit: "℃",key:"temperature"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 240,num: 0,start: 0,key:"timer"};
      break;
      case 'Grill_Fans':
      this.temperature={name: this.$i18n.t('temperature'),isshow: true,base: 200,num: 180,start: 50,unit: "℃",key:"temperature"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 240,num: 0,start: 0,key:"timer"};
      break;
      case 'Double_grills':
      this.temperature={name: this.$i18n.t('temperature'),isshow: true,base: 100,num: 180,start: 150,unit: "℃",key:"temperature"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 240,num: 0,start: 0,key:"timer"};
      break;
      case 'Bottom':
      this.temperature={name: this.$i18n.t('temperature'),isshow: true,base: 190,num: 170,start: 30,unit: "℃",key:"temperature"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 240,num: 0,start: 0,key:"timer"};
      break;
      case 'Slow_cooks':
      this.temperature={name: this.$i18n.t('temperature'),isshow: true,base: 40,num: 100,start: 80,unit: "℃",key:"temperature"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 600,num: 0,start: 0,key:"timer"};
      break;
      case 'Preserve':
      this.temperature={name: this.$i18n.t('temperature'),isshow: true,base: 40,num: 75,start: 60,unit: "℃",key:"temperature"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 240,num: 0,start: 0,key:"timer"};
      break;
      case 'Warm_plate':
      this.temperature={name: this.$i18n.t('temperature'),isshow: true,base: 40,num: 50,start: 30,unit: "℃",key:"temperature"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 240,num: 0,start: 0,key:"timer"};
      break;
      case 'Dry':
      this.temperature={name: this.$i18n.t('temperature'),isshow: true,base: 100,num: 110,start: 50,unit: "℃",key:"temperature"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 600,num: 0,start: 0,key:"timer"};
      break;
      case 'Pizzas':
      this.temperature={name: this.$i18n.t('temperature'),isshow: true,base: 200,num: 180,start: 50,unit: "℃",key:"temperature"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 240,num: 0,start: 0,key:"timer"};
      break;
    }
    init(this.timer.num,this.tip,this.update,540);
  },
  beforeDestroy: function() {
    clear();
  },
  computed: {
    getNum:function(){
      return (this.timer.num/60<10?"0"+Math.floor(this.timer.num/60):this.timer.num/60)+":"+(this.timer.num%60<10?"0"+this.timer.num%60:this.timer.num%60);
    }
  },
  methods: {
    back: function() {
      clear();
      if (this.button.type == "pause") {
        this.reload();
      } else {
      }
    },
    pressKey: function(item) {
     this.hideCircle();
     clear();
     this.button.type = "start";
      this.button.img_url = this.button.start;
      item.isshow = true;
      this.timer.name=this.$i18n.t('timer')
    },
    keyEvent:function(e,item){
      console.log("keyCode:"+e.keyCode);
      item.num=update(e.keyCode,item.key+"/"+this.$route.params.id,item.num);
      this.$refs[item.key].blueCircle(item.num);
    },
    updateNum:function(type,num){
      this[type].num=num;
      this.$refs[type].blueCircle(num);
    },
    tip: function() {
      this.button.type = "start";
      this.button.img_url = this.button.start;
      this.fns.roar(this.plugin);
      this.$refs.tip.show();
    },
    controlLight:function(){
      this.fns.controlLight(this.plugin,'');
    },
    start: function() {
      var self = this;
      if (this.button.type == "start") {
        console.log("start .......");
        this.button.type = "pause";
        this.button.img_url = this.button.pause;
        this.timer.name=this.$i18n.t('cooking_time');
        this.hideCircle();
        this.fns.heating(this.plugin);
        start();
      } else {
        console.log("pause .......");
        this.$refs.pause.show();
        pause();
        this.fns.pause(this.plugin);
      }
    },
    next() {
      start()
    },
    update(num){
      this.timer.num=num;
    },
    startlock() {
      this.$emit("lock");
    },
     hideCircle: function() {
      this.timer.isshow = false;
      this.temperature.isshow = false;
    },
  }
};
</script>
<style scoped>
.header {
  display: -webkit-flex;
}
.main_content {
  /* display: -webkit-flex; */
  height: 100%;
  width: 100%;
}
.timer {
  display: -webkit-flex;
  width: 100%;
}

.button {
  /* margin-top: 10px; */
  display: -webkit-flex;
}
.button img {
  margin: 0 85px;
}
</style>


