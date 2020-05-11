(function ($, window) {
    var startX,X;
    function bind() {
        $(".swp1").mousedown(function (e) {
            e.preventDefault();
            e.stopPropagation();
            startX = e.pageX;
            $(this).mousemove(function (e) {
                e.preventDefault();
                e.stopPropagation();
                moveEndX = e.pageX;
                X = moveEndX - startX;
                if(Math.abs(e.pageX-startX)<50){
                    return;
                }
                var li1=$(this).find(".active");
                var li2=li1.next();
                if(X<0&&li2.next().length>0){
                    $(".swp1").css({"-webkit-justify-content":"flex-start"});
                    var c=-Math.PI/1600*X;
                    li1.css({'-webkit-transform': 'rotateX(10deg) rotateY('+(9/80*X)+'deg) rotateZ(0deg)', 'transition': 'all 0s' });
                    li1.css({ '-webkit-transform-origin': '0px center'});
                    li2.css({'-webkit-transform': 'rotateX(-5deg) rotateY('+(9/80*X)+'deg) rotateZ(0deg)', 'transition': 'all 0s'});
                    li2.css({ '-webkit-transform-origin': '100% center'});
                    li2.css({ 'margin-left': 800*(Math.cos(c)-1)+'px'});
                }
                else if(X>0&&li1.prev().length>0){
                    $(".swp1").css({"-webkit-justify-content":"flex-end"});
                    var c=Math.PI/1600*X;
                    li2.css({ '-webkit-transform-origin': '100% center'});
                    li2.css({'-webkit-transform': 'rotateX(-5deg) rotateY('+(-9/80*X)+'deg) rotateZ(0deg)', 'transition': 'all 0s'});
                    li1.css({ '-webkit-transform-origin': '0 center'});
                    li1.css({'-webkit-transform': 'rotateX(10deg) rotateY('+(-9/80*X)+'deg) rotateZ(0deg)', 'transition': 'all 0s' });
                    li1.css({ 'margin-right': 800*(-1+Math.cos(c))+'px'});
               }
            })
        }).mouseup(function (e) {
            $(this).off("mousemove");
            if(Math.abs(e.pageX-startX)<50){
                return;
            }
            var li1=$(this).find(".active");
            var li2=li1.next();
            if(X<-100&&li2.next().length>0){
                li1.css({'-webkit-transform': 'rotateX(10deg) rotateY('+(-90)+'deg) rotateZ(0deg)', 'transition': 'all 0.3s'});
                li2.css({'-webkit-transform': 'rotateX(-5deg) rotateY('+(-90)+'deg) rotateZ(0deg)','transition': 'all 0.3s'});
                li2.css({ 'margin-left': '-800px'});
                li1.removeClass("active");
                li2.next().addClass("active");
                setTimeout(function(){
                    var index=li2.next().index()/2;
                    li1.css({'-webkit-transform': 'rotateX(10deg) rotateY(0deg) rotateZ(0deg)', 'transition': 'all 0s','margin-left': '0'});
                    li2.css({'-webkit-transform': 'rotateX(-5deg) rotateY(0deg) rotateZ(0deg)', 'transition': 'all 0s','margin-left': '0px'});
                    $(".swp1").css({"-webkit-transform":"translate("+(-800*index)+"px,-50%)"})
                },300)
            }
            else if(X>100&&li1.prev().length>0){
                li1.css({'-webkit-transform': 'rotateX(10deg) rotateY('+(-90)+'deg) rotateZ(0deg)', 'transition': 'all 0.3s'});
                li2.css({'-webkit-transform': 'rotateX(-5deg) rotateY('+(-90)+'deg) rotateZ(0deg)','transition': 'all 0.3s'});
                li1.css({ 'margin-right': '-800px'});
                li1.removeClass("active");
                li1.prev().prev().addClass("active");
                setTimeout(function(){
                    var index=li1.prev().prev().index()/2;
                    li1.css({'-webkit-transform': 'rotateX(10deg) rotateY(0deg) rotateZ(0deg)', 'transition': 'all 0s','margin-right': '0px'});
                    li2.css({'-webkit-transform': 'rotateX(-5deg) rotateY(0deg) rotateZ(0deg)', 'transition': 'all 0s','margin-right': '0px'});
                    $(".swp1").css({"-webkit-transform":"translate("+(-800*index)+"px,-50%)"})
                },300)
            }
        })

        $(".swp1 img").click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            openContent();
        })
    }
    function openContent(){
        if ($(".item_active").next().hasClass("item")) {
            $(".item_active").removeClass("item_active").next().addClass("item_active");
            $(".main").css({"background-image":'url(./img/p_1_bg.png)'})
        }
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