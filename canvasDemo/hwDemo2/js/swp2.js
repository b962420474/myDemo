function showMenu(e){
    //$(el).find("img").css({"-webkit-transform": "rotateZ(180deg)"});
    //setTimeout(function() {
    var e=e||event;
    e.stopPropagation();
    $(".menu").css({"-webkit-transform": "translate(480px,-480px)"})
    //}, 1000);
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
    var startY,currentY, newPosition, startPosition = 0,clientWidth=60;
    $(".features .xx ul").mousedown(function (e) {
        e.preventDefault();
        startY = e.pageY;
        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);
    })
    function mousemove(e) {
        if (startY != e.pageY) {
            var diff = 0;
            currentY = e.pageY;
            diff = currentY - startY;
            newPosition = startPosition + diff;
            $(".features .xx ul").css({ '-webkit-transform': 'translateY(' + newPosition + 'px)', 'transition': 'all 0s' })
        }
    }
    function mouseup(e) {
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
        setPosition();
        startPosition = newPosition;
    }
    function setPosition() {
        if(newPosition>0){
            newPosition=0;
        }
        var end = -clientWidth*7;
        if(newPosition < end){
            newPosition=end;
        }
        $(".features .xx ul").css({ '-webkit-transform': 'translateY(' + newPosition + 'px)', 'transition': 'all 0.2s' })
    }
}
bind();