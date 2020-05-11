(function ($, window) {
    var translateX;
    var m = 0;
    function bind() {
        $(".swp2").mousedown(function (e) {
            e.preventDefault();
            e.stopPropagation();
            translateX = getTranslate($(".swp2")[0], "x");
            startX = e.pageX;
            $(this).mousemove(function (e) {
                e.preventDefault();
                e.stopPropagation();
                moveEndX = e.pageX;
                X = moveEndX - startX;
                var length = translateX;
                length += X;
                console.log("jsh:" + length);
                if (length >= getwidth()) {
                    length = getwidth();
                }
                else if (length <= -($(".swp2").width()-800+getwidth())) {
                    console.log(getwidth());
                    length = -($(".swp2").width()-800+getwidth());
                }
                console.log("length:" + length);
                $(this).css({ '-webkit-transform': 'translate3d(' + length + 'px,-50%,0)','transition': 'all 0s'});
                m = length;
            })
        }).mouseup(function (e) {
            $(this).off("mousemove");
            if(Math.abs(e.pageX-startX)<30){
                return;
            }
            // e.stopPropagation();
            var length=m;
            if (length >=0) {
                length = 0;
            }
            else if (length <= -($(".swp2").width()-800)) {
                length = -($(".swp2").width()-800);
            }
            console.log("length:" + length);
            $(".swp2").css({ '-webkit-transform': 'translate3d(' + length + 'px,-50%,0)', 'transition': 'all 0.3s' });
            translateX = length;
        })
        $(".swp2 .item_a_type").on({"click":function(e){
            var target=e.currentTarget;
            if($(target).hasClass("float")){
                $(".swp2 .float").each(function(i,v){
                    $(v).removeClass("float");
                    if($(v).hasClass("item_a_value")){
                        var text=$(v).find(".active").text()+"分钟"
                        $(v).html(text);
                        $(v).css({ '-webkit-transform': 'translateY(' + length + 'px)'})
                    }
                    else{
                        $(v).html("洗涤时间");
                    }
                });
                $(target).parent().parent().removeClass("active");
            }else{
                $(".swp2 .float").each(function(i,v){
                    $(v).removeClass("float");
                    if($(v).hasClass("item_a_value")){
                        var text=$(v).find(".active").text()+"分钟"
                        $(v).html(text);
                        $(v).css({ '-webkit-transform': 'translateY(' + length + 'px)'})
                    }
                    else{
                        $(v).html("洗涤时间");
                    }
                });
                render($(target).next(),[1,2,3,4,5,6,7,8,9],3);
                $(target).addClass("float").next().addClass("float");
                $(target).html("洗涤<br>时间");
                $(target).parent().parent().addClass("active")
            }
            }
        })
        $(".swp2 .item_a_value").mousedown(function (e) {
            if(!$(this).hasClass("float")) return;
            e.preventDefault();
            e.stopPropagation();
            translateY = getTranslate($(this)[0], "y");
            var w = $(this).find("li:not(.active)").first().outerHeight(true);
            startX = e.pageX;
            startY = e.pageY;
            $(this).mousemove(function (e) {
                e.preventDefault();
                e.stopPropagation();
                moveEndY = e.pageY;
                Y = moveEndY - startY;
                var length = translateY;
                length += Y;
                var item_a_value=$(this);
                length=(length>2*w)?2*w:length;
                length=length<($(this).parent().height()-2*w-item_a_value.outerHeight(true))?($(this).parent().height()-2*w-item_a_value.outerHeight(true)):length;
                var index = 2 - Math.round(length / w);
                item_a_value.find(".active").removeClass("active");
                item_a_value.find("li").eq(index).addClass("active");
                console.log("length:" + length+"   "+(2*w+$(".swp2 .item_a_value").height()));
                $(this).css({ '-webkit-transform': 'translateY(' + length + 'px)','transition': 'all 0s'});
            })
        }).mouseup(function (e) {
            $(this).off("mousemove");
            //e.stopPropagation();
        })


        $(".features input").on({"click":function(e){
            var target=e.currentTarget;
            var index=$(target).parent().parent().parent().index();
            var s=$(".swp2>li").eq(index);
            if(target.checked===true){
                $(".swp2>li").eq(index).removeClass("hiddenBox")
            }
            else{
                // var index=$(target).parent().parent().parent().index();
                // var s=$(".swp2>li").eq(index);
                // var w=-(s[0].offsetLeft-30);
                // console.log(s);
                $(".swp2>li").eq(index).addClass("hiddenBox")
            }
            }
        })
    }
    function render(node,data,index){
        var html="";
        data.forEach(function(v,i) {
            if(v==index){
                html+="<li class='active'>"+v+"</li>"
            }
            else{
                html+="<li>"+v+"</li>"
            }
        });
        node.html(html);
    }
    function getwidth(){
        return $(".swp2").find("li :not(.hiddenBox)").first().width()/2;
    }
    window.swp2 = function () {
       bind();
    }
})($, window)