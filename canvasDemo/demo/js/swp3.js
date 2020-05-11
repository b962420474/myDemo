(function ($, window) {
    var m = 0;
    var Y,moveEndX,moveEndY,startY;
    function bind() {
        $(".xl li").mousedown(function (e) {
            e.preventDefault();
            e.stopPropagation();
            var rq=$(this);
            console.log("start.....");
            $(this).mousemove(function (e) {
                e.preventDefault();
                e.stopPropagation();
                if(e.target===rq.find("i")[0]){
                    return;
                }
                moveEndX = e.offsetX;
                console.log("moveEndX:"+moveEndX);
                var x=rq.find(".process").width()
                moveEndX=moveEndX>x?x:moveEndX;
                var width=moveEndX/x*100;
               // rq.find(".process p").css("width",width+"%");
                rq.find(".process i").css("left",width+"%");
            })
        }).mouseup(function () {
            console.log("end.....");
            $(this).off("mousemove");
        })

        $(".xl").mousedown(function (e) {
            var translateY = getTranslate($(this)[0], "y");
            e.preventDefault();
            e.stopPropagation();
            startY = e.pageY;
            $(this).mousemove(function (e) {
                e.preventDefault();
                e.stopPropagation();
                moveEndY = e.pageY;
                Y = moveEndY - startY;
                var length = translateY;
                length += Y;
                console.log("jsh:" + length);
                if (length >= 0) {
                    length = 0;
                }
                else if (length <= -450) {
                    length = -450;
                }
                console.log("length:" + length);
                $(this).css({ '-webkit-transform': 'translateY(' + length + 'px)','transition': 'all 0s'});
                m = length;
            })
        }).mouseup(function (e) {
            $(this).off("mousemove");
            var length=-450;
            if(e.pageY-startY>100) length=0;
            if(e.pageY-startY<-100) length=-450;
            console.log("length:" + length);
            $(this).css({ '-webkit-transform': 'translateY(' + length + 'px)', 'transition': 'all 0.3s' });
        })
    }
    function init() {
    }
    window.swp3 = function () {
        bind();
        init();
    }
})($, window)