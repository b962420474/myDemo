<template>
  <div class="bac" v-show="open">
    <div class="wifiInput" >
      <div class="title">{{name}}</div>
      <div class="content">
        <input :type="type" v-model="pwd">
        <div class="iconfont eye" @click="changeEye()">{{type==="password"?"&#xe654;":"&#xe716;"}}</div>
      </div>
      <div class="btn">
        <div @click="connectWifi()"><span>连接</span></div>
        <div @click="cancle()"><span>取消</span></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: "password",
      open: false,
      name: "",
      pwd: ""
    };
  },
  methods: {
    changeEye: function() {
      this.type = this.type === "password" ? "text" : "password";
    },
    connectWifi: function() {
      this.open = false;
      console.log("name:"+this.name+",pwd:"+this.pwd);
      this.plugin.connect(this.name,this.pwd);
    },
    cancle: function() {
      this.open = false;
    },
    openInput(open, data) {
      this.pwd = "";
      this.open = open;
      this.name = data;
    }
  }
};
</script>

<style scoped>
.bac{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 100;
    background: wheat;
    top:0
}
.wifiInput {
  width: 99%;
  height: 33%;
  overflow: hidden;
  position: relative;
  top: 0;
}
.title {
  height: 30%;
  -webkit-align-items: center;
  font-size: 50px;
}
.content {
  display: -webkit-flex;
  min-width: 390px;
  max-width: 800px;
  height: 50%;
  margin: 0 10px;
  position: relative;
  -webkit-align-items: center;
  -webkit-justify-content: center;
}
.content input {
  width: 100%;
  height: 35px;
  border-radius: 5px;
  border: 1px solid;
}
.eye {
  position: absolute;
  font-size: 5px;
  line-height: 35px;
  border-left: 1px solid;
  width: 36px;
  border-radius: 5px;
  right:0;
  transform: translateY(-50%);
  top: 50%;
}
.btn {
  display: -webkit-flex;
  min-width: 390px;
  max-width: 800px;
  margin: 0 10px;
  position: relative;
  -webkit-justify-content: center;
  height: 18%;
  -webkit-align-items: center;
  border: 2px solid gray;
  border-radius: 15px;
}
.btn div {
  margin: 0 10%;
  width:20%;
  font-size: 30px;
}
</style>

