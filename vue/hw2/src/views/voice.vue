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
          <div>{{item.name}}</div>
          <div class="num">{{item.num}}</div>
        </div>
      </Ring>
    </div>
    <div class="button" @click="tip()">
      <img src="../assets/img/HWMLayerCmpltngConfirmButton_BackgroundImage.png">
    </div>
    <Tip :title="tipTitle" ref="tip"></Tip>
  </div>
</template>
<script>
import Ring from "../components/Ring.vue";
import Tip from "../components/Tip.vue";
export default {
  components: { Ring, Tip },
  data() {
    return {
    };
  },
  beforeMount: function() {
     var type=this.$route.params.id;
     if(type==="volume"){
       this.item={ name: this.$i18n.t('volume'), isshow: false, base: 9, num: 1, start: 0 };
       this.tipTitle= this.$i18n.t('volume_set')
     }
     else{
       this.item={ name: this.$i18n.t('brightness'), isshow: false, base: 9, num: 1, start: 0 };
       this.tipTitle= this.$i18n.t('brightness_set')
     }
  },
  computed: {},
  methods: {
    pressKey: function() {
      this.item.isshow = true;
      this.$refs.ring.blueCircle(this.item.num++);
    },
    tip: function() {
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
.timer {
  display: -webkit-flex;
  width: 100%;
  margin-top: 50px;
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
  margin-top: 10px;
}
</style>


