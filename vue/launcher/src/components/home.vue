<template>
    
            <div id="home">
                <div v-if="show" id="h_loading" class="home-loading"></div>
                <div v-else id="page-home" tabIndex="-1" class="content" @keydown="keydown($event)">
                <div class="" id="recommend-list">
                    <div class="two-recommend recommend">
                            <ul>
                                <li v-for="(item,index) in two" :key="item.id" :data-id="item.videoId" :data-index="index">
                                    <a><img :src="item.thumb_url"/>
                                        <div><span>{{item.title}}<span></span></span></div>
                                    </a>
                                </li>
                            </ul>
                    </div>
                    <div class="recommend-list recommend">
                            <ul>
                                <li v-for="(item,index) in recommend" :key="item.id" :data-id="item.videoId" :data-index="index">
                                    <a><img :src="item.thumb_url"/>
                                        <div><span>{{item.title}}<span></span></span></div>
                                    </a>
                                </li>
                            </ul>
                    </div>
                </div>
                <div class="zeansVideolist" id="megogo-list">
                    <div class="channelItem">
                        <div class="title-logo " style="background-image: url(./static/launcher3/img/megogo.png);"></div>
                        <h2 class="page-item-title">Recommend</h2>
                        <ul>
                        </ul>
                    </div>
                </div>
                <div class="zeansVideolist" id="ivi-list">
                        <div class="channelItem">
                            <div class="title-logo " style="background-image: url(./static/launcher3/img/app-ivi.png);"></div>
                            <h2 class="page-item-title">Recommend</h2>
                            <ul>
                            </ul>
                        </div>
                </div>

                <div class="zeansVideolist" id="yupptv-list">
                    <div class="channelItem">
                        <div class="title-logo " style="background-image: url(./static/launcher3/img/yupptv-logo.png);"></div>
                        <h2 class="page-item-title">Recommend</h2>
                        <ul>
                        </ul>
                    </div>
                </div>
                <div class="zeansVideolist" id="erosnow-list">
                        <div class="channelItem">
                            <div class="title-logo " style="background-image: url(./static/launcher3/img/erosnow-logo.png);"></div>
                            <h2 class="page-item-title">Recommend</h2>
                            <ul>
                            </ul>
                        </div>
                </div>


                <div class="videolist" id="video-list">
                    <div class="channelItem">
                        <h2 class="page-item-title">ABC NEWS</h2>
                        <ul>
                        </ul>
                    </div>
                </div>
                </div>
                
            </div>
</template>
<script>
import service from "../libs/service.js"
import bus from "../libs/eventBus.js"
import iServer from "../libs/iServer.js"
export default {
  data() {
      return {
          recommendList:[],
          recommendListIndex:2
      }
  },
  methods:{
      keydown(e){
          var self=this;
         console.log("activeid:" + document.activeElement.id);
            var $Focus = $("#page-home").find(".Focus");
            switch (iServer.global.KEY[e.keyCode]) {
                case 'right':
                    if($Focus.next().length>0){
                        $Focus.next().Focus()
                    }
                    else{
                        self.recommendListIndex<self.recommendList.length-4?self.recommendListIndex++:null;
                    }
                    break;
                case 'up':
                    $Focus.parent().parent().prev().find("li").first().Focus();
                    break;
                case 'down':
                    $Focus.parent().parent().next().find("li").first().Focus();
                    break;
                case 'left':
                    if($Focus.prev().length>0){
                        $Focus.prev().Focus()
                    }
                    else{
                        self.recommendListIndex>2?self.recommendListIndex--:null;
                    }
                    break;
                case 'return':
                    bus.$emit("activeElement","activeElement");
                    break;
            }
      },
  },
  computed:{
      
      two(){
          if(this.recommendList.length>=2){
              return this.recommendList.slice(0,2);
          }
      },
      recommend(){
          if(this.recommendList.length>=6){
              return this.recommendList.slice(this.recommendListIndex,this.recommendListIndex+4);
          }
      },
      show(){
          if(this.recommendList.length>0){
              return false;
          }
          else{
              return true;
          }
      }
  },
  created (){
      var self=this;
      bus.$on("pageFocus",(message)=>{
            if(self.recommendList.length<1){
                bus.$emit("activeElement","activeElement");
                return;
            }
            $("#page-home").focus();
            $("#recommend-list .two-recommend li").first().Focus();
        })
      service.getRecomand().then(function(data){
          console.log(data)
          if (data.code == 0) {
              self.recommendList=data.body.videos?data.body.videos:[];
            }
      })
  }
};
</script>

