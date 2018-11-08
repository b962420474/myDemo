define(['common'],function(common){
    var videoBarTime;
    var mouseFlag=1;
    var video=$('#video')[0];
    
    var theindex=new function(){
        this.init=function(){
            // getvideoUrl(function(url){
            //     video.src=url;
            //     testdanmu();
            // });
            video.src="https://r2---sn-oguesnze.googlevideo.com/videoplayback?c=WEB&expire=1541682656&dur=6878.958&mn=sn-oguesnze%2Csn-i3b7kn7z&mm=31%2C26&ipbits=0&id=o-AAvkUGp59loLMe6FoDSUVrBYAZe1zWDWsJQ3MMJeBHJ3&sparams=dur%2Cei%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Cratebypass%2Crequiressl%2Csource%2Cexpire&mv=m&mt=1541660931&ms=au%2Conr&ip=27.102.112.109&lmt=1520393037276853&signature=9642FD9F7BDB4E5F397F028379631344346E29B2.2841BA3AFFDC1D5A7752EC3D31890137CA6648A4&ratebypass=yes&itag=22&ei=gOHjW7GJJYatqQGkx7yICA&fvip=2&pl=24&source=youtube&key=yt6&mime=video%2Fmp4&requiressl=yes&initcwndbps=3378750";
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
                    videoStatu('','不支持该类型');
                }else if(video.error.code==3){
                    videoStatu('','解码失败');
                }
                else if(video.error.code==2){
                    videoStatu('','网络错误');
                }
                else if(video.error.code==1){
                    videoStatu('','');
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
            canplay:function(){
                common.debug("加载完成");
                videoStatu('play');
            },
            play:function(){
                // common.debug("加载完成");
                // videoStatu('play');
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
                    case 'voice':
                        togglevoice(ele);
                        break;
                    case 'download':
                    download(video.src,null,"video/webm");
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
        $(document).on({
            mousemove:function(e){
                if(mouseFlag==0){
                    showrat(findSeeked(e));
                }
            },
            mouseup:function(e){
                if(mouseFlag==0){
                    seek(findSeeked(e));
                }
                mouseFlag=1;
            },
            dragstart : function() {
                return false;
            },
            webkitfullscreenchange: function() {
                if(document.webkitIsFullScreen){
                    $('button[data-type="pull"]').html("&#xe602;");
                    $('.video').addClass("full");
                }
                else{
                    $('.video').removeClass("full");
                    $('button[data-type="pull"]').html("&#xe64e;");
                }
            }
        });
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
    }
    function togglePlay(){
        if(video.readyState != 4) return;
            if(video.paused){
                video.play();
            }else{
                video.pause();
            }
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
        if(document.webkitIsFullScreen){
            exitFullscreen(ele);
        }
        else{
            FullScreen(ele);
        }
    }
    function togglevoice(ele){
        if(video.muted){
            video.muted=false;
            $(ele).html('&#xe644;');
        }
        else{
            video.muted=true;
            $(ele).html('&#xe623;');
        }
    }
    // function download(){
    //     window.open(video.src);
    //     //window.location.href=video.src;
    // }
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
    }
    //退出全屏
    function exitFullscreen(ele) {
        var de = document;
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
