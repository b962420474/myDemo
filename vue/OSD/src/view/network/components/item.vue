<template>
    <li @click="input_password(item)" class="li">
        <div class="item">
          <span class="iconfont wifi" v-html="getLevel"></span>
          <div>{{item.name}}</div>
          <div class="iconfont wifi right">{{item.encryption?"&#xe7ab;":"&#xe630;"}}</div>
        </div>
        <div class="state" v-show="item.state">{{getState(item)}}</div>
    </li>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    getState: function() {
      return function(item) {
        var msg = "";
        switch (item.state) {
          case 0:
            msg = "未连接";
            break;
          case 1:
            msg = "连接成功";
            break;
          case 2:
            msg = "连接失败,密码错误";
            break;
          case 3:
            msg = "wifi连接中。。。";
            break;
        }
        return msg;
      };
    },
    getLevel:function(){
      let msg="";
      switch (this.item.level) {
          case 1:
            msg = "&#xe673;";
            break;
          case 2:
            msg = "&#xe60e;";
            break;
          case 3:
            msg = "&#xe672;";
            break;
          case 4:
            msg = "&#xe602;";
            break;
        }
        return msg;
    }
  },
  methods: {
    input_password: function(item) {
        this.$emit("openInput",item)
    }
  }
};
</script>
<style scoped>
.li {
  min-height: 80px;
}
.li .item {
  display: -webkit-flex;
  font-size: 30px;
}
.wifi {
  font-size: 30px;
}
.right {
  position: absolute;
  right: 10px;
}
.state {
  text-align: left;
  font-size: 15px;
}
</style>


