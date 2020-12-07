(function ($, window) {
    var startX, currentX, isclick, newPosition, startPosition = 0;
    var clientWidth = 265 * 3;
    function bind() {
        $(".swp1").mousedown(function (e) {
            e.preventDefault();
            isclick = true;
            startX = e.clientX;
            window.addEventListener("mousemove", mousemove);
            window.addEventListener("mouseup", mouseup);
        })
    }
    function mousemove(e) {
        if (startX != e.clientX) {
            isclick = false;
            var diff = 0;
            currentX = e.clientX;
            diff = currentX - startX;
            newPosition = startPosition + diff;
            $(".swp1").css({ '-webkit-transform': 'translate(' + newPosition + 'px,-50%)', 'transition': 'all 0s' })
        }
    }
    function mouseup(e) {
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
        if (isclick) {
            openContent();
        }
        else {
            setPosition(newPosition);
            startPosition = newPosition;
        }
    }
    function openContent() {
        if ($(".item_active").next().hasClass("item")) {
            $(".item_active").removeClass("item_active").next().addClass("item_active");
            $(".main").css({ "background-image": 'url(./img/p_1_bg.png)' })
        }
    }
    function setPosition() {
        if ((newPosition - startPosition) * 5 >= clientWidth) {
            newPosition = startPosition + clientWidth > 0
                ? 0 : startPosition + clientWidth;
        } else if ((newPosition - startPosition) * 5 <= -clientWidth) {
            var end = -clientWidth;
            newPosition = startPosition - clientWidth < end ? end : startPosition - clientWidth;
        } else {
            newPosition = startPosition;
        }
        $(".swp1").css({ '-webkit-transform': 'translate(' + newPosition + 'px,-50%)', 'transition': 'all 0.2s' })
    }
    function getTranslate(node, sty) {//获取transform值
        var translates = document.defaultView.getComputedStyle(node, null).webkitTransform.substring(7);
        var result = translates.match(/\(([^)]*)\)/);// 正则()内容
        var matrix = result ? result[1].split(',') : translates.split(',');
        if (sty == "x" || sty == undefined) {
            return matrix.length > 6 ? parseFloat(matrix[12]) : parseFloat(matrix[4]);
        } else if (sty == "y") {
            return matrix.length > 6 ? parseFloat(matrix[13]) : parseFloat(matrix[5]);
        } else if (sty == "z") {
            return matrix.length > 6 ? parseFloat(matrix[14]) : 0;
        } else if (sty == "rotate") {
            return matrix.length > 6 ? getRotate([parseFloat(matrix[0]), parseFloat(matrix[1]), parseFloat(matrix[4]), parseFloat(matrix[5])]) : getRotate(matrix);
        }
    }
    function getRotate(matrix) {
        var aa = Math.round(180 * Math.asin(matrix[0]) / Math.PI);
        var bb = Math.round(180 * Math.acos(matrix[1]) / Math.PI);
        var cc = Math.round(180 * Math.asin(matrix[2]) / Math.PI);
        var dd = Math.round(180 * Math.acos(matrix[3]) / Math.PI);
        var deg = 0;
        if (aa == bb || -aa == bb) {
            deg = dd;
        } else if (-aa + bb == 180) {
            deg = 180 + cc;
        } else if (aa + bb == 180) {
            deg = 360 - cc || 360 - dd;
        }
        return deg >= 360 ? 0 : deg;

    }
    window.swp1 = function () {
        bind();
    }
    window.getTranslate = getTranslate;
})($, window)