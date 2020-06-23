<template>
  <div class="shade" id="lock">
    <div class="lock">
      <div v-show="on" class='ts'>{{num}}</div>
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
      timer: null,
      on:false,
      num:3
    };
  },
  methods: {
    close: function() {
      document.getElementById("lock").style.display = "none";
    },
    show: function() {
      this.on=false;
      document.getElementById("lock").style.display = "block";
    },
    mousedown: function() {
      this.t1 = new Date().getTime();
      this.lock.img_url = this.lock.urls.down;
      this.on=false;
    },
    mouseup: function() {
      this.lock.img_url = this.lock.urls.up;
      clearInterval(this.timer);
      let t2 = new Date().getTime();
      if (t2 - this.t1 > 3000) {
        this.num=3;
        this.on=true;
        this.timer = setInterval(()=>{
          this.num--;
          console.log('倒计时：'+this.num);
          if(this.num===0){
            clearInterval(this.timer);
            this.close();
          }
        }, 1000);
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
    -webkit-transform: translateY(-50%);
    top: 50%;
    position: relative;
    width: 150px;
    margin: auto;
}
.lock img {
  -webkit-align-self: center;
}
.ts{
  font-size: 50px;
}
</style>


