require(['config'],function(){
    loadJs(plugs,function(){
        require(["index"],function(index){
            index.init();
            //index.load();
        });
    });
});
var requirejs={};
var data;
var history=[];
function pageInit(pageName,param){
    $.get(pageName+".html",function(html){
        $("#home .page").each(function(i,a){
            a.style.display='none';
        });
        $("#home").append(html);
        require([pageName],function(page){
            if(!requirejs.js){
                requirejs.js=pageName;
                if(page.init)
                page.init();
            }
            if(page.load)
            page.load(param);
            data=param;
        });
    }).fail(function(){
        console.log("跳转失败");
    });
}
function getParam(name){
    return data.name;
}
function loadhtml(name,pageurl,callback){
    $.get(pageurl+".html",function(html){
        $(name).html(html);
        require([pageurl],function(page){
            callback&&callback(page);
        });
    }).fail(function(){
        console.log("加载失败");
    });
}
function pageBack(page){

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