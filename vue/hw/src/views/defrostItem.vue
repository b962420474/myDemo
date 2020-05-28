<template>
  <div class="content">
    <Back :path="data.backurl" :postTitle="data.title"></Back>
    <router-link to="/" class="home">
      <img src="../assets/img/HPSLayerDefHomepageButton_BackgroundImage.png">
    </router-link>
    <div class="item">
      <img :src='data.imgurl'>
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
.home {
  display: -webkit-flex;
  -webkit-justify-content: center;
  z-index: 2;
  position: absolute;
  top: 10px;
  right: 20px;
}
.content {
  height: 100%;
}
.item {
  -webkit-transform: translateY(-50%);
  top: 30%;
  position: relative;
}
</style>


