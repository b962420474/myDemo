<template>
  <div class="left">
    <div class="info">
      <div class="top felx">
        <div class="icon">
          <a>
            <img :src="person.picurl">
          </a>
        </div>
        <div class="ptitle">
          <a>{{person.name}}</a>
        </div>
        <div class="follow">
          <a>关注</a>
        </div>
      </div>
      <div class="infoList1 middle">
        <ul class="felx">
          <li v-for="item in person.infoList1" :key="item.title">
            <div>
              <a v-if="item.type===true">{{item.title}}</a>
              <span v-else>{{item.title}}</span>
            </div>
            <div>
              <a v-if="item.type===true">{{item.num}}</a>
              <span v-else>{{item.num}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="infoList2 middle">
        <ul>
          <li v-for="item in person.infoList2" :key="item.title">
              <span>{{item.title}}:</span>
              <span>{{item.num}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="Newest"></div>
    <div class="sort"></div>
  </div>
</template>
<script>
import service from "../libs/service";
import $ from "jquery";
import datas from "../libs/data";
export default {
  data() {
    return {
      person: {}
    };
  },
  props: ["userid"],
  methods: {
    init(userid) {
      //service.ajax();
      if (datas.persons[userid]) {
        this.person = datas.persons[userid];
      }
    }
  },
  mounted: function() {
    console.log("created" + this.uesrid);
    this.init(this.userid);
  }
};
</script>
<style scoped>
.left {
  float: left;
  width: 300px;
}
.info {
  margin-bottom: 8px;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
}
.info .top{
    padding: 16px 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e3e3e3;
    display: flex !important;
}
.felx{
    display: flex !important;
}
.middle{
    margin-top: -8px;
}
.infoList1{
    border-bottom: 1px solid #e3e3e3;
}
.infoList1 li{
    padding: 16px;
}
.infoList2{
    padding-bottom: 20px;
}
.infoList2 li{
    margin-top: 8px;
    width: 50%;
    display: inline-flex;
    line-height: 16px;
}
.infoList2 span{
    margin-left:15px;
}
.info .icon{
    position: relative;
    width: 48px;
    height: 48px;
}
.ptitle{
    display: inline-block;
    color: #3d3d3d;
    font-weight: 700;
    max-width: 150px;
    max-height: 66px;
    overflow: hidden;
    margin-left: 8px;
    width: 156px;
    line-height: 48px;
    word-wrap: break-word;
}
.follow{
    width: 56px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-left: 0;
    margin-right: 0;
    margin-top: 10px;
    width: 56px;
    height: 28px;
    min-width: auto;
    font-size: 12px;
    border: solid 1px #ca0c16;
    border-radius: 5px;
    line-height: 28px;
    color:#ca0c16;
}
</style>


