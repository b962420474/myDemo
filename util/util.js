
//节流函数
const throttle=function(fn,delay){
    let t=Date.now();
    return (...args)=>{
        var n=Date.now();
        if(n-t>=delay){
            fn.apply(this,args)
            t=Date.now();
        }
    }
}
