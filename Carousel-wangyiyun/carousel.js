(function(win){
  //上一张
  function prev (callback) {
      prevPic();
      preLine();
      callback&&callback();
    }
  //下一张
  function next (callback) {
      nextPic();
      nextLine();
      callback&&callback();
  }
  //初始时定时切换
  function index(father,target) {
      var i,
          len = father.length;
      for (i = 0;i < len;i++) {
        father[i].index = i;
      }
      for (i = 0;i < len;i++) {
        if (father[i].index == target.index) {
          return father[i].index;
        }
      }
    
    }
    function nextPic () {
      var picArr = document.querySelectorAll('.carousel ul li'),
          len = picArr.length,
          i = 0;
      for (;i < len;i++) {
        if (picArr[i].className == 'after') {
          picArr[(i + 1) % len].className = 'after';
          new Animator(300,function(p){
            $(picArr[(i + 1) % len]).css('-webkit-transform', 'translateX('+(250*p)+'px)');
          },Easing.easeOut).start(true,function(){
            $(picArr[(i + 1) % len]).removeAttr('style');
          });
          picArr[i].className = 'now';
          new Animator(300,function(p){
            $(picArr[i]).css('-webkit-transform', 'scale3d(1.0, '+(1+0.2*p)+', '+(1+0.2*p)+')');
            $(picArr[i]).css('left', (500-250*p)+'px');
          },Easing.easeOut).start(true,function(){
            $(picArr[i]).removeAttr('style');
          });
          if (i - 1 < 0) {
            picArr[len - 1].className = 'before';
            new Animator(300,function(p){
              $(picArr[len - 1]).css('-webkit-transform', 'translateX('+(-250*p)+'px)');
            },Easing.easeOut).start(true,function(){
              $(picArr[len - 1]).removeAttr('style');
            });
          }else {
            picArr[i - 1].className = 'before';
            new Animator(300,function(p){
              $(picArr[i - 1]).css('-webkit-transform', 'translateX('+(-250*p)+'px)');
            },Easing.easeOut).start(true,function(){
              $(picArr[i - 1]).removeAttr('style');
            });
          }
          //把原来的before删除(原来的now、after都被覆盖掉了)
          if(len==3) return;
          if (i == 0) {
            picArr[len - 2].className = '';
          }else if (i == 1) {
            picArr[len - 1].className = '';
          }else {
            picArr[i - 2].className = '';
          }
          break;
        }
      }
    }
    function prevPic () {
      var picArr = document.querySelectorAll('.carousel ul li'),
          len = picArr.length,
          i = 0;
      for (;i < len;i++) {
        if (picArr[i].className == 'before') {
          if (i - 1 < 0) {
            picArr[len - 1].className = 'before';
            new Animator(300,function(p){
              $(picArr[len - 1]).css('-webkit-transform', 'translateX('+(-250*p)+'px)');
            },Easing.easeOut).start(true,function(){
              $(picArr[len - 1]).removeAttr('style');
            });
          }else {
            picArr[i - 1].className = 'before';
            new Animator(300,function(p){
              $(picArr[i - 1]).css('-webkit-transform', 'translateX('+(-250*p)+'px)');
            },Easing.easeOut).start(true,function(){
              $(picArr[i - 1]).removeAttr('style');
            });
          }
          picArr[i].className = 'now';
          new Animator(300,function(p){
            $(picArr[i]).css('-webkit-transform', 'scale3d(1.0, '+(1+0.2*p)+', '+(1+0.2*p)+')');
            $(picArr[i]).css('left', (250*p)+'px');
          },Easing.easeOut).start(true,function(){
            $(picArr[i]).removeAttr('style');
          });
          picArr[(i + 1) % len].className = 'after';
          new Animator(300,function(p){
            $(picArr[(i + 1) % len]).css('-webkit-transform', 'translateX('+(250*p)+'px)');
          },Easing.easeOut).start(true,function(){
            $(picArr[(i + 1) % len]).removeAttr('style');
          });
          //删除之前的after
          if(len==3) return;
          picArr[(i + 2)% len].className = '';
          break;
        }
      }
    }
    function nextLine () {
      // 颜色变化
      var lineArr = document.getElementsByClassName('line'),
          len = lineArr.length;
      for (var i = 0;i < len;i++) {
        if (lineArr[i].className.indexOf('active-line') != '-1') {
          lineArr[i].className = 'line';
          lineArr[(i + 1) % len].className = 'active-line line';
          break;
        }
      }
    }
    function preLine () {
      // 颜色变化
      var lineArr = document.getElementsByClassName('line'),
          len = lineArr.length;
      for (var i = 0;i < len;i++) {
        if (lineArr[i].className.indexOf('active-line') != '-1') {
          lineArr[i].className = 'line';
          if (i - 1 < 0) {
            lineArr[len - 1].className = 'active-line line';
          }else {
            lineArr[i - 1].className = 'active-line line';
          }
          break;
        }
      }
    }
  var carousel={
      timer:false,
      scrollActive:null,
      init:function(callback){
          this.timer = setInterval(function(){
            next(callback);
          }, 3000);
      },
      next:function(){
        next();
      },
      prev:function(){
        prev();
      },
      pause:function(){
        clearInterval(this.timer);
      }
  }
  win.carousel=carousel;
})(window)