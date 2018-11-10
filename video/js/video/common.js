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
    function getQueryString(url,name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = url.substr(url.indexOf('?')+1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
    return {
        GetObjPos:GetObjPos,
        getQueryString:getQueryString
    };
});