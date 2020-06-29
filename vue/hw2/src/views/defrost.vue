<template>
  <div class="main_content">
    <div class="header">
      <img src="../assets/img/HPMLayerDefNoLightButton_BackgroundImage.png">
      <Timmer></Timmer>
      <img @click="startlock()" src="../assets/img/HPMLayerDefLockButton_BackgroundImage.png">
    </div>
    <div class="timer">
      <Ring
        v-focus
        v-show="button.type=='start'"
        class="center"
        :base="weight.base"
        :isshow="weight.isshow"
        :num="weight.num"
        ref="weight"
        :start="weight.start"
        @click.native="pressKey(weight)"
        @keydown.native="keyEvent($event,weight)"
        tabindex="1"
      >
        <div class="ClassyCountdown-value" v-if="weight.unit">
          <div>{{weight.name}}</div>
          <div class="num">
            {{weight.num}}
            <span style="font-size:10px;position: absolute;color:#ffffff6e;">{{weight.unit}}</span>
          </div>
        </div>
        <div class="ClassyCountdown-value" v-else>
          <div>{{weight.name}}</div>
          <div class="num">
            {{getNum}}
          </div>
        </div>
      </Ring>
      <div
       v-show="button.type=='pause'"
        class="center timmer">
        <div class="ClassyCountdown-value">
          <div>{{timer.name}}</div>
          <div class="num">{{getTNum}}</div>
        </div>
      </div>
    </div>
    <div class="button">
      <img :src="button.img_url" @click="start()">
      <img @click="back()" src="../assets/img/PDPMLayerDefCancelButton_BackgroundImage.png">
    </div>
    <Tip :title="title" ref="tip" @handleOk="handleOk()"></Tip>
    <Pause @next="next()" ref="pause"></Pause>
  </div>
</template>
<script>
import Ring from "../components/Ring.vue";
import Tip from "../components/Tip.vue";
import Timmer from "../components/Timmer.vue";
import Pause from "../components/Pause.vue";
import { start, init, pause } from "../util/time";
import {update} from '@/util/knobUtil'
export default {
  components: { Ring, Tip, Timmer, Pause },
  data() {
    return {
      title: this.$i18n.t("defrost_complete"),
      weight: {},
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
      case 'meat':
      this.weight={name: this.$i18n.t('weight'),isshow: true,base: 1400,num: 200,start: 100,unit: "g",key:"weight"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 60,num: 20,start: 0,key:"timer"};
      break;
      case 'bird':
      this.weight={name: this.$i18n.t('weight'),isshow: true,base: 1400,num: 200,start: 100,unit: "g",key:"weight"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 60,num: 10,start: 0,key:"timer"};
      break;
      case 'fish':
      this.weight={name: this.$i18n.t('weight'),isshow: true,base: 1400,num: 200,start: 100,unit: "g",key:"weight"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 60,num: 20,start: 0,key:"timer"};
      break;
      case 'vegetables':
      this.weight={name: this.$i18n.t('weight'),isshow: true,base: 300,num: 150,start: 150,unit: "g",key:"weight"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 60,num: 20,start: 0,key:"timer"};
      break;
      case 'manual':
      this.weight={name: this.$i18n.t('timer'),isshow: true,base: 600,num: 110,start: 0,key:"defrosting_time"};
      this.timer={name: this.$i18n.t('defrosting_time'),isshow: false,base: 60,num: 110,start: 0,key:"timer"};
      break;
    }
    this.weight={name: this.$i18n.t('timer'),isshow: true,base: 600,num: 110,start: 0,key:"defrosting_time"};
    this.timer={name: this.$i18n.t('defrosting_time'),isshow: false,base: 60,num: 110,start: 0,key:"timer"};
    init(this.timer.num,this.tip,this.update,540);
  },
  destroyed: function() {
    pause();
  },
  computed: {
    getTNum:function(){
      return (this.timer.num/60<10?"0"+Math.floor(this.timer.num/60):this.timer.num/60)+":"+(this.timer.num%60<10?"0"+this.timer.num%60:this.timer.num%60);
    },
    getNum:function(){
      return (this.weight.num/60<10?"0"+Math.floor(this.weight.num/60):this.weight.num/60)+":"+(this.weight.num%60<10?"0"+this.weight.num%60:this.weight.num%60);
    }
  },
  methods: {
    back: function() {
      pause();
      if (this.button.type == "pause") {
        this.reload();
      } else {
      }
    },
    pressKey: function() {
      try{
        if(this.$route.params.id=="vegetables"){
          this.plugin.setting("setdefrost","vegetables_"+this.weight.key,this.weight.num);
        }
        else{
          this.plugin.setting("setdefrost",this.weight.key,this.weight.num);
        }
      }catch(e){}
    },
    updateNum:function(type,num){
      this.weight.num=num;
      this.$refs.weight.blueCircle(num);
    },
    keyEvent:function(e,item){
      console.log("keyCode:"+e.keyCode);
      var type=item.key;
      // if(this.$route.params.id=="vegetables"){
      //     type="vegetables_"+type
      // }
      item.num=update(e.keyCode,type,item.num);
      this.timer.num=item.num;
      this.$refs.weight.blueCircle(item.num);
    },
    tip: function() {
      this.button.type = "start";
      this.button.img_url = this.button.start;
      this.$refs.tip.show();
    },
    start: function() {
      if (this.button.type == "start") {
        console.log("start .......");
        this.button.type = "pause";
        this.button.img_url = this.button.pause;
        start();
      } else {
        console.log("pause .......");
        this.$refs.pause.show();
        pause();
      }
    },
    startlock() {
      this.$emit("lock");
    },
    next() {
      start();
    },
    update(num) {
      this.timer.num = num;
    },
    handleOk: function() {}
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
.timmer {
  display: inline-block;
    position: relative;
    width: 150px;
    height: 150px;
}
.item {
  /* margin: 20px auto; */
  display: -webkit-flex;
  -webkit-justify-content: center;
}
.button {
  /* margin-top: 10px; */
  display: -webkit-flex;
}
.button img {
  margin: 0 85px;
}
</style>


