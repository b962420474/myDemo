(function(win){
    //上一张
    function prev () {
        prevPic();
        preLine();
      }
    //下一张
    function next () {
        nextPic();
        nextLine();
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
        var picArr = document.querySelectorAll('ul li'),
            len = picArr.length,
            i = 0;
        for (;i < len;i++) {
          if (picArr[i].className == 'after') {
            picArr[(i + 1) % len].className = 'after';
            picArr[i].className = 'now';
            if (i - 1 < 0) {
              picArr[len - 1].className = 'before';
            }else {
              picArr[i - 1].className = 'before';
            }
            //把原来的before删除(原来的now、after都被覆盖掉了)
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
        var picArr = document.querySelectorAll('ul li'),
            len = picArr.length,
            i = 0;
        for (;i < len;i++) {
          if (picArr[i].className == 'before') {
            if (i - 1 < 0) {
              picArr[len - 1].className = 'before';
            }else {
              picArr[i - 1].className = 'before';
            }
            picArr[i].className = 'now';
            picArr[(i + 1) % len].className = 'after';
            //删除之前的after
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
        init:function(){
            var timer = setInterval(next, 3000);
        }
    }
    win.carousel=carousel;
})(window)