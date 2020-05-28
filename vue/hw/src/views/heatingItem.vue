<template>
  <div class="content">
    <Back path="/healthyOption" postTitle="Presets"></Back>
    <router-link to="/" class="home">
      <img src="../assets/img/HPSLayerDefHomepageButton_BackgroundImage.png">
    </router-link>
    <div class="item">
      <img :src='data.img_url'>
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
      data: {},
      isshow:true,
    };
  },
  created:function(){
      this.data = this.$route.params.message;
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


