<template>
  <div id="app">
    <router-view ref="view"/>
    <object
      ref="plugin"
      type="brown/home"
      style="visibility:hidden; width:0px; height:0px;"
      @WifiScanFinish="WifiScanFinish"
      @WifiConnectResult="WifiConnectResult"
    ></object>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted: function() {
    this.plugin.init(this.$refs.plugin);
    this.plugin.start();
    // setTimeout(()=>{
    //   this.WifiScanFinish();
    // },4000);
    // setTimeout(()=>{
    //   this.WifiConnectResult('{"ssid":"iserverNetwork","state":0,"errnum":0}');
    // },14000);
  },
  methods: {
    WifiScanFinish: function() {
      let data = window.iBrowser
        ? this.plugin.el.scan_result
        : JSON.stringify({
            wifilist: [
              { ssid: "iserverNetwork", encrypt: 1, signalSTR: 4 },
              { ssid: "fdgfxvxcv", encrypt: 0, signalSTR: 3 },
              { ssid: "xcxcvcxvv", encrypt: true, signalSTR: 2 },
              { ssid: "xerewrefgggdW", encrypt: true, signalSTR: 1 },
              { ssid: "fsdffds", encrypt: true, signalSTR: 4 },
              { ssid: "xerewrfxvefgggdW", encrypt: true, signalSTR: 4 },
              { ssid: "ddsfdfdxcv", encrypt: true, signalSTR: 4 },
              { ssid: "xerewvdfrcxvefgggdW", encrypt: true, signalSTR: 4 },
              { ssid: "aer", encrypt: true, signalSTR: 4 },
              { ssid: "awerer", encrypt: false, signalSTR: 4 }
            ]
          });
      console.log(data);
      const a = JSON.parse(data).wifilist;
      const arry = a.map(ele => {
        ele.state = 0;
        return ele;
      });
      this.$refs.view.WifiScanFinish&&this.$refs.view.WifiScanFinish(arry);
    },
    WifiConnectResult:function(result){
      console.log("result:"+result);
      result=JSON.parse(result);
      this.$refs.view.updateState&&this.$refs.view.updateState(result);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
@font-face {
  font-family: "iconfont";
  src: url("./assets/iconfont.woff?t=1588148113549") format("woff");
}
.iconfont {
  font-family: "iconfont" !important;
  /* font-size: 16px; */
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  list-style: none;
  margin: 0;
}
.ivu-slider-button-wrap .ivu-slider-button :hover{
  -webkit-transform: scale(1.5)
}
.ivu-slider-wrap .ivu-slider-button-wrap {
    top: -8px;
}
.ivu-slider-button-wrap .ivu-slider-button {
    width: 20px;
    height: 20px;

}
</style>
