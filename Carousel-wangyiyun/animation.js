(function (window) {
    var pow = Math.pow,
        BACK_CONST = 1.70158,
    // t指的的是动画进度  前面的p
    Easing = {
        // 匀速运动
        linear: function (t) {
            return t;
        },
        // 加速运动
        easeIn: function (t) {
            return t * t;
        },
        // 减速运动
        easeOut: function (t) {
            return (2 - t) * t;
        },
        //先加速后减速
        easeBoth: function (t) {
            return (t *= 2) < 1 ? .5 * t * t : .5 * (1 - (--t) * (t - 2));
        },
        // 4次方加速
        easeInStrong: function (t) {
            return t * t * t * t;
        },
        // 4次方法的减速
        easeOutStrong: function (t) {
            return 1 - (--t) * t * t * t;
        },
        // 先加速后减速，加速和减速的都比较剧烈
        easeBothStrong: function (t) {
            return (t *= 2) < 1 ? .5 * t * t * t * t : .5 * (2 - (t -= 2) * t * t * t);
        },
        //  
        easeOutQuart: function (t) {
            return -(Math.pow((t - 1), 4) - 1)
        },
        // 指数变化 加减速
        easeInOutExpo: function (t) {
            if (t === 0) return 0;
            if (t === 1) return 1;
            if ((t /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (t - 1));
            return 0.5 * (-Math.pow(2, - 10 * --t) + 2);
        },
        //指数式减速
        easeOutExpo: function (t) {
            return (t === 1) ? 1 : -Math.pow(2, - 10 * t) + 1;
        },
        // 先回弹，再加速
        swingFrom: function (t) {
            return t * t * ((BACK_CONST + 1) * t - BACK_CONST);
        },

        // 多走一段，再慢慢的回弹
        swingTo: function (t) {
            return (t -= 1) * t * ((BACK_CONST + 1) * t + BACK_CONST) + 1;
        },

        //弹跳
        bounce: function (t) {
            var s = 7.5625,
                r;

            if (t < (1 / 2.75)) {
                r = s * t * t;
            } else if (t < (2 / 2.75)) {
                r = s * (t -= (1.5 / 2.75)) * t + .75;
            } else if (t < (2.5 / 2.75)) {
                r = s * (t -= (2.25 / 2.75)) * t + .9375;
            } else {
                r = s * (t -= (2.625 / 2.75)) * t + .984375;
            }

            return r;
        },
        //正曲线
        curve:function(t){
            var y=Math.sin(2 * Math.PI * t);
            var x=2*t;
            return {'x':x,'y':y};
        }
    };
    function Animator(duration, progress, easing) {
        this.duration = duration;
        this.progress = progress;
        this.easing = easing || function(p) {
            return p
        };
        this.openAnimation=true;
        this.config={
            finished:false
        };
        this.stopcallback=false;
    }
    Animator.prototype = {
        /*开始动画的方法， 
         参数：一个布尔值
         true表示动画不循环执行。  
        */
        start: function(finished,callback) {
            if(!this.openAnimation) return;
            /*动画开始时间*/
            var startTime = Date.now();
            /*动画执行时间*/
            var duration = this.duration,
                self = this;
            /*定义动画执行函数*/
            self.timeId=requestAnimationFrame(function step() {
                /*得到动画执行进度*/
                var p = (Date.now() - startTime) / duration;
                /*是否执行下一帧动画*/
                var next = true;
                /*判断动画进度是否完成*/
                if(p < 1.0) {
                    self.progress(self.easing(p), p);   //执行动画回调函数，并传入动画算子的结果和动画进度。
                } else {
                    if(finished){  //判断是否停止动画。如果是true代表停止动画。
                        next = false;
                        cancelAnimationFrame(self.timeId);
                        callback&&callback();
                        return;
                    }else{
                        startTime = Date.now();
                    } 
                }
                // 如果next是true执行下一帧动画
                if(next) self.timeId=requestAnimationFrame(step);
            });
        },
        stop:function(callback){
            cancelAnimationFrame(this.timeId);
            callback&&callback();
        },
        setOff:function(flag){
            this.openAnimation=flag;
        }
    };
    var loading=function(){
        var load='<div id="a_loading" style="position:absolute;left:48%;top:48%;width: 2px;'+
        'height: 2px;'+
        'border-radius: 1px;'+
        'box-shadow: 0 -24px 0 6px black,'+ /*上*/
        '0 24px 0 3px #333,'+ /*下*/
        '-24px 0 0 3px #333,'+ /*左*/
        '24px 0 0 3px #333,'+ /*右*/
        '-18px -18px 0 3px #333,'+ /*左上*/
        '18px -18px 0 4.5px #333,'+ /*右上*/
        '-18px 18px 0 3px #333,'+ /*左下*/
        '18px 18px 0 3px #333"></div>';
        $("body").append(load);
        var b = new Animator(1000, function (p) {
            $("#a_loading").css('-webkit-transform', 'rotate(' + 360 * p + 'deg)');
         }, Easing.easeBoth);
         b.start();
    }
    window.Animator=Animator;
    window.Easing=Easing;
    window.loading=loading;
})(window)