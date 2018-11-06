define(function(){
    var videoBarTime;
    var videoTipTime;
    var mouseFlag=1;
    var $danmu=$("#danmu");
    var video=$('#video')[0];
    var _top=80;
    var index=0;
    var theindex=new function(){
        this.init=function(){
            getvideoUrl(function(url){
                video.src=url;
                testdanmu();
            });
            banrightkey();
            bind();
        }
    };
    function banrightkey(){
        $('#video').bind('contextmenu',function() { return false; });
    }
    function bind(){
        $('#video').on({
            waiting:function(){
                console.log("waiting");
                videoStatu('',"正在加载");
            },
            playing:function(){
                videoStatu('');
                $("#play").html("&#xe6a9;");
            },
            pause:function(){
                if(video.readyState==4){
                    $("#play").html("&#xe615;");
                    //videoStatu('pause');
                    showVideoBar();
                }
            },
            error:function(){
                if(video.error.code==4){
                    videoStatu('','该视频不能播放');
                }
            },
            timeupdate:function(){
                var vLength = video.duration;
                var vTime =  video.currentTime;
                $("#time-Current-Text").find("span:eq(0)").text(timeFormat(vTime));
                $("#time-Current-Text").find("span:eq(1)").text(timeFormat(vLength));
                showrat(vTime);
            },
            ended:function(){
                console.log("播放结束");
                videoStatu('','播放结束');
            },
            play:function(){
                console.log("加载完成");
                videoStatu('play');
            },
            loadstart:function(){
                $("#time-Current-Text").find("span:eq(0)").html("00:00");
                $("#time-Current-Text").find("span:eq(1)").html("00:00");
                $('.progress .progress-bar:eq(0)').width(0);
                videoStatu('',"正在加载");
                console.log('start')
            },
            mousemove:function(){
                showVideoBar();
            },
            click:function(){
                togglePlay();
            },
            loadedmetadata:function(){
                console.log("111111");
                captureImage();
            }
        });
        $(".videobtn").on({
            click:function(e){
                var ele=e.target;
                var type=$(ele).data("type");
                switch(type){
                    case 'play':
                        togglePlay();
                        break;
                    case 'next':
                        //togglePlay();
                        break;
                     case 'danmu':
                        toggleDanmu(ele);
                        break;
                    case 'pull':
                        toggleScreen(ele);
                        break;
                }
            }
        });
        $(".pro").on({
            mousedown:function(e){
                video.pause();
                mouseFlag=0;
                
            },
            mousemove:function(e){
                //console.log("move");
            },
            mouseenter:function(){
                $('.progress .progress-bar:eq(1)').show();
            },
            mouseleave:function(){
                $('.progress .progress-bar:eq(1)').hide();
            },
            mouseup:function(e){
                if(mouseFlag==0){
                    seek(findSeeked(e));
                }
                mouseFlag=1;
                e.stopPropagation();
            }

        });
        $("#video-bar").on({
            mouseenter:function(){
                showVideoBar(true);
            },
            mouseleave:function(){
                hideVideoBar();
            }
        });
        document.onmousemove=function(e){
                if(mouseFlag==0){
                    showrat(findSeeked(e));
                }
            };
        document.onmouseup=function(e){
                if(mouseFlag==0){
                    seek(findSeeked(e));
                }
                mouseFlag=1;
            }
        document.ondragstart = function() {
            return false;
        };
    }
    function videoStatu(statu,msg){
        var html = '';
        if(statu){
            switch(statu){
                case 'loading':
                html+='<div class="video-loading"></div>';
                break;
                case 'pause':
                html+='<div class="iconfont">&#xe6cc;</div>';
                break;
                case 'play':
                html+='<div class="iconfont">&#xe600;</div>';
                break;
                case 'seek-forward':
                html+='<div class="iconfont">&#xe63c;</div>';
                break;
                case 'seek-back':
                html+='<div class="iconfont">&#xe652;</div>';
                break;
                case 'error':
                html+='<div class="iconfont">&#xe638;</div>';
                break;
                case 'info':
                html+='<div class="iconfont"></div>';
                break;
            }
        }
        if(msg){
            html+='<p>'+msg+'</p>';
        }
        $('#video-zhezhao').html(html).show();
        // if(statu){
        //     clearTimeout(videoTipTime);
        //     videoTipTime=setTimeout(function(){
        //         $('#video-zhezhao').hide();
        //     },500);
        // }
    }
    function tipClose(){

    }
    function togglePlay(){
        if(video.readyState != 4) return;
            if(video.paused){
                video.play();
            }else{
                video.pause();
            }
    }
        /**
     * 时间格式化
     */
    function timeFormat(o){ 
        var time_L;
        var o = Math.ceil(o);
        var r = "";
        var h = PrefixInteger(parseInt(o/3600),2);
        var m = PrefixInteger(parseInt((o%3600)/60),2);
        var S = PrefixInteger((o%3600)%60,2);
        if(h !== '00'){
            r += h+":";
        }
        r += m+":";
        r += S;
        return r;
    }
    function PrefixInteger(num, length) {
        return (Array(length).join('0') + num).slice(-length);
    }
    function toggleDanmu(ele){
        if($(ele).hasClass("open")){
            $("#danmu").hide();
            $(ele).removeClass("open");
            $(ele).html("&#xe618;");
        }
        else{
            $("#danmu").show();
            $(ele).addClass("open");
            $(ele).html("&#xe617;");
        }
    }
    function toggleScreen(ele){
        if($('.video').hasClass("full")){
            exitFullscreen(ele);
        }
        else{
            FullScreen(ele);
        }
    }
    //进入全屏
    function FullScreen(ele) {
        var v = $('.video')[0];
        if (v .requestFullscreen) {
            v .requestFullscreen();
        } else if (v .mozRequestFullScreen) {
            v .mozRequestFullScreen();
        } else if (v .webkitRequestFullScreen) {
            v .webkitRequestFullScreen();
        }
        $(ele).html("&#xe602;");
        $('.video').addClass("full");  
    }
    //退出全屏
    function exitFullscreen(ele) {
        var de = document;
        $('.video').removeClass("full");
        $(ele).html("&#xe64e;");
        if (de.exitFullscreen) {
            de.exitFullscreen();
        } else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen();
        } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen();
        }
    }
    function showVideoBar(flag){
        clearTimeout(videoBarTime);
        $("#video-bar").show();
        if(video.paused) return;
        if(flag) return;
        videoBarTime=setTimeout(function(){
            $("#video-bar").hide();
        },3500);
    }
    function hideVideoBar(){
        if(video.paused) return;
        $("#video-bar").hide();
    }
    function seek(seektime){
        showrat(seektime);
        video.currentTime=seektime;
        video.play();
    }
    function showrat(seektime){
        $('.progress .progress-bar:eq(0)').width((seektime/video.duration)*100+"%");
        $('.progress .progress-bar:eq(1)').css("left",(seektime/video.duration)*100+"%");
    }
    var captureImage = function() {
        var canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

        var img = document.createElement("img");
        img.setAttribute('crossorigin', 'anonymous');
        img.src = canvas.toDataURL("image/png");
    };
    function isIn(arry){
        var flag=false;
        for(var i=0;i<arry.length;i++){
            if(arry[i].className=="video"){
                flag=true;
                break; 
            }
        }
        return flag;
    }
    function findSeeked(e){
        var seektime=0;
        console.log(e.offsetX);
        if(e.offsetX==6){
            console.log(e);
        }
        if(e.offsetX>video.offsetWidth){
            seektime=video.duration;
        }
        else if(!e.path||isIn(e.path)){
            seektime=e.offsetX/video.offsetWidth*video.duration;
        }
        else{
            seektime=0;
        }
        console.log(seektime);
        return seektime;
    }
    function getvideoUrl(callback){
        $.ajax({
            type:"post",
            url:"http://127.0.0.1:8080/videoPaser",
            data:{txurl:"https://v.qq.com/x/cover/z6j3ixjjcokafyc.html"},
            success:function(data){
                console.log(data);
                callback&&callback(data.data);
            },
            error:function(e){
                console.log(e);
            }
        });
    }
    function testdanmu(){
        for(var i=0;i<50;i++){
            setMessageInnerHTML("你好"+i);
        }
    }
    function setMessageInnerHTML(innerHTML){
        $danmu.append("<span id='"+index+"'>"+ innerHTML + "</span>");
        launch();
        //show(innerHTML);
        }
    function launch()
    {
    var _height = $danmu.height();
    var _left = $danmu.width() - $("#"+index).width();
    var time=10000;
    if(index%2==0)
        time=20000;
        _top+=80;
    if(_top>_height-100)
        _top=80;
        $("#"+index).css({
            left:_left,
            top:_top,
            color:getRandomColor(),
            position: "absolute"}
        );
         $("#"+index).animate(
            {left:"-"+_left+"px"},
            time,
            function(){
                //_left+=10;
                }); 
        index++;
    }
    function getRandomColor() {
        return '#' + (function(h) {return new Array(7 - h.length).join("0") + h})((Math.random() * 0x1000000 << 0).toString(16))
        }
    return theindex;
});
