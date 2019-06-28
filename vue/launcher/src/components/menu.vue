<template>
  <div id="menu" @keydown="keydown($event)" tabIndex="-1" @focus="focus($event)">
    <ul class>
      <li class="searchIcon" data-type="frame" data-url="search">
        <div class="iconfont iconsearch1"></div>
      </li>
      <li class="iconfont iconhome" data-type="frame" data-url="home"></li>
      <li class="iconfont iconapplication" data-type="frame" data-url="app"></li>
      <li class="iconfont icontou" data-type="frame" data-url="cast"></li>
      <li class="iconfont iconHistory" data-type="frame" data-url="history"></li>
      <li class="iconfont iconshezhi1" data-type="frame" data-url="setting"></li>
    </ul>
  </div>
</template>
<script>
import $ from "jquery"
import iServer from "../libs/iServer.js"
import bus from "../libs/eventBus.js"
export default {
    data(){
        return {}
    },
    methods:{
        focus(){
            console.log("获取焦点")
        },
      keydown(e){
         console.log("activeid:" + document.activeElement.id);
            var $Focus = $("#menu").find(".Focus");
            if ($Focus.length < 1) return;
            switch (iServer.global.KEY[e.keyCode]) {
                case 'right':
                    $Focus.addClass("mark");
                    this.pageFocus();
                    break;
                case 'up':
                    if ($Focus.prev().length > 0) {
                        this.openContent($Focus.prev());
                        $Focus.prev().Focus();
                    }
                    break;
                case 'down':
                    if ($Focus.next().length > 0) {
                        this.openContent($Focus.next());
                        $Focus.next().Focus();
                    }
                    break;
            }
            if (e.keyCode == 27) {
                console.log("exit launcher");
                window.close();
            }
      },
      openContent($Focus){
        this.$router.push({ path: "/"+$Focus.data("url")});
      },
      pageFocus(){
          bus.$emit("pageFocus","pageFocus");
      }
    },
    created(){
        bus.$on("activeElement",(message)=>{
            $("#menu .mark").removeClass("mark").Focus();
            $("#menu").focus();
        })
    },
    mounted (){
      console.log("menu 挂载");
      $("#menu li").first().next().Focus();
      $("#menu").focus();
    }
}
</script>

