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
    }
    function showTip(){

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
    return index;
});
