define(['common'],function(common){
    var videoBarTime;
    var videoTipTime;
    var mouseFlag=1;
    var video=$('#video')[0];
    
    var theindex=new function(){
        this.init=function(){
            // getvideoUrl(function(url){
            //     video.src=url;
            //     testdanmu();
            // });
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
                common.debug("waiting");
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
                common.debug("播放结束");
                videoStatu('','播放结束');
            },
            play:function(){
                common.debug("加载完成");
                videoStatu('play');
            },
            loadstart:function(){
                $("#time-Current-Text").find("span:eq(0)").html("00:00");
                $("#time-Current-Text").find("span:eq(1)").html("00:00");
                $('.progress .progress-bar:eq(0)').width(0);
                videoStatu('',"正在加载");
                common.debug('start')
            },
            mousemove:function(){
                showVideoBar();
            },
            click:function(){
                togglePlay();
            },
            loadedmetadata:function(){
                common.debug("111111");
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
                //common.debug("move");
            },
            mouseenter:function(){
                $('.progress .progress-bar:eq(1)').show();
            },
            mouseleave:function(){
                $('.progress .progress-bar:eq(1)').hide();
            },
            mouseup:function(e){
                seek(findSeeked(e));
                mouseFlag=1;
                //e.stopPropagation();
            }

        });
        $("#video-bar").on({
            mouseenter:function(){
                showVideoBar(true);
            },
            mouseleave:function(){
                common.debug("over");
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
    function findSeeked(e){
        var seektime=0;
        var mousex=e.screenX;
        var videox=common.GetObjPos(video)['x'];
        common.debug("mousex:"+mousex);
        common.debug("videox"+videox);
        if(mousex>videox&&mousex<(videox+video.offsetWidth)){
            seektime=(mousex-videox)/video.offsetWidth*video.duration;
        }
        else if(mousex<videox){
            seektime=0;
        }
        else{
            seektime=video.duration;
        }
        common.debug(seektime);
        return seektime;
    }
    function getvideoUrl(callback){
        $.ajax({
            type:"post",
            url:serverurl+"/videoPaser",
            data:{txurl:"https://v.qq.com/x/cover/z6j3ixjjcokafyc.html"},
            success:function(data){
                common.debug(data);
                callback&&callback(data.data);
            },
            error:function(e){
                common.debug(e);
            }
        });
    }
    return theindex;
});
