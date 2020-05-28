<template>
  <div>
    <Back path="/" postTitle="Defrost"></Back>
    <div></div>
    <div class="menu_item">
      <li
        v-for="data in list"
        :key="data.name"
        @mouseup="next(data)"
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
          img_url: require("../assets/img/DSLayerButton0_BackgroundImage.png"),
          name: "meat",
          img_url_down: require("../assets/img/DSLayerButton0_PressImage.png")
        },
        {
          img_url: require("../assets/img/DSLayerButton1_BackgroundImage.png"),
          name: "birds",
          img_url_down: require("../assets/img/DSLayerButton1_PressImage.png")
        },
        {
          img_url: require("../assets/img/DSLayerButton2_BackgroundImage.png"),
          name: "fish",
          img_url_down: require("../assets/img/DSLayerButton2_PressImage.png")
        },
        {
          img_url: require("../assets/img/DSLayerButton3_BackgroundImage.png"),
          name: "vegetables",
          img_url_down: require("../assets/img/DSLayerButton3_PressImage.png")
        },
        {
          img_url: require("../assets/img/DSLayerButton4_BackgroundImage.png"),
          name: "manual",
          img_url_down: require("../assets/img/DSLayerButton4_PressImage.png")
        }
      ]
    };
  },
  methods: {
    next: function(item) {
      var message={
        "title":item.name,
        "imgurl":item.img_url,
        "backurl":"/defrost"
      }
      this.$router.push({name:'defrostItem',params:{'message':message}});
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


