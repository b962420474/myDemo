require(['config'],function(){
    loadJs(plugs,function(){
        require(["index"],function(index){
            index.init();
            route();
            //index.load();
        });
    });
});
var requirejs={};
var data;
var history=[];
function getParam(name){
    return data.name;
}
function loadhtml(name,pageurl,callback){
    $.get(pageurl+".html",function(html){
        $(name).html(html);
        require([pageurl],function(page){
            if(!requirejs[pageurl]){
                requirejs[pageurl]=pageurl;
                if(page.init)
                page.init();
            }
            callback&&callback(page);
        });
    }).fail(function(){
        console.log(pageurl+"加载失败");
    });
}
function loadJs(stripts,callback){
    if(stripts.length==1)
    {
        require([stripts[0]],function(){
            callback&&callback()});
    }
    else{
        var s=stripts[0];
        stripts.splice(0, 1);
        require([s],function(){
            loadJs(stripts,callback);
        });
    }
}
function route(){
    var hash=window.location.hash;
    if(hash.length>1){
        var hashVal = hash.substring(1);
        if(routeurl[hashVal]){
            loadhtml(".content",routeurl[hashVal]);
        }
        else{
            window.location.href="../error/404.html";
        }
    }
    else{
        window.location.hash="index";
    }
}
window.addEventListener("hashchange", function () {
    route();
 }, false);