<template>
    <div>
        <router-link class="back iconfont" tag="div" to="/">&#xe655;wifi</router-link>
        <div class="wifiSwitch"><div class="ititile">使用wifi</div><i-switch v-model="switch1" class="switch" @on-change="change" /></div>
        <item :item="connectWifi" v-show="connectWifi.ssid" class="connectwifi"></item>
        <h2 class="tit">附近wifi</h2>
        <div class="wifilist" v-show="switch1">
            <item v-for="item in wifiList" :key="item.ssid" :item="item" @openInput="openInput"></item>
            <div class="demo-spin-container" v-if="isLoading">
                <!-- <Spin size="large" fix></Spin> -->
                <Loading></Loading>
            </div>
        </div>
        <div class="btn">
            <div @click="refesh()"><span class="iconfont refesh">&#xe638;</span></div>
        </div>
        <wifi-input ref="wifiinput"></wifi-input>
    </div>
</template>
<script>
import WifiInput from "./components/WifiInput"
import item from "./components/item"
import Loading from "@/components/Loading"
export default {
    components:{WifiInput,item,Loading},
    data(){
        return {
            wifiList:[],
            timer:false,
            switch1:false,
            isLoading:false,
            connectWifi:{},
        }
    },
    created:function(){

    },
    destroyed:function(){
        //this.clear();
    },
    methods:{
        openInput(item){
            if(item.encrypt){
                this.$refs.wifiinput.openInput(true,item.ssid);
            }
            else{
                this.plugin.connect(item.ssid,'');
            }
        },
        refesh:function(){
            if(this.switch1){
                this.isLoading=true;
                this.wifiList.splice(0,this.wifiList.length);
                this.plugin.StartScan();
            }
        },
        change (status) {
            if(status){
                this.refesh();
            }else{
                this.connectWifi={};
                this.plugin.Disconnect();
            }
        },
        WifiScanFinish:function(data){
            this.isLoading=false;
            if(data.length<1){
                this.$Message.success('周围暂无wifi');
            }else{
                this.wifiList=data;
            }
        },
        clear(){
            clearTimeout(this.timer);
        },
        updateState(data){
            this.wifiList.forEach((element,index) => {
                if(element.ssid===data.ssid){
                    if(data.state==1){
                        //this.wifiList[index].state=1;
                        this.connectWifi=JSON.parse(JSON.stringify(this.wifiList[index]));
                        this.connectWifi.state=1;
                    }
                    else{
                        //this.wifiList[index].state=data.errnum;
                        this.connectWifi={};
                    }
                }
            });
            console.log(this.wifiList);
        }
    }
}
</script>
<style scoped>
.back{
    text-align: left;
    font-size: 30px;
    height: 10%;
}
.wifiSwitch{
    min-width: 400px;
    max-width: 800px;
    margin: 0 10px;
    position: relative;
    background: #009688;
    height: 10%;
    display: -webkit-flex;
    min-height: 30px;
    max-height: 50px;
    -webkit-justify-content: space-between;
}
.connectwifi{
    min-width: 400px;
    max-width: 800px;
    margin: 0 10px;
    height: 8%;
    position: relative;
}
.ititile{
    font-size: 30px;
}
.switch{
    right: 10px;
    transform: translateY(-50%);
    top: 50%;
    position: absolute;
}
.tit{
    height: 5%;
}
.wifilist {
  min-width: 400px;
  max-width: 800px;
  margin: 0 10px;
  position: relative;
  height: 65%;
  max-height: 500px;
  overflow-y: auto;
}
@media screen and (max-width:800px){
    .wifilist {
        max-height: 370px;
    }
}
.demo-spin-container{
    display: inline-block;
    width: 100%;
    height: 300px;
    position: relative;
}
.btn{
    height: 12%;
    display: -webkit-flex;
    width: 100%;
    margin: auto;
    position: absolute;
    bottom: 1px;
    -webkit-justify-content: center;
}
.btn .refesh{
    font-size: 30px;
}
.wifilist::-webkit-scrollbar {display:none}
</style>

