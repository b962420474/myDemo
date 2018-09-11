var loader = new function(){
    this.get = function(element,callback){
        element.onload = function(){
            callback&&callback(true);
        }
        element.onerror = function(){
            callback&&callback(false);
        }
    };
    this.js = function(path,callback){
        var script = document.createElement("script");
        script.type = "text/javascript";
        this.get(script,callback);
        script.src = path;
        document.body.appendChild(script);
    }
    this.model = function(path,callback){
        if(window[path]) return;//禁止重复加载model
        console.log(path)
        path = 'models/'+path+'/index.js';
        this.js(path,callback);
    }
    this.load=function(strips,index,callback){
        var that=this;
        if(index<strips.length){
            loader.js(strips[index],function(flag){
                if(flag){
                    console.log(strips[index]+"加载成功");
                    that.load(strips,index+1,callback);
                }
                else{
                    console.log(strips[index]+"加载失败");
                }
            });
        }
        else{
            if(callback){
                callback();
            }
        }
    }
}