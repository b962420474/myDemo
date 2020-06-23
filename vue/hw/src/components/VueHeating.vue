<template>
  <div>
    <Lines :num="num" :index="activeIndex"></Lines>
    <div
      id="menu_content"
      class="menu_content"
      @mouseup="mouseup($event)"
      @mousedown="mousedown($event)"
    >
      <div v-for="(item,index ) in list" :key="index" class="menu_item">
        <li
          v-for="(data,i) in item"
          :key="i"
          @mouseup="next(i,$event)"
          @mousedown="changeImage(data,i,$event)"
        >
          <img :src="data.img_url">
        </li>
      </div>
    </div>
  </div>
</template>
<script>
import Lines from "./Lines.vue";
import { getTranslate, getIndex } from "../lib/util.js";
var startX, X, moveEndX;
var translateX;
var offset;
var hasMove = false;
export default {
  components: {Lines },
  props:['type'],
  inject:['getDatas'],
  data() {
    return {
      list: [
        [
          {
            img_url: require("../assets/img/HSLayerDMFrstStandardSmallButton_BackgroundImage.png"),
            name: "Standard",
            img_url_down: require("../assets/img/HSLayerDMFrstStandardSmallButton_PressImage.png"),
            img_url_up: require("../assets/img/HSLayerDMFrstStandardSmallButton_BackgroundImage.png"),
            datas: {
              head: {
                title: this.$i18n.t("Standard"),
                backurl: "/healthy"
              },
              mwo: false
            }
          },
          {
            img_url: require("../assets/img/HSLayerDMFrstConvectionSmallButton_BackgroundImage.png"),
            name: "Convection",
            img_url_down: require("../assets/img/HSLayerDMFrstConvectionSmallButton_PressImage.png"),
            img_url_up: require("../assets/img/HSLayerDMFrstConvectionSmallButton_BackgroundImage.png"),
            datas: {
              head: {
                title: this.$i18n.t("convection"),
                backurl: "/healthy"
              },
              mwo: true
            }
          },
          {
            img_url: require("../assets/img/HSLayerDMFrstEcoSmallButton_BackgroundImage.png"),
            name: "ECO",
            img_url_down: require("../assets/img/HSLayerDMFrstEcoSmallButton_PressImage.png"),
            img_url_up: require("../assets/img/HSLayerDMFrstEcoSmallButton_BackgroundImage.png"),
            datas: {
              head: {
                title: this.$i18n.t("ECO"),
                backurl: "/healthy"
              },
              mwo: false
            }
          },
          {
            img_url: require("../assets/img/HSLayerDMFrstFannedSmallButton_BackgroundImage.png"),
            name: "Fanned",
            img_url_down: require("../assets/img/HSLayerDMFrstFannedSmallButton_PressImage.png"),
            img_url_up: require("../assets/img/HSLayerDMFrstFannedSmallButton_BackgroundImage.png"),
            datas: {
              head: {
                title: this.$i18n.t("fanned"),
                backurl: "/healthy"
              },
              mwo: false
            }
          },
          {
            img_url: require("../assets/img/HSLayerDMFrstGrillSmallButton_BackgroundImage.png"),
            name: "Grills",
            img_url_down: require("../assets/img/HSLayerDMFrstGrillSmallButton_PressImage.png"),
            img_url_up: require("../assets/img/HSLayerDMFrstGrillSmallButton_BackgroundImage.png"),
            datas: {
              head: {
                title: this.$i18n.t("grill"),
                backurl: "/healthy"
              },
              mwo: false
            }
          },
          {
            img_url: require("../assets/img/HSLayerDMFrstGrillFanSmallButton_BackgroundImage.png"),
            name: "Grill_Fans",
            img_url_down: require("../assets/img/HSLayerDMFrstGrillFanSmallButton_PressImage.png"),
            img_url_up: require("../assets/img/HSLayerDMFrstGrillFanSmallButton_BackgroundImage.png"),
            datas: {
              head: {
                title: this.$i18n.t("grill_Fan"),
                backurl: "/healthy"
              },
              mwo: false
            }
          },
          {
            img_url: require("../assets/img/HSLayerDMFrstDoubleGrillSmallButton_BackgroundImage.png"),
            name: "Double_grills",
            img_url_down: require("../assets/img/HSLayerDMFrstDoubleGrillSmallButton_PressImage.png"),
            img_url_up: require("../assets/img/HSLayerDMFrstDoubleGrillSmallButton_BackgroundImage.png"),
            datas: {
              head: {
                title: this.$i18n.t("double_grill"),
                backurl: "/healthy"
              },
              mwo: false
            }
          },
          {
            img_url: require("../assets/img/HSLayerDMFrstBottomSmallButton_BackgroundImage.png"),
            name: "Bottom",
            img_url_down: require("../assets/img/HSLayerDMFrstBottomSmallButton_PressImage.png"),
            img_url_up: require("../assets/img/HSLayerDMFrstBottomSmallButton_BackgroundImage.png"),
            datas: {
              head: {
                title: this.$i18n.t("bottom"),
                backurl: "/healthy"
              },
              mwo: false
            }
          }
        ],
        [
          {
            img_url: require("../assets/img/HSLayerDMScndSlowCookSmallButton_BackgroundImage.png"),
            name: "Slow_cooks",
            img_url_down: require("../assets/img/HSLayerDMScndSlowCookSmallButton_PressImage.png"),
            img_url_up: require("../assets/img/HSLayerDMScndSlowCookSmallButton_BackgroundImage.png"),
            datas: {
              head: {
                title: this.$i18n.t("slow_cook"),
                backurl: "/healthy"
              },
              mwo: false
            }
          },
          {
            img_url: require("../assets/img/HSLayerDMScndPreserveSmallButton_BackgroundImage.png"),
            name: "Preserve",
            img_url_down: require("../assets/img/HSLayerDMScndPreserveSmallButton_PressImage.png"),
            img_url_up: require("../assets/img/HSLayerDMScndPreserveSmallButton_BackgroundImage.png"),
            datas: {
              head: {
                title: this.$i18n.t("preserve"),
                backurl: "/healthy"
              },
              mwo: false
            }
          },
          {
            img_url: require("../assets/img/HSLayerDMScndWarmPlateSmallButton_BackgroundImage.png"),
            name: "Warm_plate",
            img_url_down: require("../assets/img/HSLayerDMScndWarmPlateSmallButton_PressImage.png"),
            img_url_up: require("../assets/img/HSLayerDMScndWarmPlateSmallButton_BackgroundImage.png"),
            datas: {
              head: {
                title: this.$i18n.t("warm_plate"),
                backurl: "/healthy"
              },
              mwo: false
            }
          },
          {
            img_url: require("../assets/img/HSLayerDMScndDrySmallButton_BackgroundImage.png"),
            name: "Dry",
            img_url_down: require("../assets/img/HSLayerDMScndDrySmallButton_PressImage.png"),
            img_url_up: require("../assets/img/HSLayerDMScndDrySmallButton_BackgroundImage.png"),
            datas: {
              head: {
                title: this.$i18n.t("dry"),
                backurl: "/healthy"
              },
              mwo: false
            }
          },
          {
            img_url: require("../assets/img/HSLayerDMScndPizzaSmallButton_BackgroundImage.png"),
            name: "Pizzas",
            img_url_down: require("../assets/img/HSLayerDMScndPizzaSmallButton_PressImage.png"),
            img_url_up: require("../assets/img/HSLayerDMScndPizzaSmallButton_BackgroundImage.png"),
            datas: {
              head: {
                title: this.$i18n.t("Pizza"),
                backurl: "/healthy"
              },
              mwo: true
            }
          }
        ]
      ],
      itemIndex: 0,
      isItem: false,
      num: 2,
      activeIndex: 0,
       plugin:null
    };
  },
  created:function(){
    this.plugin=this.getDatas().plugin;
  },
  mounted: function() {
    offset = document.getElementById("menu_content").querySelector(".menu_item").offsetWidth;
  },
  methods: {
    mousemove: function(e) {
      var target = e.currentTarget;
      moveEndX = e.pageX;
      X = moveEndX - startX;
      var length = translateX;
      console.log("move.....");
      length += X;
      target.style["-webkit-transform"] = "translateX(" + length + "px)";
      target.style["transition"] = "all 0s";
      //this.list[this.activeIndex][this.itemIndex].img_url=this.list[this.activeIndex][this.itemIndex].img_url_up;
    },
    next: function(i, e) {
      console.log("next");
    },
    changeImage(item,i, e) {
      console.log("changeImage");
      this.isItem = true;
      this.itemIndex=i;
      e.preventDefault();
      //item.img_url=item.img_url_down;
    },
    mouseup: function(e) {
      console.log("up");
      var target = e.currentTarget;
      target.removeEventListener("mousemove", this.mousemove);
      moveEndX = e.pageX;
      X = moveEndX - startX;
      if (Math.abs(X) >= 30) {
        if (X >= 0) {
          this.activeIndex =
            this.activeIndex - 1 < 0 ? 0 : this.activeIndex - 1;
        } else if (X <= 0) {
          this.activeIndex =
            this.activeIndex + 1 > this.num - 1
              ? this.num - 1
              : this.activeIndex + 1;
        }
        var length = -this.activeIndex*offset;
        console.log("length:" + length);
        target.style["-webkit-transform"] = "translateX(" + length + "px)";
        target.style["transition"] = "all 0.2s";
        translateX = length;
      } else if (this.isItem) {
        if(this.type==="presets"){
          const path="presets?heating-"+this.list[this.activeIndex][this.itemIndex].name;
          console.log(path);
          try{
            this.plugin.route(path);
          }
          catch(e){
            console.log("this is no iBrowser");
          }
          this.$router.push({ name: "heatingItem",params:{message:this.list[this.activeIndex][this.itemIndex]} })
        }
        else{
          const path="heating?"+this.list[this.activeIndex][this.itemIndex].name;
          console.log(path);
          try{
            this.plugin.route(path);
          }
          catch(e){
            console.log("this is no iBrowser");
          }
          this.$router.push({ name: "pizza",params:{message:this.list[this.activeIndex][this.itemIndex].datas} })
        }
      }
      this.isItem = false;
    },
    mousedown: function(e) {
      console.log("down");
      var target = e.currentTarget;
      translateX = getTranslate(target, "x");
      startX = e.pageX;
      target.addEventListener("mousemove", this.mousemove);
    }
  }
};
</script>
<style scoped>
.menu_content {
  width: 200%;
  display: -webkit-flex;
  -webkit-transform: translateX(0);
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


