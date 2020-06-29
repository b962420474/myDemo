<template>
    <div>
        <router-link class="back iconfont" tag="div" to="/">&#xe655;</router-link>
        <div class="item">
            <div>亮度调节</div>
            <Slider v-model="brightness" :tip-format="format" @on-change="setBrightness"></Slider></div>
         <div class="item">
             <div>音量调节</div>
             <Slider v-model="volume" :tip-format="format" @on-change="setVolume"></Slider></div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                brightness: 25,
                volume:45,
            }
        },
        created:function(){

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
</style>
