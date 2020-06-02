<template>
  <div class="main_content">
    <div class="header">
      <img src="../assets/img/HPMLayerDefNoLightButton_BackgroundImage.png">
      <Timmer></Timmer>
      <img @click="startlock()" src="../assets/img/HPMLayerDefLockButton_BackgroundImage.png">
    </div>
    <div class="timer">
      <MyCircle
        v-show="button.type=='start'"
        :title="list.name"
        :base="list.base"
        :isshow="list.isshow"
        :num="list.num"
        :ref="list.name"
        :start="list.start"
        :unit="list.unit"
        :wea_show="list.wea_show"
        :my_type="list.type"
        :current_wea="list.current_wea"
        @click.native="pressKey()"
      ></MyCircle>
      <MyCircle
        v-show="button.type=='pause'"
        :title="timmer1.name"
        :base="timmer1.base"
        :isshow="timmer1.isshow"
        :num="timmer1.num"
        :ref="timmer1.name"
        :start="timmer1.start"
        :unit="timmer1.unit"
        :wea_show="timmer1.wea_show"
        :my_type="timmer1.type"
        :current_wea="timmer1.current_wea"
        :extra="timmer1.extra"
      ></MyCircle>
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
import MyCircle from "../components/MyCircle.vue";
import Tip from "../components/Tip.vue";
import Timmer from "../components/Timmer.vue";
import Pause from "../components/Pause.vue";
var $time;
export default {
  components: { MyCircle, Tip, Timmer, Pause },
  data() {
    return {
      title:this.$i18n.t("defrost_complete"),
      list: {
        name: "Weight",
        isshow: true,
        base: 1400,
        num: 1500,
        start: 100,
        unit: "g",
        wea_show: false,
        defaultNum: 1500,
        current_wea: 30
      },
      timmer1: {
        name: "Timer",
        isshow: false,
        base: 60,
        num: 20,
        start: 0,
        wea_show: false,
        current_wea: 30,
        type: "timmer",
        extra:{
            getTitle:function(){
                return "Timer"
            }
        }
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
  inject:['reload'],
  beforeMount: function() {},
  mounted: function() {
    
  },
  computed: {},
  methods: {
    back: function() {
      if (this.button.type == "pause") {
        this.reload();
      } else {
      }
    },
    pressKey: function() {
      this.list.isshow = this.list.isshow ? false : true;
    },
    tip: function() {
      this.$refs.tip.show();
    },
    clearTime: function() {
      clearInterval(this.timer);
    },
    start: function() {
      this.clearTime();
      if (this.button.type == "start") {
        console.log("start .......");
        this.button.type = "pause";
        this.button.img_url = this.button.pause;
        if (this.timmer1.num > 0) {
          this.startTime();
        }
      } else {
        console.log("pause .......");
        this.$refs.pause.show();
        this.clearTime();
      }
    },
    startTime: function() {
        var self = this;
      this.timer = setInterval(function() {
        self.timmer1.num--;
        console.log(self.timmer1.num);
        if (self.timmer1.num == 0) {
          self.tip();
          self.clearTime();
        }
      }, 60000);
    },
    startlock() {
      this.$emit("lock");
    },
    next() {
        this.startTime();
    },
    handleOk:function(){

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


