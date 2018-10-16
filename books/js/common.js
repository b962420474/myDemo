function ajaxHandle(url,type,data,callback){
    $.ajax({
        url:url,
        type:type,
        data:data,
        success:function(respose){
            callback&&callback(respose);
        },
        error:function(error){
            console.log("error");
        }
    });
}