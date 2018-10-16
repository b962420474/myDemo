define('index',function(){
    function init(){
        
    }
    function load(){
        ajaxHandle("/data/config.js",'GET',null,function(){
            initBroadcast();
        })
        ajaxHandle("/data/config.js",'GET',null,function(){
            initHotBooks();
            initrankBooks();
        })
    }
    function initBroadcast(){
        var li="";
        var div="";
        for(var i=0;i<Tjbooks.length;i++){
            li+='<li data-target="#myCarousel" data-slide-to="'+i+'"></li>';
            div+='<div class="item"><img src="'+Tjbooks[i].imgsrc+'" alt="First slide"></div>';
        }
        $("#myCarousel .carousel-indicators").html(li);
        $("#myCarousel .carousel-inner").html(div);
        $($("#myCarousel .carousel-indicators")[0].querySelector('li')).addClass("active");
        $($("#myCarousel .carousel-inner")[0].querySelector('.item')).addClass("active");
        $('#carousel-ad').carousel({
            interval: 2000
          });
    }
    function initHotBooks(){
        var html='';
        for(var i=0;i<Hotbooks.length;i++){
            html+='<li><img src="'+Hotbooks[i].imgsrc+'" class="module-slide-img" alt="'+Hotbooks[i].name+'"><p>'+Hotbooks[i].name+'</p></li>';
        }
        $(".hot .list-inline").html(html);
    }
    function initrankBooks(){
        var html='';
        for(var i=0;i<Hotbooks.length;i++){
            html+='<li><img src="'+Hotbooks[i].imgsrc+'" class="module-slide-img" alt="'+Hotbooks[i].name+'"><p>'+Hotbooks[i].name+'</p></li>';
        }
        $(".ranking .list-inline").html(html);
    }
    function initnewBooks(){
        var html='';
        for(var i=0;i<Hotbooks.length;i++){
            html+='<li><img src="'+Hotbooks[i].imgsrc+'" class="module-slide-img" alt="'+Hotbooks[i].name+'"><p>'+Hotbooks[i].name+'</p></li>';
        }
        $(".ranking .list-inline").html(html);
    }
    return {
        init:init,
        load:load
    };
});
