<template>
  <div>
    <Back path="/presetsItem" :postTitle="title"></Back>
    <router-link to="/" class="home">
      <img src="../assets/img/HPSLayerDefHomepageButton_BackgroundImage.png">
    </router-link>
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
  inject:['getDatas'],
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
          name: "bird",
          img_url_down: require("../assets/img/DSLayerButton1_PressImage.png")
        },
        {
          img_url: require("../assets/img/DSLayerButton2_BackgroundImage.png"),
          name: "fishss",
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
      ],
       title:this.$i18n.t("presets"),
       plugin:null
    };
  },
  created:function(){
    this.plugin=this.getDatas().plugin;
  },
  methods: {
    next: function(item) {
      var message={
        "title":this.title,
        "imgurl":item.img_url,
        "backurl":"/defrostOption"
      }
       try{
            console.log("presets?defrost-"+item.name);
            this.plugin.route("presets?defrost-"+item.name);
          }
      catch(e){
          console.log("this is no iBrowser");
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
.home {
  display: -webkit-flex;
  -webkit-justify-content: center;
  z-index: 2;
  position: absolute;
  top: 10px;
  right: 20px;
}
.menu_item {
  width: 480px;
  text-align: left;
}
.menu_item li {
  margin: 20px 37px;
  display: inline-block;
}
</style>


