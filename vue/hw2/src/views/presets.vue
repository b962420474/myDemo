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
        class="center"
        :base="item.base"
        :isshow="item.isshow"
        :num="item.num"
        :ref="item.key"
        :start="item.start"
        @click.native="pressKey(item)"
        @keydown.native="keyEvent($event,item)"
        tabindex="1"
      >
        <div class="ClassyCountdown-value" v-if="item.unit">
          <div>{{item.name}}</div>
          <div class="num">
            {{item.num}}
            <span style="font-size:10px;position: absolute;color:#ffffff6e;">{{item.unit}}</span>
          </div>
        </div>
        <div class="ClassyCountdown-value" v-else>
          <div>{{item.name}}</div>
          <div class="num">
            {{getNum}}
          </div>
        </div>
      </Ring>
      <Ring
        v-if="type=='heating'"
        class="center"
        :base="timer.base"
        :isshow="timer.isshow"
        :num="timer.num"
        :ref="timer.key"
        :start="timer.start"
        @click.native="pressKey(timer)"
        @keydown.native="keyEvent($event,timer)"
        tabindex="1"
      >
        <div class="ClassyCountdown-value">
          <div>{{timer.name}}</div>
          <div class="num">{{timer.num}}</div>
        </div>
      </Ring>
    </div>
    <div class="button">
      <img src="../assets/img/PDPMLayerDefSaveButton_BackgroundImage.png" @click="start()">
      <img src="../assets/img/PDPMLayerDefCancelButton_BackgroundImage.png" @click="back()">
    </div>
    <Tip :title="timer_complete" ref="tip"></Tip>
  </div>
