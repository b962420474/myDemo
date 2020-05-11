(function ($, window) {
    var m = 0;
    function bind() {
        $(".rq").mousedown(function (e) {
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
                rq.find(".process p").css("width",width+"%");
                rq.find(".process i").css("left",width+"%");
            })
        }).mouseup(function () {
            console.log("end.....");
            $(this).off("mousemove");
        })

        $(".swp2").mousedown(function (e) {
            var translateY = getTranslate($(".swp2")[0], "y");
            e.preventDefault();
            e.stopPropagation();
            startX = e.pageX;
            startY = e.pageY;
            $(this).mousemove(function (e) {
                e.preventDefault();
                e.stopPropagation();
                moveEndX = e.pageX;
                moveEndY = e.pageY;
                X = moveEndX - startX;
                Y = moveEndY - startY;
                var length = translateY;
                length += Y;
                console.log("jsh:" + length);
                if (length >= 50) {
                    length = 50;
                }
                else if (length <= -($(".swp2").height()-420)) {
                    length = -($(".swp2").height()-420);
                }
                console.log("length:" + length);
                $(this).css({ '-webkit-transform': 'translateY(' + length + 'px)','transition': 'all 0s'});
                m = length;
            })
        }).mouseup(function () {
            $(this).off("mousemove");
            var length=m;
            if (length >=0) {
                length = 0;
            }
            else if (length <= -($(this).height()-480)) {
                length = -($(this).height()-480);
            }
            console.log("length:" + length);
            $(this).css({ '-webkit-transform': 'translateY(' + length + 'px)', 'transition': 'all 0.3s' });
        })
    }
    window.swp2 = function () {
        bind();
    }
})($, window)