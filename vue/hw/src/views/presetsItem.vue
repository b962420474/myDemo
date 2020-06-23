<template>
  <div class="content">
    <Back :path="data.backurl" :postTitle="data.title"></Back>
    <router-link to="/" class="home">
      <img src="../assets/img/HPSLayerDefHomepageButton_BackgroundImage.png">
    </router-link>
   <div class="main_content">
    <div
      v-for="item in menuList"
      :key="item.name"
      class="item"
      @click="next(item)"
      :data-url="item.name"
    >
      <img :src="item.img_url">
    </div>
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
      menuList: [
        {
          img_url: require("../assets/img/MMSLayerDefHeatingSmallButton_BackgroundImage.png"),
          name: "healthy",
          urls: {
            up: require("../assets/img/MMSLayerDefHeatingSmallButton_BackgroundImage.png"),
            down: require("../assets/img/MMSLayerDefHeatingSmallButton_PressImage.png")
          },
          next:"/healthyOption"
        },
        {
          img_url: require("../assets/img/MMSLayerDefDefrostSmallButton_BackgroundImage.png"),
          name: "defrost",
          urls: {
            up: require("../assets/img/MMSLayerDefDefrostSmallButton_BackgroundImage.png"),
            down: require("../assets/img/MMSLayerDefDefrostSmallButton_PressImage.png")
          },
          next:"/defrostOption"
        },
        // {
        //   img_url: require("../assets/img/MMSLayerDefMicroButton_BackgroundImage.png"),
        //   name: "microwave",
        //   urls: {
        //     up: require("../assets/img/MMSLayerDefMicroButton_BackgroundImage.png"),
        //     down: require("../assets/img/MMSLayerDefMicroButton_PressImage.png")
        //   },
        //   next:"/microwaveItem"
        // }
      ],
      data:{
        backurl:"/presets",
        title:this.$i18n.t("presets")
      }
    };
  },
  created:function(){
  },
  methods:{
    next:function(item){
      this.$router.push({path:item.next});
    }
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
.main_content {
  -webkit-transform: translateY(-50%);
  top: 30%;
  position: relative;
}
.item {
  margin: 20px 56px;
  display: inline-block;
}
.content{
  height: 100%;
}
</style>


