const timmer = {
    timer: false,
    num: 0,
    s: 60,
    handel: false,
    max: 0,
    update:false
}

export function init(num,handel,update,max) {
    timmer.num = num;
    timmer.handel = handel;
    timmer.update = update;
    timmer.max =max;
    timmer.s = 60;
}
export function start() {
    if (timmer.num > 0) {
        timmer.timer = setInterval(function () {
            timmer.s--;
            if(timmer.s==0){
                timmer.s=60;
                timmer.num--;
                timmer.update(timmer.num);
            }
            console.log(timmer.num);
            if (timmer.num == 0) {
                clear();
                timmer.handel && timmer.handel();
            }
        }, 1000);
    } else {
        timmer.timer = setInterval(function () {
            timmer.s--;
            if(timmer.s==0){
                timmer.s=60;
                timmer.num++;
                timmer.update(timmer.num);
            }
            if (timmer.num == 540) {
                clear();
                timmer.handel && timmer.handel();
            }
        }, 1000);
    }
}
export function pause() {
    clear();
}

function clear() {
    clearInterval(timmer.timer);
}