<template>
  <div>
    <Back path="/presetsItem" :postTitle="title"></Back>
     <router-link to="/" class="home">
      <img src="../assets/img/HPSLayerDefHomepageButton_BackgroundImage.png">
    </router-link>
    <VueHeating type="presets"></VueHeating>
  </div>
</template>
<script>
import Back from "../components/Back.vue";
import VueHeating from "../components/VueHeating.vue";
export default {
  components: { Back, VueHeating },
  data() {
    return {
      title:this.$i18n.t("presets")
    };
  },
  mounted: function() {
   
  },
  methods: {
    
  }
};
</script>
<style scoped>
</style>


