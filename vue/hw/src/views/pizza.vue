<template>
  <div>
    <Back :path="datas.head.backurl" :postTitle="datas.head.title"></Back>
    <router-link to="/" class="home">
      <img src="../assets/img/HPSLayerDefHomepageButton_BackgroundImage.png">
    </router-link>
    <div class="menu_item">
      <li>
        <div class="menu_item_title">Boost</div>
        <div class="menu_item_switch float">
          <div class="ckbx-style-1" @click="openBoost($event)">
            <input type="checkbox" id="ckbx-style-1-1" value="0" name="ckbx-style-1">
            <label for="ckbx-style-1-1"></label>
          </div>
        </div>
      </li>
      <li v-show="datas.mwo">
        <div class="menu_item_title">MWO</div>
        <div class="menu_item_option float">
          <div v-for="(it,index) in mwoList" :key="index" :class="{active:it.isactive}" @click="selectMWO(index)">{{it.name}}</div>
        </div>
        <div class="menu_item_switch float">
          <div class="ckbx-style-1" @click="openMWO($event)">
            <input type="checkbox" id="ckbx-style-1-2" value="0" name="ckbx-style-2">
            <label for="ckbx-style-1-2"></label>
          </div>
        </div>
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
      datas: {},
      mwoList:[
        {name:100,isactive:false},
        {name:300,isactive:false},
        {name:500,isactive:false},
      ]
    };
  },
  created: function() {
    this.datas = this.$route.params.message;
  },
  methods: {
    next: function(e) {},
    openBoost:function(e){
      var checkbox=document.getElementById("ckbx-style-1-1");
      var checkbox2=document.getElementById("ckbx-style-1-2");
      if(!checkbox.checked){
        checkbox2.checked=false;
        this.mwoList.forEach(element => {
          element.isactive=false;
        });
      }
    },
    openMWO:function(e){
      e.preventDefault();
      var checkbox=document.getElementById("ckbx-style-1-1");
      var checkbox2=document.getElementById("ckbx-style-1-2");
      if(!checkbox2.checked){
        checkbox.checked=false;
        this.mwoList[0].isactive=true;
        checkbox2.checked=true;
      }
      else{
        checkbox2.checked=false;
        this.mwoList.forEach(element => {
          element.isactive=false;
        });
      }
    },
    selectMWO:function(index){
      var checkbox2=document.getElementById("ckbx-style-1-2");
      if(checkbox2.checked){
        this.mwoList.forEach((element,i)=> {
          element.isactive=false;
          if(i===index){
            element.isactive=true;
          }
        });
      }
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
  display: block;
   /* display: -webkit-flex; */
}
.menu_item_title{
  line-height: 24px;
  display: inline-block;
}
.float{
  float:right;
}
.menu_item_switch{
  margin-right:5px;
}
.menu_item_option{
  display: -webkit-flex;
  background: #4d4d4d;
  border-radius: 50px;
}
.menu_item_option div{
  width:60px;
  line-height: 24px;
  text-align: center;
  border-radius: 50px;
}
.menu_item_option .active{
  background: #2196F3;
}
</style>


