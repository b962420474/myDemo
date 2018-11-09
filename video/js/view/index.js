define(['../video/video'],function(video){
var index=new function(){
    this.init=function(){
            video.init();
            video.list=[{
                url:'http://www.runoob.com/try/demo_source/movie.mp4'
            },{
                url:'https://r1---sn-h5576n7k.googlevideo.com/videoplayback?requiressl=yes&mime=video%2Fmp4&txp=5531432&pl=24&ipbits=0&mn=sn-h5576n7k%2Csn-cvh76n7k&mm=31%2C26&ms=au%2Conr&ei=KEjlW7qjE5nPqQHr8Jz4DQ&sparams=dur%2Cei%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Cratebypass%2Crequiressl%2Csource%2Cexpire&mt=1541752760&expire=1541774472&signature=83E3BC911E34FFE186834EA63F59A0690BB8462F.847BDE746A667E65F7254497AC0171A12BCCDECA&initcwndbps=118750&key=yt6&ip=139.59.41.54&ratebypass=yes&lmt=1540870974535923&source=youtube&id=o-AIZ_1yN7b4dN5bk8oIsIxXSAsXpzY2PWZHVlncZ57p0J&itag=22&fvip=4&c=WEB&dur=6490.372&mv=m'
            }]
            video.play('http://www.runoob.com/try/demo_source/movie.mp4');
    }
}

return index;
})