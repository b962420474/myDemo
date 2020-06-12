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
  props: ["base", "num", "isshow", "start"],
  data() {
    return {};
  },
  mounted: function() {
    this.canvas = this.$refs.canvas;
    this.context = this.canvas.getContext("2d");
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.rad = (Math.PI * 2) / this.base;
    this.setCanvas();
    // this.whiteCircle();
    this.blueCircle(this.num);
  },
  computed: {},
  methods: {
    whiteCircle: function() {
      //this.context.save();
      this.context.beginPath();
      this.context.strokeStyle = "#9e9e9e";
      // this.context.fillStyle = "#9e9e9e"; //C
      this.context.lineWidth = 14;
      this.context.arc(
        this.centerX,
        this.centerY,
        this.canvas.width / 2 - 14,
        0,
        Math.PI * 2,
        false
      );
      this.context.stroke();
      // this.context.closePath();
      // this.context.restore();
    },
    blueCircle: function(n) {
      this.clearCanvas();
      this.context.beginPath();
      this.context.strokeStyle = "#9e9e9e";
      this.context.lineWidth = 14;
      this.context.arc(
        this.centerX,
        this.centerY,
        this.canvas.width / 2 - 14,
        0,
        Math.PI * 2,
        false
      );
      this.context.stroke();
      this.context.beginPath();
      this.context.strokeStyle = "#49f";
      this.context.lineCap = "round";
      this.context.arc(
        this.centerX,
        this.centerY,
        this.canvas.width / 2 - 14,
        -Math.PI / 2,
        -Math.PI / 2 + (n - this.start) * this.rad,
        false
      );
      this.context.stroke();
    },
    setCanvas: function() {
      var width = this.canvas.width,
        height = this.canvas.height;
      var getPixelRatio = function(context) {
        var backingStore =
          context.backingStorePixelRatio ||
          context.webkitBackingStorePixelRatio ||
          context.mozBackingStorePixelRatio ||
          context.msBackingStorePixelRatio ||
          context.oBackingStorePixelRatio ||
          context.backingStorePixelRatio ||
          1;
        return (window.devicePixelRatio || 1) / backingStore;
      };
      var ratio = getPixelRatio(this.context);
      this.canvas.style.width = width + "px";
      this.canvas.style.height = height + "px";
      this.canvas.height = height * ratio;
      this.canvas.width = width * ratio;
      this.context.scale(ratio, ratio);
    },
    clearCanvas() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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


