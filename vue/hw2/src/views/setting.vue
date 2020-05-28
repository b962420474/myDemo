<template>
  <div class="shade" id="reset">
    <div class="tip">
      <div class="title">{{$t('want_reset')}}</div>
      <div class="operation">
        <div @click="ok()">
          <img src="../assets/img/PSLayerFullConfirmButton_BackgroundImage.png">
        </div>
        <div @click="close()">
          <img src="../assets/img/PSLayerDltCancelButton_BackgroundImage.png">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods:{
      close:function(){
      },
      ok:function(){
        this.close();
      },
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
}
.tip{
  width: 400px;
    margin: auto;
    position: relative;
    top: 50%;
    -webkit-transform: translateY(-50%);
}
.operation{
  display: -webkit-flex;
  justify-content: center;
}
</style>


