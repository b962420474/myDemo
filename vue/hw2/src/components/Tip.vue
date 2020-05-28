<template>
  <div class="shade" v-show="isshow">
    <div class="tip">
      <div class="title">{{title}}</div>
      <div class="operation">
        <div @click="ok()">
          <img src="../assets/img/HWMLayerCmpltngConfirmButton_BackgroundImage.png">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["title"],
  data() {
    return {
        isshow:false
    };
  },
  methods: {
    ok: function() {
      this.close();
      this.$emit("handleOk");
    },
    close:function(){
        this.isshow=false;
      },
    show:function(){
        this.isshow=true;
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
.tip {
  width: 400px;
  margin: auto;
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%);
}
.title{
    font-size: 20px;
    margin: 10px;
}
</style>


