define(['video'],function(video){
var index=new function(){
    this.init=function(){
            video.init();
            video.list=[{
                url:'http://www.iqiyi.com/v_19rrdgiq8s.html'
            },{
                url:'https://v.qq.com/x/cover/rpup19lfbuf2skc/x0028yz902j.html'
            }]
            video.play(video.list[1].url);
    }
}

return index;
})