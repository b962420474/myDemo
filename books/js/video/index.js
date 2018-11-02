define(function(){
    var video=$('#video')[0];
    var index=new function(){
        this.init=function(){
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
                videoStatu('loading');
            },
            playing:function(){

            },
            pause:function(){

            },
            error:function(){

            },
            timeupdate:function(){
                var vLength = video.duration;
                var vTime =  video.currentTime;
                $("#time-Current-Text").find("span:eq(0)").text(timeFormat(vTime));
                $("#time-Current-Text").find("span:eq(1)").text(timeFormat(vLength));
                $('.progress .progress-bar').width((vTime/vLength)*100+"%");
            },
            ended:function(){

            },
            seeked:function(){

            },
            loadstart:function(){
                $("#time-Current-Text").find("span:eq(0)").html("00:00");
                $("#time-Current-Text").find("span:eq(1)").html("00:00");
                $('.progress .progress-bar').width(0);
                console.log('start')
            },
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
                        togglePlay();
                        break;
                     case 'danmu':
                        togglePlay();
                        break;
                    case 'pull':
                        togglePlay();
                        break;
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
                html+='<div class="iconfont">&#xe8b8;</div>';
                break;
                case 'play':
                html+='<div class="iconfont">&#xe603;</div>';
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
            if(msg){
                html+='<p>'+msg+'</p>';
            }
        }
        $('#video-zhezhao').html(html).show();
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
    return index;
});
