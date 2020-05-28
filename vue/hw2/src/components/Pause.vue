<template>
  <div class="shade" v-show="isshow">
    <img src="../assets/img/MWMLayerRsmConfirmButton_BackgroundImage.png" @click="close()">
  </div>
</template>
<script>
export default {
  data() {
    return {
      isshow: false
    };
  },
  methods: {
    close: function() {
      this.isshow = false;
      this.$emit("next");
    },
    show: function() {
      this.isshow = true;
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
  z-index: 100;
  top: 0;
  left: 0;
  /* display: none; */
}
img {
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%);
}
</style>