</template>
<script>
import Ring from "../components/Ring.vue";
import Tip from "../components/Tip.vue";
import Timmer from "../components/Timmer.vue";
import {update} from '@/util/knobUtil'
var $time;
export default {
  components: { Ring, Tip, Timmer },
  inject: ["reload",'getDatas'],
  data() {
    return {
      item:{},
      timer:{},
      type:'',
      timer_complete:this.$i18n.t("timer_complete"),
      button: {
        img_url: require("../assets/img/PDPMLayerDefSaveButton_BackgroundImage.png"),
        pause: require("../assets/img/PDPMLayerDefSaveButton_BackgroundImage.png"),
        start: require("../assets/img/PDPMLayerDefSaveButton_BackgroundImage.png"),
        type: "start"
      },
      plugin:null
    };
  },
  beforeMount: function() {
    this.plugin=this.getDatas().plugin;
    var types = this.$route.params.id.split("-");
    this.type=types[0];
    var type=types[1];
    switch(type){
      case 'Standard':
      this.item={name: this.$i18n.t('temperature'),isshow: true,base: 220,num: 180,start: 30,unit: "℃",key:"temperature"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 240,num: 0,start: 0,key:"timer"};
      break;
      case 'Convection':
      this.item={name: this.$i18n.t('temperature'),isshow: true,base: 200,num: 160,start: 50,unit: "℃",key:"temperature"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 240,num: 0,start: 0,key:"timer"};
      break;
      case 'ECO':
      this.item={name: this.$i18n.t('temperature'),isshow: true,base: 100,num: 140,start: 140,unit: "℃",key:"temperature"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 240,num: 0,start: 0,key:"timer"};
      break;
      case 'Fanned':
      this.item={name: this.$i18n.t('temperature'),isshow: true,base: 200,num: 160,start: 50,unit: "℃",key:"temperature"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 240,num: 0,start: 0,key:"timer"};
      break;
      case 'Grills':
      this.item={name: this.$i18n.t('temperature'),isshow: true,base: 100,num: 180,start: 150,unit: "℃",key:"temperature"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 240,num: 0,start: 0,key:"timer"};
      break;
      case 'Grill_Fans':
      this.item={name: this.$i18n.t('temperature'),isshow: true,base: 200,num: 180,start: 50,unit: "℃",key:"temperature"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 240,num: 0,start: 0,key:"timer"};
      break;
      case 'Double_grills':
      this.item={name: this.$i18n.t('temperature'),isshow: true,base: 100,num: 180,start: 150,unit: "℃",key:"temperature"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 240,num: 0,start: 0,key:"timer"};
      break;
      case 'Bottom':
      this.item={name: this.$i18n.t('temperature'),isshow: true,base: 190,num: 170,start: 30,unit: "℃",key:"temperature"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 240,num: 0,start: 0,key:"timer"};
      break;
      case 'Slow_cooks':
      this.item={name: this.$i18n.t('temperature'),isshow: true,base: 40,num: 100,start: 80,unit: "℃",key:"temperature"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 600,num: 0,start: 0,key:"timer"};
      break;
      case 'Preserve':
      this.item={name: this.$i18n.t('temperature'),isshow: true,base: 40,num: 75,start: 60,unit: "℃",key:"temperature"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 240,num: 0,start: 0,key:"timer"};
      break;
      case 'Warm_plate':
      this.item={name: this.$i18n.t('temperature'),isshow: true,base: 40,num: 50,start: 30,unit: "℃",key:"temperature"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 240,num: 0,start: 0,key:"timer"};
      break;
      case 'Dry':
      this.item={name: this.$i18n.t('temperature'),isshow: true,base: 100,num: 110,start: 50,unit: "℃",key:"temperature"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 600,num: 0,start: 0,key:"timer"};
      break;
      case 'Pizzas':
      this.item={name: this.$i18n.t('temperature'),isshow: true,base: 200,num: 180,start: 50,unit: "℃",key:"temperature"};
      this.timer={name: this.$i18n.t('timer'),isshow: false,base: 240,num: 0,start: 0,key:"timer"};
      break;

      
      // case 'meat':
      // this.item={name: this.$i18n.t('weight'),isshow: true,base: 220,num: 180,start: 30,unit: "w",key:"weight"};
      // this.timer={name: this.$i18n.t('timer'),isshow: false,base: 60,num: 20,start: 0,key:"timer"};
      // break;
      // case 'bird':
      // this.item={name: this.$i18n.t('weight'),isshow: true,base: 220,num: 100,start: 30,unit: "w",key:"weight"};
      // this.timer={name: this.$i18n.t('timer'),isshow: false,base: 60,num: 10,start: 0,key:"timer"};
      // break;
      // case 'fish':
      // this.item={name: this.$i18n.t('weight'),isshow: true,base: 220,num: 150,start: 30,unit: "w",key:"weight"};
      // this.timer={name: this.$i18n.t('timer'),isshow: false,base: 60,num: 20,start: 0,key:"timer"};
      // break;
      // case 'vegetables':
      // this.item={name: this.$i18n.t('weight'),isshow: true,base: 220,num: 120,start: 30,unit: "w",key:"weight"};
      // this.timer={name: this.$i18n.t('timer'),isshow: false,base: 60,num: 20,start: 0,key:"timer"};
      // break;
      // case 'manual':
      // this.item={name: this.$i18n.t('timer'),isshow: true,base: 220,num: 110,start: 30,key:"defrosting_time"};
      // break;
      default:
      this.item={name: this.$i18n.t('timer'),isshow: true,base: 600,num: 110,start: 0,key:"defrosting_time"};
    }
    try{
      this.plugin.setting("setpresets",this.item.key,this.item.num);
      }catch(e){}
  },
  mounted: function() {},
  computed: {
    getNum:function(){
      return (this.item.num/60<10?"0"+Math.floor(this.item.num/60):this.item.num/60)+":"+(this.item.num%60<10?"0"+this.item.num%60:this.item.num%60);
    }
  },
  methods: {
    pressKey: function(item) {
      this.hideCircle();
      item.isshow = true;
      // try{
      //   this.plugin.setting("setpresets",item.key,item.num);
      // }catch(e){}
    },
    tip: function() {
      this.$refs.tip.show();
    },
    hideCircle: function() {
      this.timer.isshow = false;
      this.item.isshow = false;
    },
    start: function() {
      console.log("add time:" + this.item.num + " wea:" + this.timer.num);
    },
    startlock() {
      this.$emit("lock");
    },
    back: function() {
      if (this.button.type == "pause") {
      } else {
      }
    },
    keyEvent:function(e,item){
      console.log("keyCode:"+e.keyCode);
      var types = this.$route.params.id.split("-");
      this.type=types[0];
      var type=item.key;
      if(this.type=="heating"){
        type=item.key+"/"+types[1]
      }
      item.num=update(e.keyCode,type,item.num);
      this.$refs[item.key].blueCircle(item.num);
    },
     updateNum:function(type,num){
      this[type].num=num;
      this.$refs[type].blueCircle(num);
    }
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
  font-size: 20px;
  width: 340px;
  text-align: center;
  line-height: 54px;
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
.button {
  /* margin-top: 10px; */
  display: -webkit-flex;
}
.button img {
  margin: 0 85px;
}
</style>


