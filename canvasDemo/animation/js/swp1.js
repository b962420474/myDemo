(function ($, window) {
    var translateX = getTranslate($(".swp1")[0], "x");
    var m = 0;
    function bind() {
        $(".swp1").mousedown(function (e) {
            e.preventDefault();
            startX = e.pageX;
            startY = e.pageY;
            $(this).mousemove(function (e) {
                e.preventDefault();
                moveEndX = e.pageX;
                moveEndY = e.pageY;
                X = moveEndX - startX;
                Y = moveEndY - startY;
                var length = translateX;
                length += X;
                console.log("jsh:" + length);
                if (length >= 100) {
                    length = 100;
                }
                else if (length <= -($(".swp1").width()-700)) {
                    length = -($(".swp1").width()-700);
                }
                console.log("length:" + length);
                $(this).css({ '-webkit-transform': 'translate3d(' + length + 'px,-50%,0)','transition': 'all 0s'});
                m = length;
            })
        }).mouseup(function () {
            $(this).off("mousemove");
            var length=m;
            if (length >=0) {
                length = 0;
            }
            else if (length <= -($(".swp1").width()-800)) {
                length = -($(".swp1").width()-800);
            }
            console.log("length:" + length);
            $(".swp1").css({ '-webkit-transform': 'translate3d(' + length + 'px,-50%,0)', 'transition': 'all 0.3s' });
            translateX = length;
        })

        $(".swp1").on("touchstart",function (e) {
            e.preventDefault();
            e=e.touches[0]
            startX = e.pageX;
            startY = e.pageY;
            $(this).on("touchmove",function (e) {
                e.preventDefault();
                e=e.touches[0];
                moveEndX = e.pageX;
                moveEndY = e.pageY;
                X = moveEndX - startX;
                Y = moveEndY - startY;
                var length = translateX;
                length += X;
                console.log("jsh:" + length);
                if (length >= 100) {
                    length = 100;
                }
                else if (length <= -($(".swp1").width()-700)) {
                    length = -($(".swp1").width()-700);
                }
                console.log("length:" + length);
                $(this).css({ '-webkit-transform': 'translate3d(' + length + 'px,-50%,0)','transition': 'all 0s'});
                m = length;
            })
        }).on("touchend",function () {
            $(this).off("touchmove");
            var length=m;
            if (length >=0) {
                length = 0;
            }
            else if (length <= -($(".swp1").width()-800)) {
                length = -($(".swp1").width()-800);
            }
            console.log("length:" + length);
            $(this).css({ '-webkit-transform': 'translate3d(' + length + 'px,-50%,0)', 'transition': 'all 0.3s' });
            translateX = length;
        })
    }
    function getTranslate(node,sty){//获取transform值
        var translates=document.defaultView.getComputedStyle(node,null).webkitTransform.substring(7);
        var result = translates.match(/\(([^)]*)\)/);// 正则()内容
        var matrix=result?result[1].split(','):translates.split(',');
        if(sty=="x" || sty==undefined){
            return matrix.length>6?parseFloat(matrix[12]):parseFloat(matrix[4]);
        }else if(sty=="y"){
            return matrix.length>6?parseFloat(matrix[13]):parseFloat(matrix[5]);
        }else if(sty=="z"){
            return matrix.length>6?parseFloat(matrix[14]):0;
        }else if(sty=="rotate"){
            return matrix.length>6?getRotate([parseFloat(matrix[0]),parseFloat(matrix[1]),parseFloat(matrix[4]),parseFloat(matrix[5])]):getRotate(matrix);
        }
    }
    function getRotate(matrix){
        var aa=Math.round(180*Math.asin(matrix[0])/ Math.PI);
        var bb=Math.round(180*Math.acos(matrix[1])/ Math.PI);
        var cc=Math.round(180*Math.asin(matrix[2])/ Math.PI);
        var dd=Math.round(180*Math.acos(matrix[3])/ Math.PI);
        var deg=0;
        if(aa==bb||-aa==bb){
            deg=dd;
        }else if(-aa+bb==180){
            deg=180+cc;
        }else if(aa+bb==180){
            deg=360-cc||360-dd;
        }
        return deg>=360?0:deg;
    
    }
    window.swp1 = function () {
        bind();
    }
    window.getTranslate=getTranslate;
})($, window)