<template>
  <div>
    <Back path="/" postTitle="Settings"></Back>
    <div class="menu_item">
      <li
        v-for="data in list"
        :key="data.name"
        @mouseup="next($event)"
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
  data() {
    return {
      list: [
        {
          img_url: require("../assets/img/SSLayerDefTimeSmallRadioBox_BackgroundImage.png"),
          name: "time",
          img_url_down: require("../assets/img/SSLayerDefTimeSmallRadioBox_CheckedImage.png")
        },
        {
          img_url: require("../assets/img/SSLayerDefDateSmallRadioBox_BackgroundImage.png"),
          name: "date",
          img_url_down: require("../assets/img/SSLayerDefDateSmallRadioBox_CheckedImage.png")
        },
        {
          img_url: require("../assets/img/SSLayerDefLanguageSmallRadioBox_BackgroundImage.png"),
          name: "language",
          img_url_down: require("../assets/img/SSLayerDefLanguageSmallRadioBox_CheckedImage.png")
        },
        {
          img_url: require("../assets/img/SSLayerDefBrightnessSmallRadioBox_BackgroundImage.png"),
          name: "brightness",
          img_url_down: require("../assets/img/SSLayerDefBrightnessSmallRadioBox_CheckedImage.png")
        },
        {
          img_url: require("../assets/img/SSLayerDefVolumeSmallRadioBox_BackgroundImage.png"),
          name: "voice",
          img_url_down: require("../assets/img/SSLayerDefVolumeSmallRadioBox_CheckedImage.png")
        },
        {
          img_url: require("../assets/img/SSLayerDefResetSmallRadioBox_BackgroundImage.png"),
          name: "setup",
          img_url_down: require("../assets/img/SSLayerDefResetSmallRadioBox_CheckedImage.png")
        }
      ]
    };
  },
  methods: {
    next: function(e) {
    },
    changeImage(item) {
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


