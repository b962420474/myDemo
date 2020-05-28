<template>
  <div class="shade" id="delete">
    <div class="tip">
      <div class="title">{{title}}</div>
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
  props: ['title'],
  data() {
    return {
      index:0
    };
  },
  methods:{
      close:function(){
        document.getElementById("delete").style.display="none";
      },
      ok:function(){
        this.close();
        this.$emit('del',this.index);
      },
      show:function(index){
        this.index=index;
        document.getElementById("delete").style.display="block";
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
  display: none;
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


