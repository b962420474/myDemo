(function ($, window) {
    $(".swp3 li").eq(2).addClass("swp3_active");
    function bind() {
        $(".swp3").scroll(function (e) {
            var w = $(".swp3 li").first().outerHeight(true);
            console.log("...: " + e.target.scrollTop / w);
            var index = 2 + Math.round(e.target.scrollTop / w);
            console.log("index:" + index);
            $(".swp3 .swp3_active").removeClass("swp3_active");
            $(".swp3 li").eq(index).addClass("swp3_active");
        });
    }
    function init() {
        $(".checkbox").bootstrapSwitch({
            onText: "ON",      // 设置ON文本  
            offText: "OFF",    // 设置OFF文本  
            onColor: "success",// 设置ON文本颜色     (info/success/warning/danger/primary)  
            offColor: "info",  // 设置OFF文本颜色        (info/success/warning/danger/primary)  
            size: "mini",    // 设置控件大小,从小到大  (mini/small/normal/large)  
            handleWidth: "30",//设置控件宽度
            // 当开关状态改变时触发  
            onSwitchChange: function (event, state) {
                var ProductId = event.target.defaultValue;
                if (state == true) {
                  
                } else {
            
                }
            }
        });
    }
    window.swp3 = function () {
        bind();
        init();
    }
})($, window)