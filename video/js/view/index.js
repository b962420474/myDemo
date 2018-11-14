define(['../video/video'],function(video){
var index=new function(){
    this.init=function(){
        loadhtml(".header","./header",function(){
            loadhtml(".content","./videoList",function(){
            
            });
        });
            //video.init();
            // video.list=[{
            //     url:'http://www.iqiyi.com/v_19rrdgiq8s.html'
            // },{
            //     url:'http://v.qq.com/x/cover/og0eputlxwet1cn.html'
            // }]
            // video.play(video.list[1].url);
    }
}

return index;
})