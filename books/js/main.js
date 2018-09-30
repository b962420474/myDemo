require.config({
    // baseUrl:'books/js',
    paths: {
        bootstrap:"http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min",
        jquery:"../plugs/js/jquery",
        config:"config",
        zoom:"../plugs/js/zoom"
    }
});
loadJs(['jquery','bootstrap','zoom','config'],init);
function init(){
    require(['index'],function(index){
        index.init();
    });
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