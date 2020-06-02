<template>
  <div class="ClassyCountdown">
    <div v-show="isshow">
      <canvas ref="canvas" width="150" height="150"></canvas>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ['base','num','isshow','start'],
  data() {
    return {};
  },
  mounted: function() {
    this.canvas = this.$refs.canvas;
    this.context = this.canvas.getContext("2d");
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.rad= Math.PI * 2 / this.base;
    this.whiteCircle();
    this.blueCircle(this.num);
  },
  computed: {},
  methods: {
    whiteCircle: function() {
      this.context.save();
      this.context.beginPath();
      this.context.strokeStyle = "#9e9e9e";
      this.context.lineWidth = 14;
      this.context.arc(this.centerX, this.centerY, 65, 0, Math.PI * 2, false);
      this.context.stroke();
      this.context.closePath();
      this.context.restore();
    },
    blueCircle: function(n) {
      this.context.save();
      this.context.beginPath();
      this.context.strokeStyle = "#49f";
      this.context.lineWidth = 14;
      this.context.lineCap = "round";
      this.context.arc(this.centerX,this.centerY,65,-Math.PI / 2, -Math.PI / 2 + (n-this.start) * this.rad,false);
      this.context.stroke();
      this.context.restore();
    }
  }
};
</script>
<style scoped>
.ClassyCountdown {
  display: inline-block;
  position: relative;
  /* margin: 10px; */
  width: 150px;
  height: 150px;
}
</style>


