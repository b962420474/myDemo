<template>
  <div class="language">
    <roll :list="list"></roll>
    <div class="button" @click="tip()"> <img src="../assets/img/HWMLayerCmpltngConfirmButton_BackgroundImage.png"></div>
    <Tip :title="title" ref="tip"></Tip>
  </div>
</template>
<script>
import Roll from "../components/Roll.vue";
import Tip from "../components/Tip.vue";
export default {
  components: { Roll ,Tip},
  data() {
    return {
      title:this.$i18n.t('language_set'),
      list: [
        { name: "English", isactive: false },
        { name: "Français", isactive: false },
        { name: "Polskie", isactive: false },
        { name: "Deutsche", isactive: false },
        { name: "Pусский", isactive: true },
        { name: "Română", isactive: false },
        { name: "Español", isactive: false },
        { name: "Português", isactive: false },
        { name: "Türk", isactive: false }
      ]
    };
  },
  methods:{
    tip:function(){
      this.$refs.tip.show();
    }
  }
};
</script>
<style scoped>
.language{
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%);
}
.button{
  margin-top: 10px;
}
</style>

