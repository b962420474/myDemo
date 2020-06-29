<template>
    <div>
        <router-link class="back iconfont" tag="div" to="/">&#xe655;</router-link>
        <div class="wifilist">
            <item v-for="item in wifiList" :key="item.name" :item="item" @openInput="openInput"></item>
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
export default {
    components:{WifiInput,item},
    data(){
        return {
            wifiList:[]
        }
    },
    created:function(){
        this.wifiList=this.plugin.getWifiList().map(element => {
            element.state=1;
            return element
        });
        console.log(this.plugin);
    },
    methods:{
        openInput(item){
            if(item.encryption){
                this.$refs.wifiinput.openInput(true,item.name);
            }
            else{
                this.plugin.connect(item.name);
            }
        },
        refesh:function(){
            this.wifiList=this.plugin.getWifiList().map(element => {
                element.state=1;
                return element
            });
        }
    }
}
</script>
<style scoped>
.back{
    text-align: left;
    font-size: 30px;
    height: 10%;
    width: 50px;
}
.wifilist {
  min-width: 400px;
  max-width: 800px;
  margin: auto;
  position: relative;
  height: 78%;
  max-height: 500px;
  overflow-y: auto;
}
.btn{
    height: 12%;
    display: -webkit-flex;
    min-width: 400px;
    max-width: 800px;
    margin: auto;
    position: relative;
    -webkit-justify-content: center;
}
.btn .refesh{
    font-size: 30px;
}
.wifilist::-webkit-scrollbar {display:none}
</style>

