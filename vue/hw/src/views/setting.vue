<template>
  <div>
    <Back path="/" :postTitle="$t('settings')"></Back>
    <div class="menu_item">
      <li
        v-for="data in list"
        :key="data.name"
        @mouseup="next(data.name)"
        @mousedown="changeImage(data)"
      >
        <img :src="data.img_url">
      </li>
    </div>
  </div>
</template>
<script>
import Back from "../components/Back.vue";
export default {
  components: { Back },
  inject:['getDatas'],
  data() {
    return {
      list: [
        {
          img_url: require("../assets/img/SSLayerDefTimeSmallRadioBox_BackgroundImage.png"),
          name: "setTime",
          img_url_down: require("../assets/img/SSLayerDefTimeSmallRadioBox_CheckedImage.png"),
          img_url_up: require("../assets/img/SSLayerDefTimeSmallRadioBox_BackgroundImage.png")
        },
        {
          img_url: require("../assets/img/SSLayerDefDateSmallRadioBox_BackgroundImage.png"),
          name: "date",
          img_url_down: require("../assets/img/SSLayerDefDateSmallRadioBox_CheckedImage.png"),
          img_url_up: require("../assets/img/SSLayerDefDateSmallRadioBox_BackgroundImage.png")
        },
        {
          img_url: require("../assets/img/SSLayerDefLanguageSmallRadioBox_BackgroundImage.png"),
          name: "language",
          img_url_down: require("../assets/img/SSLayerDefLanguageSmallRadioBox_CheckedImage.png"),
          img_url_up: require("../assets/img/SSLayerDefLanguageSmallRadioBox_BackgroundImage.png")
        },
        {
          img_url: require("../assets/img/SSLayerDefBrightnessSmallRadioBox_BackgroundImage.png"),
          name: "voice/brightness",
          img_url_down: require("../assets/img/SSLayerDefBrightnessSmallRadioBox_CheckedImage.png"),
          img_url_up: require("../assets/img/SSLayerDefBrightnessSmallRadioBox_BackgroundImage.png")
        },
        {
          img_url: require("../assets/img/SSLayerDefVolumeSmallRadioBox_BackgroundImage.png"),
          name: "voice/volume",
          img_url_down: require("../assets/img/SSLayerDefVolumeSmallRadioBox_CheckedImage.png"),
          img_url_up: require("../assets/img/SSLayerDefVolumeSmallRadioBox_BackgroundImage.png")
        },
        {
          img_url: require("../assets/img/SSLayerDefResetSmallRadioBox_BackgroundImage.png"),
          name: "setting",
          img_url_down: require("../assets/img/SSLayerDefResetSmallRadioBox_CheckedImage.png"),
          img_url_up: require("../assets/img/SSLayerDefResetSmallRadioBox_BackgroundImage.png")
        }
      ],
      plugin:null
    };
  },
  created:function(){
    this.plugin=this.getDatas().plugin;
  },
  methods: {
    next: function(name) {
      console.log("push setting?"+name);
      this.plugin.route("setting?"+name);
    },
    changeImage(item) {
      this.list.forEach(element => {
        element.img_url = element.img_url_up;
      });
      item.img_url = item.img_url_down;
    }
  }
};
</script>
<style scoped>
.menu_item {
  width: 480px;
  text-align: left;
}
.menu_item li {
  margin: 20px 37px;
  display: inline-block;
}
</style>


