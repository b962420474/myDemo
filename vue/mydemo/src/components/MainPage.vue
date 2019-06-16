<template>
  <div class="main">
    <div class="left">
      <ul>
        <li v-for="item in items" :key="item.title">
          <a @click="handlePage" :data-id="item.data">{{item.title}}</a>
        </li>
      </ul>
    </div>
    <div class="right">
      <ul>
        <li v-for="item in list" :key="item.title">
          <div>
            <h2>
              <a @click="toPerson">{{item.title}}</a>
            </h2>
            <div>{{item.content}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import service from "../libs/service";
import $ from "jquery";
export default {
  data() {
    return {
      items: [],
      list: []
    };
  },
  methods: {
    handlePage: function(e) {
      let data = $(e.target).data("id");
      this.$router.push({ path: "home", query: { id: data } });
    },
    getPage(id) {
      service
        .ajax("/static/datas/pageList.json")
        .then(res => {
          if (res.pageList[id]) {
            this.list = res.pageList[id];
          } else {
            this.list = res.pageList["recommend"];
          }
        })
        .catch(res => {});
    },
    getType() {
      service
        .ajax("/static/datas/typeList.json")
        .then(res => {
          this.items=res;
        })
        .catch(res => {});
    },
    toPerson() {
      this.$router.push({ path: "home/chao" });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log("beforeRouteEnter:" + vm.$attrs["id"]);
      vm.getType();
      vm.getPage(vm.$attrs["id"]);
    });
  },
  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate:" + to.query["id"]);
    this.getPage(to.query["id"]);
    next();
  }
};
</script>
<style scoped>
.main {
  width: 1180px;
  padding: 12px 0 0;
  margin-right: auto;
  margin-left: auto;
}
.left {
  float: left;
  width: 100px;
  background-color: #fff;
  margin-right: 12px;
  text-align: center;
  line-height: 32px;
  position: relative;
  padding: 6px 0;
  -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04);
}
.left a {
  width: 100%;
  height: 100%;
  display: block;
  font-size: 14px;
  color: #707070;
  margin-bottom: 1px;
}
.left ul {
  padding-left: 0;
}
.left li {
  width: 100%;
  margin: 5px auto;
}
.left li :hover {
  background-color: #f44444;
}
.right {
  float: left;
  width: 760px;
  min-height: 500px;
  margin-right: 12px;
  text-align: left;
}
.right ul {
  margin-top: 0px;
}
.right li {
  padding: 18px 24px;
  background: #fff;
  border-bottom: 1px solid #f4f4f4;
  position: relative;
  -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04);
}
.right h2 {
  font-size: 18px;
  font-weight: bold;
  line-height: 24px;
  height: 24px;
  margin-bottom: 4px;
  overflow: hidden;
  white-space: nowrap;
}
.right h2 a {
  max-width: 98%;
  color: #3d3d3d;
  display: block;
  line-height: 24px;
  height: 24px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>


