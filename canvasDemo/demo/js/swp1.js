(function ($, window) {
    var translateX = getTranslate($(".swp1")[0], "x");
    var m = 0;
    var f = false;
    var offset = $(".swp1 li:not(.swp1_active)").first().outerWidth(true);
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
                var $div = $(".swp1_active");
                if (X >= offset) {
                    X = offset;
                }
                else if (X <= -offset) {
                    X = -offset;
                }
                console.log("x:" + X + ", bds:" + (-offset / 2));
                console.log("csz:" + translateX);
                if (!f && X >= offset / 2) {
                    f = true;
                    $div.prev().length > 0 ? ($div.removeClass("swp1_active").prev().addClass("swp1_active"), length = length + offset) : "";
                    console.log("right:" + offset);
                }
                else if (f && X >= offset / 2) {
                    return;
                } else if (!f && X <= -(offset / 2)) {
                    f = true;
                    $div.next().length > 0 ? ($div.removeClass("swp1_active").next().addClass("swp1_active"), length = length - offset) : "";
                    console.log("translateX:" + offset);
                }
                else if (f && X <= -(offset / 2)) {
                    return;
                } else {
                    console.log(".....");
                    length += X;
                }
                length=(length >= 0) ? 0 : length;
                console.log("length:" + length);
                $(this).css({ '-webkit-transform': 'translate3d(' + length + 'px,-50%,0)', 'transition': 'all 0.3s linear 0.1s' });
                m = length;
            })
        }).mouseup(function () {
            $(this).off("mousemove");
            if (f) {
                f = false;
                translateX = m;
                console.log("jsz:" + translateX);
                return;
            }
            console.log("end.....");
            var length = translateX;
            if (X >= 50) {
                $(".swp1_active").prev().length > 0 ? ($(".swp1_active").removeClass("swp1_active").prev().addClass("swp1_active"), length = length + $(".swp1_active").outerWidth(true)) : "";
            } else if (X <= -50) {
                $(".swp1_active").next().length > 0 ? ($(".swp1_active").removeClass("swp1_active").next().addClass("swp1_active"), length = length - $(".swp1_active").outerWidth(true)) : "";
                ;
            }
            console.log("length:" + length);
            $(this).css({ '-webkit-transform': 'translate3d(' + length + 'px,-50%,0)', 'transition': 'all 0.3s linear 0.1s' });
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