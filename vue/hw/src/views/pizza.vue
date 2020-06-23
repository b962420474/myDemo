<template>
  <div>
    <Back :path="datas.head.backurl" :postTitle="datas.head.title"></Back>
    <router-link to="/" class="home" @click.native="sendRora()">
      <img src="../assets/img/HPSLayerDefHomepageButton_BackgroundImage.png">
    </router-link>
    <div class="menu_item" v-show="!isshow">
      <li>
        <div class="menu_item_title">{{$t('boost')}}</div>
        <div class="menu_item_switch float">
          <div class="ckbx-style-1" @click="openBoost($event)">
            <input type="checkbox" id="ckbx-style-1-1" value="0" name="ckbx-style-1">
            <label for="ckbx-style-1-1"></label>
          </div>
        </div>
      </li>
      <!-- <li v-show="datas.mwo">
        <div class="menu_item_title">{{$t('MWO')}}</div>
        <div class="menu_item_option float">
          <div v-for="(it,index) in mwoList" :key="index" :class="{active:it.isactive}" @click="selectMWO(index)">{{it.name}}</div>
        </div>
        <div class="menu_item_switch float">
          <div class="ckbx-style-1" @click="openMWO($event)">
            <input type="checkbox" id="ckbx-style-1-2" value="0" name="ckbx-style-2">
            <label for="ckbx-style-1-2"></label>
          </div>
        </div>
      </li> -->
    </div>
    <div class="item" v-show="isshow">
      <!-- <img :src='data.img_url'> -->
      <Loading></Loading>
    </div>
  </div>
</template>
<script>
import Back from "../components/Back.vue";
import Loading from "../components/Loading.vue";
export default {
  components: { Back,Loading },
  inject:['getDatas'],
  data() {
    return {
      datas: {},
      mwoList:[
        {name:100,isactive:false},
        {name:300,isactive:false},
        {name:500,isactive:false},
      ],
      plugin:null,
      isshow:false,
    };
  },
  created: function() {
    this.datas = this.$route.params.message;
    this.plugin=this.getDatas().plugin;
  },
  methods: {
    next: function(e) {},
    sendRora:function(){
      this.fns.roar(this.plugin);
    },
    openBoost:function(e){
      var checkbox=document.getElementById("ckbx-style-1-1");
      if(!checkbox.checked){
        this.fns.openBoost(this.plugin,'');
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
    },
    processing:function(){
      this.isshow=true;
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
.item {
  -webkit-transform: translateY(-50%);
  top: 30%;
  position: relative;
}
</style>


