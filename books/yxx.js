require(['config'],function(){
    loadJs(plugs,function(){
        require(["index"],function(index){
            index.init();
            index.load();
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
function load(name,pageurl){
    $(name).load(pageurl);
}
function pageBack(page){

}
function loadJs(stripts,callback){
    var i=0;
    if(i==stripts.length-1)
    {
        require([stripts[i]],function(){callback&&callback()});
    }
    else{
        var s=stripts[i];
        var index=stripts.indexOf(stripts[i]);
        if (index > -1) {
            stripts.splice(index, 1);
        }
        require([s],function(){loadJs(stripts,callback)});
    }
}