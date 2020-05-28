<template>
  <div class="content">
    <Back path="/" :postTitle="title"></Back>
    <div class="item">
      <img src="../assets/img/WSLayerDFuncMicroIcon_Image.png">
      <div class="loading">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>
<script>
import Back from "../components/Back.vue";
export default {
  components: { Back },
  data() {
    return {
      title: "Microwave"
    };
  }
};
</script>
<style scoped>
.content {
  height: 100%;
}
.item {
  -webkit-transform: translateY(-50%);
  top: 30%;
  position: relative;
}

.loading {
  width: 150px;
  height: 6px;
  margin: 0 auto;
  text-align: center;
}
.loading span {
  display: inline-block;
  width: 6px;
  height: 100%;
  margin-right: 5px;
  background: white;
   border-radius: 6px;
  -webkit-animation: load 1.04s ease infinite;
}
.loading span:last-child {
  margin-right: 0px;
}
@-webkit-keyframes load {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.loading span:nth-child(1) {
  -webkit-animation-delay: 0.13s;
}
.loading span:nth-child(2) {
  -webkit-animation-delay: 0.26s;
}
.loading span:nth-child(3) {
  -webkit-animation-delay: 0.39s;
}
/* .loading span:nth-child(4){
            -webkit-animation-delay:0.52s;
        }
        .loading span:nth-child(5){
            -webkit-animation-delay:0.65s;
        } */
</style>


