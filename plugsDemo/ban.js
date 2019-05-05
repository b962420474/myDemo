!function() {
    var timelimit = 50;
    var open = false;
    var error=document.createElement("div");
    error.style.display="none";
    document.body.appendChild(error);
    setInterval(function() {
        var starttime = new Date();
        debugger ;if (new Date() - starttime > timelimit) {
            open = true;
            window.stop();
            error.style.display='block';
            error.innerHTML="\u7cfb\u7edf\u68c0\u6d4b\u975e\u6cd5\u8c03\u8bd5\u002c\u8bf7\u5237\u65b0\u91cd\u8bd5\u0021";
        } else {
            open = false;
            error.style.display='none';
        }
    }, 500)
}();