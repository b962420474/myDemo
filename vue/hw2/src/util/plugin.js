 function roar(plugin){//轰鸣一声
    try{
        plugin.roar();
    }catch(e){

    }
}
function openBoost(plugin,path){//打开boost
    try{
        plugin.openBoost(path);
    }catch(e){

    }
}
function controlLight(plugin,on){//控制灯灭
    try{
        plugin.openBoost(on);
    }catch(e){

    }
}
function heating(plugin,on){//控制灯灭
    try{
        plugin.openBoost(on);
    }catch(e){

    }
}
function pause(plugin,on){//控制灯灭
    try{
        plugin.openBoost(on);
    }catch(e){

    }
}
export const fns={
    roar:roar,
    openBoost:openBoost,
    controlLight:controlLight,
    heating:heating,
    pause:pause,
}