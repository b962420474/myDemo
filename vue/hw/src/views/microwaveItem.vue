<template>
  <div class="content">
    <Back path="/presetsItem" :postTitle="title"></Back>
    <router-link to="/" class="home">
      <img src="../assets/img/HPSLayerDefHomepageButton_BackgroundImage.png">
    </router-link>
    <div class="item">
      <img src="../assets/img/WSLayerDFuncMicroIcon_Image.png">
      <Loading :isshow="isshow"></Loading>
    </div>
  </div>
</template>
<script>
import Back from "../components/Back.vue";
import Loading from "../components/Loading.vue";
export default {
  components: { Back,Loading},
  data() {
    return {
      title: "Presets",
      isshow:true
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
</style>


