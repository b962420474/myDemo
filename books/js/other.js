define('other',[],function(){
    function init(){
        console.log("init");
    }
    function load(){
        console.log("load");
    }
    return{
        init:init,
        load:load
    }
});