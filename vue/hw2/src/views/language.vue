<template>
  <div class="language">
    <roll :list="list" @selectHandle="selectLanguage"></roll>
    <div class="button" @click="tip()"> <img src="../assets/img/HWMLayerCmpltngConfirmButton_BackgroundImage.png"></div>
    <Tip :title="$t('language_set')" ref="tip"></Tip>
  </div>
</template>
<script>
import Roll from "../components/Roll.vue";
import Tip from "../components/Tip.vue";
import {language} from "@/util/i18n"
export default {
  components: { Roll ,Tip},
  data() {
    return {
      title:this.$i18n.t('language_set'),
      list: [
        { name: "English", isactive: false ,code:'eng'},
        { name: "Français", isactive: false ,code:'fra'},
        { name: "Polskie", isactive: false ,code:'pol'},
        { name: "Deutsche", isactive: false ,code:'deu'},
        { name: "Pусский", isactive: false ,code:'rus'},
        { name: "Română", isactive: false ,code:'rum'},
        { name: "Español", isactive: false ,code:'spa'},
        { name: "Português", isactive: false ,code:'por'},
        { name: "Türk", isactive: false ,code:'tur'}
      ],
      currentLang:language
    };
  },
  created(){
    this.list.forEach(element => {
      if(element.code==this.currentLang){
        element.isactive=true;
      }
    });
  },
  methods:{
    tip:function(){
      localStorage.language=this.currentLang;
      this.$i18n.locale = this.currentLang;
      this.$refs.tip.show();
      try{
        console.log("setlanguage "+this.currentLang);
        this.plugin.setlanguage(this.currentLang);
      }catch(e){}
    },
    selectLanguage(index){
      this.currentLang=this.list[index].code;
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

