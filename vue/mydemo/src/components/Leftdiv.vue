<template>
  <div class="left">
    <div class="info">
      <div class="top felx">
        <div class="icon">
          <router-link :to="getPersonUrl()">
            <img :src="person.picurl">
          </router-link>
        </div>
        <div class="ptitle">
         <router-link :to="getPersonUrl()">{{person.name}}</router-link>
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
              <a v-if="item.type===true" class="count">{{item.num}}</a>
              <span v-else class="count">{{item.num}}</span>
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
    <div class="Newest">
      <h3 class="aside-title">个人分类</h3>
      <div class="aside-content">
        <ul>
          <li v-for="item in person.typeList" :key="item.value">
            <router-link :to="getArticleUrl()">
              <span v-if="item.type===true" class="titleleft">● 【{{item.title}}】</span>
              <span v-else class="titleleft">------【{{item.title}}】</span>
              <span  class="float-right">{{item.num}}篇</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="Newest">
      <h3 class="aside-title">热门文章</h3>
      <div class="aside-content">
        <ul class="hotArticle-list">
          <li v-for="item in person.hotArticleList" :key="item.value">
            <router-link :to="getArticleUrl()">{{item.title}}</router-link>
            <p class="read">阅读数 <span>{{item.num}}</span></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import service from "../libs/service";
import $ from "jquery";
import articleVue from './article.vue';
export default {
  data() {
    return {
      person: {}
    };
  },
  props: ["userid"],
  methods: {
    init(userid) {
      var self = this;
      service
        .ajax("/static/datas/persons.json")
        .then(res => {
          if (res[userid]) {
            self.person = res[userid];
          }
        })
        .catch();
    },
    getPersonUrl(){
      return "/"+this.person.name;
    },
    getArticleUrl(e){
      var articleId="123456";
      return "/"+this.person.name+"/article/"+articleId;
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
.info .top {
  padding: 16px 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e3e3e3;
  display: flex !important;
}
.felx {
  display: flex !important;
}
.felx div{
      margin: 5px 0px;
}
.felx .count {
    font-weight: 700;
}
.middle {
  /* margin-top: -8px; */
}
.infoList1 {
  border-bottom: 1px solid #e3e3e3;
}
.infoList1 li {
  padding: 16px;
}
.infoList2 {
  padding-bottom: 20px;
}
.infoList2 li {
  margin-top: 8px;
  width: 50%;
  display: inline-flex;
  line-height: 16px;
}
.infoList2 span {
  margin-left: 15px;
}
.info .icon {
  position: relative;
  width: 48px;
  height: 48px;
}
.ptitle {
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
.follow {
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
  color: #ca0c16;
}
.Newest {
  margin-bottom: 8px;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
}
.aside-title {
  font-size: 12px;
  color: #3d3d3d;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#efefef),
    to(#ddd)
  );
  background: linear-gradient(#efefef, #ddd);
  background-size: 300px 38px;
  padding: 0 16px;
  height: 38px;
  line-height: 38px;
}
.aside-content {
  padding: 16px;
  text-align: left;
}
.aside-content ul{
  margin-top: -8px;
}
.titleleft {
  width: 84%;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap !important;
  color: #369;
}
.float-right{
  float: right !important;
}
.aside-content li {
  margin-top: 8px;
}
.hotArticle-list a {
  display: block;
  max-height: 44px;
  overflow: hidden;
  word-wrap: break-word;
      color: #369;
}
.read {
  font-size: 12px;
    color: #858585;
    line-height: 20px;
        margin: 2px 0px;
}
</style>


