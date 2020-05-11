function showMenu(el){
    $(el).find("img").addClass("active");
    setTimeout(function() {
        $(el).find("img").removeClass("active");
    }, 1000);
    setTimeout(function() {
        $(".menu").css({"-webkit-transform": "translate(480px,-480px)"})
    }, 2000);
}
function cancel(){
    $(".menu").css({"-webkit-transform": "translate(800px,-480px)"})
}
function selectMenu(e){
    var e=e||event;
    var target=e.target;
    showOption();
    console.log(target);
}
function selectOption(e){
    $(".option li.active").length>0?$(".option .active").removeClass("active"):'';
    $(e).addClass("active");
}
function hide(){
    $(".option").css({"-webkit-transform": "translate(150%,-800px)"})
}
function showOption(){
    $(".option").css({"-webkit-transform": "translate(-50%,-800px)"})
}
function bind(){
    var startY,moveEndY,translateY;
    $(".features .xx ul").mousedown(function (e) {
        e.preventDefault();
        e.stopPropagation();
        translateY = getTranslate($(this)[0], "y");
        var w = $(this).find("li:not(.active)").first().outerHeight(true);
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
}
bind();