define(function(){
    var _top=80;
    var index=0;
    var $danmu=$("#danmu");
    function CPos(x, y)
    {
        this.x = x;
        this.y = y;
    }
    /**
     * 得到对象的相对浏览器的坐标
     */
    function GetObjPos(ATarget)
    {
        var target = ATarget;
        var pos = new CPos(target.offsetLeft, target.offsetTop);
       
        var target = target.offsetParent;
        while (target)
        {
            pos.x += target.offsetLeft;
            pos.y += target.offsetTop;
           
            target = target.offsetParent
        }
        return pos;
    }
    function debug(msg){
        console.log(msg);
        setMessageInnerHTML(msg);
    }
    function setMessageInnerHTML(innerHTML){
        $span=$("<span id='"+index+"'>"+ innerHTML + "</span>");
        var _height = $danmu.height();
        var _left = $danmu.width();
        _top+=20;
        if(_top>_height-100) _top=10;
        $span.css({
            left:_left,
            top:_top,
            color:getRandomColor(),
            'white-space':'nowrap',
            position: "absolute"}
        );
        $danmu.append($span);
        launch($span);
    }
    function launch($span)
    {
        var _left = $danmu.width();
        var time=10000;
        if(index%2==0)
            time=20000;
        $span.animate(
            {left:"-"+ _left+"px"},
            time,
            function(){
                this.remove();
            }); 
        index++;
    }
    function getRandomColor() {
        return '#' + (function(h) {return new Array(7 - h.length).join("0") + h})((Math.random() * 0x1000000 << 0).toString(16))
        }
    return {
        GetObjPos:GetObjPos,
        debug:debug
    };
});