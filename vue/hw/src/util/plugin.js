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
export const fns={
    roar:roar,
    openBoost:openBoost,
}