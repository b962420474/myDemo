<template>
  <div class="main_content">
    <div class="header">
      <img src="../assets/img/HPMLayerDefNoLightButton_BackgroundImage.png">
      <Timmer></Timmer>
      <img @click="startlock()" src="../assets/img/HPMLayerDefLockButton_BackgroundImage.png">
    </div>
    <div class="timer">
      <Ring
        class="center"
        :base="power.base"
        :isshow="power.isshow"
        :num="power.num"
        ref="power"
        :start="power.start"
        @click.native="pressKey(power)"
      >
        <div class="ClassyCountdown-value">
          <div>{{power.name}}</div>
          <div class="num">
            {{power.num}}
            <span style="font-size:10px;position: absolute;color:#ffffff6e;">{{power.unit}}</span>
          </div>
        </div>
      </Ring>
      <Ring
        class="center"
        :base="Timer.base"
        :isshow="Timer.isshow"
        :num="Timer.num"
        ref="timmer"
        :start="Timer.start"
        @click.native="pressKey(Timer)"
      >
        <div class="ClassyCountdown-value">
          <div>{{Timer.name}}</div>
          <div class="num">{{getNum}}</div>
        </div>
      </Ring>
    </div>
    <div class="button">
      <img :src="button.img_url" @click="start()">
      <img src="../assets/img/PDPMLayerDefCancelButton_BackgroundImage.png">
    </div>
    <Tip title="Timer complete" ref="tip"></Tip>
    <Pause @next="next()" ref="pause"></Pause>
  </div>
</template>
<script>
import Ring from "../components/Ring.vue";
import Tip from "../components/Tip.vue";
import Timmer from "../components/Timmer.vue";
import Pause from "../components/Pause.vue";
var $time;
export default {
  components: { Ring, Tip, Timmer, Pause },
  data() {
    return {
      power: {
        name: "Power",
        isshow: true,
        base: 220,
        num: 600,
        start: 30,
        unit: "w"
      },
      Timer: {
        name: "Timer",
        isshow: false,
        base: 60,
        num: 1,
        start: 1,
        sec:60,
        type: "timmer"
      },
      button: {
        img_url: require("../assets/img/HPMLayerDefStartButton_BackgroundImage.png"),
        pause: require("../assets/img/MWMLayerStopButton_BackgroundImage.png"),
        start: require("../assets/img/HPMLayerDefStartButton_BackgroundImage.png"),
        type: "start"
      },
      timer: false
    };
  },
  beforeMount: function() {},
  mounted: function() {},
  computed: {
    getNum: function() {
      return (
        "0" +
        Math.floor(this.Timer.num / 60) +
        ":" +
        (this.Timer.num % 60 < 10
          ? "0" + (this.Timer.num % 60)
          : this.Timer.num % 60)
      );
    }
  },
  methods: {
    pressKey: function(power) {
      this.hideCircle();
      power.isshow = true;
    },
    tip: function() {
      this.$refs.tip.show();
    },
    clearTime: function() {
      clearInterval(this.timer);
    },
    start: function() {
      this.clearTime();
      var self = this;
      if (this.button.type == "start") {
        console.log("start .......");
        this.button.type = "pause";
        this.hideCircle();
        this.button.img_url = this.button.pause;
        this.startTime();
      } else {
        console.log("pause .......");
        this.$refs.pause.show();
        this.clearTime();
      }
    },
    startTime: function() {
      var self = this;
      if (this.Timer.num > 0) {
        this.timer = setInterval(function() {
          self.Timer.sec--;
          if(self.Timer.sec==0){
            self.Timer.num--;
            self.Timer.sec=60;
          }
          console.log(self.Timer.num);
          if (self.Timer.num == 0) {
            self.tip();
            self.clearTime();
          }
        }, 1000);
      }
    },
    hideCircle: function() {
      this.Timer.isshow = false;
      this.power.isshow = false;
    },
    setTimerNum:function(num){
      this.Timer.num=num;
      this.Timer.sec=60;
    },
    startlock() {
      this.$emit("lock");
    },
    next() {
      this.startTime();
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
.center {
  margin: auto;
}
.ClassyCountdown-value {
  width: 100%;
  line-height: 1em;
  position: absolute;
  top: 50%;
  text-align: center;
  left: 0;
  display: block;
  font-family: "Open Sans";
  font-weight: 300;
  margin-top: -34px;
  font-size: 18px;
}
.num {
  font-size: 30px;
  margin-top: 10px;
}
.button {
  /* margin-top: 10px; */
  display: -webkit-flex;
}
.button img {
  margin: 0 85px;
}
</style>


