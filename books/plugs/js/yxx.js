var data={};
function pageInit(pageName,param){
    $.get(pageName,function(html){
        $("#home .page").each(function(i,a){
            a.style.display='none';
        });
        $("#home").append(html);
        var js=pageName.split('.')[0];
        require([js],function(page){
            if(!data.js){
                data.js=js;
                //page.init();
                console.log(js);
            }
            //page.init();
        });
    }).fail(function(){
        console.log("跳转失败");
    });
}
function load(name,pageurl){
    $(name).load(pageurl);
}