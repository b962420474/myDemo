<template>
  <div class="main_content">
    <div
      v-for="item in menuList"
      :key="item.name"
      class="item"
      @click="next($event)"
      :data-url="item.name"
      @mousedown="changeImage(item)"
    >
      <img :src="item.img_url">
    </div>
  </div>
</template>
<script>
export default {
  inject:['getDatas'],
  data() {
    return {
      menuList: [
        {
          img_url: require("../assets/img/MMSLayerDefHeatingSmallButton_BackgroundImage.png"),
          name: "healthy",
          urls: {
            up: require("../assets/img/MMSLayerDefHeatingSmallButton_BackgroundImage.png"),
            down: require("../assets/img/MMSLayerDefHeatingSmallButton_PressImage.png")
          }
        },
        {
          img_url: require("../assets/img/MMSLayerDefDefrostSmallButton_BackgroundImage.png"),
          name: "defrost",
          urls: {
            up: require("../assets/img/MMSLayerDefDefrostSmallButton_BackgroundImage.png"),
            down: require("../assets/img/MMSLayerDefDefrostSmallButton_PressImage.png")
          }
        },
        // {
        //   img_url: require("../assets/img/MMSLayerDefMicroButton_BackgroundImage.png"),
        //   name: "microwave",
        //   urls: {
        //     up: require("../assets/img/MMSLayerDefMicroButton_BackgroundImage.png"),
        //     down: require("../assets/img/MMSLayerDefMicroButton_PressImage.png")
        //   }
        // },
        {
          img_url: require("../assets/img/MMSLayerDefPresetsSmallButton_BackgroundImage.png"),
          name: "presets",
          urls: {
            up: require("../assets/img/MMSLayerDefPresetsSmallButton_BackgroundImage.png"),
            down: require("../assets/img/MMSLayerDefPresetsSmallButton_PressImage.png")
          }
        },
        {
          img_url: require("../assets/img/MMSLayerDefSettingsSmallButton_BackgroundImage.png"),
          name: "settings",
          urls: {
            up: require("../assets/img/MMSLayerDefSettingsSmallButton_BackgroundImage.png"),
            down: require("../assets/img/MMSLayerDefSettingsSmallButton_PressImage.png")
          }
        }
      ],
      plugin:null
    };
  },
   created:function(){
    this.plugin=this.getDatas().plugin;
    if(window.iBrowser){
      this.plugin.route("main?main");
    }
  },
  beforeDestroy(){
    this.menuList=null;
    this.plugin=null;
  },
  methods: {
    next: function(e) {
      if(window.iBrowser){
        this.plugin.route("gray");
      }
      this.$router.push({ path: "/" + e.currentTarget.dataset.url });
    },
    changeImage(item){
      item.img_url=item.urls.down;
    }
  }
};
</script>
<style scoped>
.main_content {
  -webkit-transform: translateY(-50%);
  /* display: -webkit-flex; */
  top: 50%;
  position: relative;
  text-align: start;
  /* -webkit-justify-content: center; */
}
.item {
  margin: 20px 36px;
  display: inline-block;
}
</style>


