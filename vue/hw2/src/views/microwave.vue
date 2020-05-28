<template>
  <div class="main_content">
    <div class="header">
      <img src="../assets/img/HPMLayerDefNoLightButton_BackgroundImage.png">
      <Timmer></Timmer>
      <img @click="startlock()" src="../assets/img/HPMLayerDefLockButton_BackgroundImage.png" />
    </div>
    <div class="timer">
      <MyCircle
        v-for="(item,index) in list"
        :key="index"
        :title="item.name"
        :base="item.base"
        :isshow="item.isshow"
        :num="item.num"
        :ref="item.name"
        :start="item.start"
        :unit="item.unit"
        :wea_show="item.wea_show"
        :my_type="item.type"
        :current_wea="item.current_wea"
        @click.native="pressKey(index)"
      ></MyCircle>
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
import MyCircle from "../components/MyCircle.vue";
import Tip from "../components/Tip.vue";
import Timmer from "../components/Timmer.vue";
import Pause from "../components/Pause.vue";
var $time;
export default {
  components: { MyCircle, Tip,Timmer,Pause },
  data() {
    return {
      list: [
        {
          name: "Power",
          isshow: true,
          base: 220,
          num: 600,
          start: 30,
          unit: "w",
          wea_show: false,
          current_wea: 30
        },
        {
          name: "Timer",
          isshow: false,
          base: 60,
          num: 1,
          start: 1,
          wea_show: false,
          current_wea: 30,
          type: "timmer"
        }
      ],
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
  mounted: function() {
  },
  computed: {},
  methods: {
    pressKey: function(index) {
      this.list.forEach((element, i) => {
        if (i === index) {
          element.isshow = true;
        } else {
          element.isshow = false;
        }
      });
    },
    tip: function() {
      this.$refs.tip.show();
    },
    clearTime:function(){
      clearInterval(this.timer);
    },
    start: function() {
      this.clearTime();
      var self = this;
      if (this.button.type == "start") {
        console.log("start .......");
        this.button.type="pause";
        this.hideCircle();
        this.button.img_url=this.button.pause;
        if (this.list[1].num > 0) {
          this.timer = setInterval(function() {
            self.list[1].num--;
            console.log(self.list[1].num);
            if (self.list[1].num == 0) {
              self.tip();
              self.clearTime();
            }
          }, 60000);
        } 
      } else {
        console.log("pause .......");
        this.$refs.pause.show();
        this.clearTime();
      }
    },
    hideCircle:function(){
      this.list.forEach(function(element){
        element.isshow=false;
      })
    },
    startlock(){
        this.$emit("lock");
    },
       next() {
        this.startTime();
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


