require.config({
    // baseUrl:'books/js',
    paths: {
        bootstrap:"http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min",
        jquery:"../plugs/js/jquery",
        config:"config",
        zoom:"../plugs/js/zoom"
    }
});
loadPlugs(['jquery','bootstrap','zoom'],init);
function init(){
    require(['index','config'],function(index){
        index.init();
    });
}
function loadPlugs(stripts,callback){
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
        require([s],function(){loadPlugs(stripts,callback)});
    }
}