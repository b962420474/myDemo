<template>
  <div>
    <Back path="/" postTitle="Presets"></Back>
    <div class="add" @click="add()">
      <img :src="upload.img_url">
      <div>Save a preset</div>
    </div>
    <div class="menu" :style="{width:mywidth+'px'}">
      <div v-for="(item,index) in getItems" :key="index" class="menu_item" @mousedown="mousedown($event)">
        <div class="content">
          <li v-for="(data,i) in item" :key="i">
            <div class="item">
              <img :src="data.img_url">
            </div>
            <div class="item wea">{{data.wea}}</div>
            <div class="item time">
              <div>{{data.time.hour}}hr</div>
              <div>{{data.time.min}}min</div>
            </div>
            <div class="item" @click="handelDel(i)">
              <img src="../assets/img/HWMLayerRsmCancelButton_BackgroundImage.png">
            </div>
          </li>
        </div>
      </div>
    </div>
    <Lines :num="getItems.length" :index="active_index"></Lines>
    <Delete ref="del" title="Delete?" @del="del"></Delete>
  </div>
</template>
<script>
import Back from "../components/Back.vue";
import Delete from "../components/Delete.vue";
import Lines from "../components/Lines.vue";
let startX, X,translateX;
let hasMove = false;
export default {
  components: { Back,Delete,Lines},
  data() {
    return {
      list: [
          {
            img_url: require("../assets/img/DSLayerButton0_BackgroundImage.png"),
            name: "meat",
            wea: "22℃",
            time: {
              hour: "1",
              min: "55"
            }
          },
          {
            img_url: require("../assets/img/DSLayerButton0_BackgroundImage.png"),
            name: "meat",
            wea: "23℃",
            time: {
              hour: "1",
              min: "55"
            }
          },
          {
            img_url: require("../assets/img/DSLayerButton0_BackgroundImage.png"),
            name: "meat",
            wea: "24℃",
            time: {
              hour: "1",
              min: "55"
            }
          }
          ,
          {
            img_url: require("../assets/img/DSLayerButton0_BackgroundImage.png"),
            name: "meat",
            wea: "25℃",
            time: {
              hour: "1",
              min: "55"
            }
          }
      ],
      upload: {
        img_url: require("../assets/img/PHPMLayerDefSaveButton_BackgroundImage.png"),
        img_url_down: require("../assets/img/PHPMLayerDefSaveButton_BackgroundImage.png")
      },
      mywidth:480,
      active_index:0,
    };
  },
  computed:{
    getItems:function(){
      var items=[];
      var item=[];
      this.list.forEach((element,i,arry) => {
        item.push(element);
        if((i+1)%3===0||i===arry.length-1){
          items.push(item);
          item=[];
        }
      });
      this.mywidth=this.mywidth*items.length;
      return items;
    },
    
  },
  methods: {
    add: function() {
      // this.list.push({
      //       img_url: require("../assets/img/DSLayerButton0_BackgroundImage.png"),
      //       name: "meat",
      //       wea: "25℃",
      //       time: {
      //         hour: "1",
      //         min: "55"
      //       }});
      this.$router.push({name:"presetsItem"})
    },
    next: function(e) {},
    changeImage(item) {
      item.img_url = item.img_url_down;
    },
    handelDel(i){
      this.$refs.del.show(i);
    },
    del:function(index){
      console.log("del...."+index);
      this.list.splice(index,1);
    },
    mousedown:function(e){

    },
    mouseup:function(e){

    }
  }
};
</script>
<style scoped>
.menu{
  display: -webkit-flex;
  -webkit-transform: translateX(0)
}
.menu_item {
  width: 480px;
  text-align: left;
}
ul {
  margin: 0;
  width: 380px;
}
.menu_item li {
  display: -webkit-flex;
  line-height: 40px;
  margin: 5px;
}
.content{
  width: 400px;
  margin: auto;
}
.item {
  margin: 0 5px;
}
.wea {
  width: 100px;
  text-align: center;
}
.time {
  width: 200px;
  text-align: center;
}
.time div {
  width: 80px;
  text-align: center;
  display: inline-block;
}
.item img {
  width: 32px;
}
.add {
  display: -webkit-flex;
  width: 380px;
  margin: auto;
  line-height: 40px;
  border-bottom: 2px dashed;
  padding: 5px;
}
</style>


