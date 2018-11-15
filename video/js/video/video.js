define(['../util/common','hls'],function(common,Hls){
    var videoBarTime;
    var mouseFlag=1;
    var _top=80;
    var index=0;
    var $danmu=$("#danmu");
    var video=$('#video')[0];
    var islocking=1;
    var isnative=1;
    var up=0;
    var newurl="";
    var ajax;
    var theindex=new function(){
        this.list;
        this.play=function(url){
            islocking=1;
            up=0;
            newurl="";
            getvideoUrl(url,function(url){
                $('.progress .progress-bar:eq(1)').css("left","0%");
                video.preload="auto";
                if(url.indexOf(".m3u8")>0){
                    if(Hls.isSupported()) {
                        var hls = new Hls();
                        hls.loadSource(url);
                        hls.attachMedia(video);
                        hls.on(Hls.Events.MANIFEST_PARSED,function() {
                        video.play();
                    });
                     } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                        video.src = url;
                        video.addEventListener('loadedmetadata',function() {
                          video.play();
                        });
                      }
                }
                else{
                    video.src=url;
                    video.play();
            }
            });
        }
        this.playnext=function(){
            video.src="";
            if(this.list.length>1){
                this.list.splice(0,1);
                this.play(this.list[0].url);
            }
        }
        this.init=function(){
            banrightkey();
            bind();
        }
        this.debug=function(msg){
            console.log(msg);
            this.setMessageInnerHTML(msg);
        }
        this.setMessageInnerHTML=function(innerHTML){
            $span=$("<span id='"+index+"'>"+ innerHTML + "</span>");
            var _height = $danmu.height();
            var _left = $danmu.width();
            _top+=16;
            if(_top>_height-100) _top=10;
            $span.css({
                left:_left,
                top:_top,
                color:getRandomColor(),
                'white-space':'nowrap',
                position: "absolute"}
            );
            $danmu.append($span);
            launch($span);
        }
    };
    function banrightkey(){
        $('#video').bind('contextmenu',function() { return false; });
    }
    //绑定事件
    function bind(){
        $('#video').on({
            waiting:function(){
                theindex.debug("waiting");
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
                islocking=1;
                if(up<3){
                    videoStatu('','加载中');
                    up++;
                    api(newurl,function(url){
                        video.src=url;
                        $('.progress .progress-bar:eq(1)').css("left","0%");
                        video.preload="auto";
                        video.play();
                    });
                }
                else{
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
                theindex.debug("播放结束");
                videoStatu('','播放结束');
                //stopBuffer();
                theindex.playnext();
            },
            canplay:function(){
                islocking=0;
                theindex.debug("加载完成");
                //startBuffer();
                videoStatu('play');
            },
            play:function(){
                // theindex.debug("加载完成");
                // videoStatu('play');
            },
            loadstart:function(){
                $("#time-Current-Text").find("span:eq(0)").html("00:00");
                $("#time-Current-Text").find("span:eq(1)").html("00:00");
                $('.progress .progress-bar:eq(0)').width(0);
                $('.progress .progress-bar:eq(2)').width(0);
                videoStatu('',"正在加载");
                theindex.debug('start')
            },
            mousemove:function(){
                showVideoBar();
            },
            click:function(){
                if(islocking==1) return;
                togglePlay();
            },
            loadedmetadata:function(){
                theindex.debug("111111");
                captureImage();
            }
        });
        $(".videobtn").on({
            click:function(e){
                var ele=e.target;
                var type=$(ele).data("type");
                switch(type){
                    case 'play':
                        if(islocking==1) return;
                        togglePlay();
                        break;
                    case 'next':
                        theindex.playnext();
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
                if(islocking==1) return;
                video.pause();
                mouseFlag=0;
                
            },
            mousemove:function(e){
                //theindex.debug("move");
            },
            mouseenter:function(){
                $('.progress .progress-bar:eq(1)').show();
            },
            mouseleave:function(){
                $('.progress .progress-bar:eq(1)').hide();
            },
            mouseup:function(e){
                if(islocking==1) return;
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
                theindex.debug("over");
                hideVideoBar();
            }
        });
        $(document).on({
            mousemove:function(e){
                if(islocking==1) return;
                if(mouseFlag==0){
                    showrat(findSeeked(e));
                }
            },
            mouseup:function(e){
                if(islocking==1) return;
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
    function download(){
        var src=video.src;
        var $a = document.createElement('a');
		$a.setAttribute("href", src);
		$a.setAttribute("download", "");
		var evObj = document.createEvent('MouseEvents');
		evObj.initMouseEvent( 'click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
		$a.dispatchEvent(evObj);
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
        var width=0;
        if(video.buffered&&video.buffered.length>0){
            var buffered=video.buffered;
            theindex.debug(buffered.end(buffered.length-1));
            width=buffered.end(buffered.length-1)-seektime>0?buffered.end(buffered.length-1)-seektime:0;
        }
        $('.progress .progress-bar:eq(2)').css("width",width/video.duration*100+'%');
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
        theindex.debug("mousex:"+mousex);
        theindex.debug("videox"+videox);
        if(mousex>videox&&mousex<(videox+video.offsetWidth)){
            seektime=(mousex-videox)/video.offsetWidth*video.duration;
        }
        else if(mousex<videox){
            seektime=0;
        }
        else{
            seektime=video.duration;
        }
        theindex.debug(seektime);
        return seektime;
    }
    function launch($span)
    {
        var _left = $danmu.width();
        var time=10000;
        if(index%2==0)
            time=20000;
        $span.animate(
            {left:"-"+ _left+"px"},
            time,
            function(){
                $(this).remove();
            }); 
        index++;
    }
    function getRandomColor() {
        return '#' + (function(h) {return new Array(7 - h.length).join("0") + h})((Math.random() * 0x1000000 << 0).toString(16))
    }
    function getvideoUrl(url,callback){
        //abort();
        if(isnative==1){
            getdata(url,callback);
        }else{
            ajax=$.ajax({
                type:"post",
                url:serverurl+"/videoPaser",
                data:{txurl:url},
                success:function(data){
                    theindex.debug(data);
                    callback&&callback(data.data);
                },
                error:function(e){
                    theindex.debug(e);
                    videoStatu('','服务器出现了故障');
                }
            });
        }
        }
    function getdata(url,callback){
        //abort();
        ajax=$.ajax({
            type:"post",
            url:serverurl+"/getdata",
            data:{txurl:url},
            success:function(data){
                var result=data;
                if(result.code==200){
                    newurl=common.getQueryString(result.data,"url");
                    api(newurl,callback);
                }
                else{
                    videoStatu('',result.msg);
                }
            },
            error:function(e){
                theindex.debug(serverurl);
                videoStatu('','服务器出现了故障');
            }
        });
    }
    function api(url,callback){
        //abort();
        ajax=$.ajax({
            type:"post",
            url:serverurl+"/api",
            data:{url:url,
                up:up},
            success:function(data){
                var result=data;
                if(result.code==200){
                    callback&&callback(result.data);
                }
                else{
                    if(up<3){
                        up++;
                        api(url,callback);
                    }
                }
            },
            error:function(e){
                theindex.debug(e);
                videoStatu('','服务器出现了故障');
            }
        });
    }
    function abort(){
        try{
           ajax.abort(); 
        }
        catch(e){}
    }
    return theindex;
});
