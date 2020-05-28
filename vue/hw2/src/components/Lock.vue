<template>
  <div class="shade" id="lock">
    <div class="lock">
      <img :src="lock.img_url" @mousedown="mousedown()" @mouseup="mouseup()">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lock: {
        img_url: require("../assets/img/LMLayerDefUnlockButton_BackgroundImage.png"),
        urls: {
          up: require("../assets/img/LMLayerDefUnlockButton_BackgroundImage.png"),
          down: require("../assets/img/LMLayerDefUnlockButton_PressImage.png")
        }
      },
      t1: 0,
      timer: null
    };
  },
  methods: {
    close: function() {
      document.getElementById("lock").style.display = "none";
    },
    show: function() {
      document.getElementById("lock").style.display = "block";
    },
    mousedown: function() {
      this.t1 = new Date().getTime();
      this.lock.img_url = this.lock.urls.down;
    },
    mouseup: function() {
      this.lock.img_url = this.lock.urls.up;
      clearTimeout(this.timer);
      let t2 = new Date().getTime();
      if (t2 - this.t1 > 3000) {
        this.timer = setTimeout(this.close, 3000);
      }
    }
  }
};
</script>
<style scoped>
.shade {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  position: absolute;
  z-index: 200;
  top: 0;
  left: 0;
  display: none;
}
.lock {
  display: -webkit-flex;
  -webkit-justify-content: center;
  height: 100%;
}
.lock img {
  -webkit-align-self: center;
}
</style>


