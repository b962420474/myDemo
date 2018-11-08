define(function(){
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
    
    return {
        GetObjPos:GetObjPos
    };
});