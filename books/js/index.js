define('index',function(){
    function init(){
        initBroadcast();
        initHotBooks();
    }
    function load(){
        
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
    return {
        init:init
    };
});
