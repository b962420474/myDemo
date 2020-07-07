<template>
    <div>
        <router-link class="back iconfont" tag="div" to="/">&#xe655;</router-link>
        <div class="item">
            <div class="iconfont icon">&#xe63b;</div>
            <Slider v-model="brightness" :tip-format="format" @on-change="setBrightness"></Slider></div>
         <div class="item" >
             <div class="iconfont icon" @click="switchVolume">{{switch1?'&#xe732;':'&#xe73c;'}}</div>
             <Slider v-model="volume" :tip-format="format" @on-change="setVolume"></Slider></div>
         <audio preload="auto" src="./static/call.mp3" controls style="margin:20px"></audio>
        </div>
</template>
<script>
    export default {
        data () {
            return {
                brightness: 25,
                volume:45,
                lastVolume:0,
                switch1:true
            }
        },
        created:function(){
            this.volume=this.plugin.el.volume?this.plugin.el.volume:this.volume;
            console.log("volume:"+this.volume);
        },
        methods: {
            format (val) {
                return '' + val + '%';
            },
            hideFormat () {
                return null;
            },
            setBrightness(val){
                this.plugin.setBrightness(val)
                console.log(val);
            },
            setVolume(val){
                this.plugin.setVolume(val)
                console.log(val);
            },
            switchVolume(){
                if(this.switch1){
                    this.switch1=false;
                    this.lastVolume=this.volume;
                    this.volume=0;
                }
                else{
                    this.switch1=true;
                    this.volume=this.lastVolume;
                }
                this.plugin.setVolume(this.volume)
            }
        }
    }
</script>
<style scoped>
.item{
    text-align: left;
    width: 90%;
    margin: 30px auto;
    max-width: 1100px;
}
.back{
    text-align: left;
    font-size: 30px;
    height: 10%;
    width: 50px;
}
.icon{
    font-size: 30px;
}
</style>
