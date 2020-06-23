<template>
  <div class="main_content">
    <div class="timer">
      <Ring
        class="center"
        :base="item.base"
        :isshow="item.isshow"
        :num="item.num"
        ref="ring"
        :start="item.start"
        @click.native="pressKey()"
      >
        <div class="ClassyCountdown-value">
          <div>{{$t(item.name)}}</div>
          <div class="num">{{item.num}}</div>
        </div>
      </Ring>
    </div>
    <div class="button" @click="tip()">
      <img src="../assets/img/HWMLayerCmpltngConfirmButton_BackgroundImage.png">
    </div>
    <Tip :title="$t(tipTitle)" ref="tip"></Tip>
  </div>
</template>
<script>
import Ring from "../components/Ring.vue";
import Tip from "../components/Tip.vue";
export default {
  components: { Ring, Tip },
  inject:['getDatas'],
  data() {
    return {
      item: { name: "Brightness", isshow: false, base: 9, num: 1, start: 0 },
      tipTitle: "Brightness Set",
      plugin:null
    };
  },
  beforeMount: function() {
    var type = this.$route.params.id;
    this.plugin=this.getDatas().plugin;
    if (type === "volume") {
      this.item = {
        name: "volume",
        isshow: true,
        base: 3,
        num: 3,
        start: 0,
        key: "volume"
      };
      this.tipTitle = "volume_set";
      try {
        this.plugin.setting("setVolume", this.item.key, this.item.num);
      } catch (e) {}
    } else {
      this.item = {
        name: "brightness",
        isshow: false,
        base: 9,
        num: 8,
        start: 0,
        key: "brightness"
      };
      this.tipTitle = "brightness_set";
      try {
        this.plugin.setting("setBrightness", this.item.key, this.item.num);
      } catch (e) {}
    }
  },
  computed: {},
  methods: {
    pressKey: function() {
      this.item.isshow = true;
      var type = this.$route.params.id;
      var name="setVolume";
      if (type != "volume"){
        name='setBrightness';
      }
      try {
        this.plugin.setting(name, this.item.key, this.item.num);
      } catch (e) {}
    },
    tip: function() {
       try{
        if(this.$route.params.id=="volume"){
          console.log("setVolume "+this.item.num);
          this.plugin.setVolume(this.item.num);
        }
        else{
          console.log("setBrightness "+this.item.num);
          this.plugin.setBrightness(this.item.num);
        }
      }
      catch(e){}
      this.$refs.tip.show();
    },
    updateNum:function(type,num){
      this.item.num=num;
      this.$refs.ring.blueCircle(num);
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
.timer {
  display: -webkit-flex;
  width: 100%;
  margin-top: 50px;
}
.button {
  margin-top: 10px;
}
</style>


