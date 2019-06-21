(function () {
    var canvas = {
        getContext: function (width, height) {
            var can = document.createElement("canvas");
            can.width = width;
            can.height = height;
            return can.getContext("2d");
        },
        compressImage: function (param, img) {
            var w = param.w || img.width;
            var h = img.width / img.height * w || img.height;
            var ctx = this.getContext(w, h);
            ctx.drawImage(img, 0, 0, w, h);
            var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
            var dataURL = canvas.toDataURL("image/" + ext, param.quality || 1);
            return dataURL;
        },
        drawImage:function(img,param){
            var w = param.w || img.width;
            var h = img.width / img.height * w || img.height;
            var ctx = this.getContext(w, h);
            if(param.context){
                ctx=param.context;
            }
            ctx.drawImage(img, 0, 0, w, h);
        },
        changeImageColor:function(param){
            param.color = param.color == '0,0,0' || param.color == '255,255,255' ? '0,0,0' : param.color;
            var ctx=param.context;
            var imageData = ctx.getImageData(0, 0, param.w, param.h);
            var pxData = imageData.data;  //获取每一个像素
            var qrcolor = param.color.split(','); 
            for(var i = 0, len = pxData.length; i < len; i += 4) { 
                //改成对应的rgb颜色
                pxData[i] = (pxData[i] + parseInt(qrcolor[0]))>255?(-255+(pxData[i] + parseInt(qrcolor[0]))):(pxData[i] + parseInt(qrcolor[0])); 
                pxData[i+1] = (pxData[i+1] + parseInt(qrcolor[1]))>255?(-255+(pxData[i+1] + parseInt(qrcolor[1]))):(pxData[i+1] + parseInt(qrcolor[1])); 
                pxData[i+2] = (pxData[i+2] + parseInt(qrcolor[2]))>255?(-255+(pxData[i+2] + parseInt(qrcolor[2]))):(pxData[i+2] + parseInt(qrcolor[2]));
            }  
            ctx.putImageData(imageData,0,0);
        },
        discolourAnimation:function(duration, progress){
            var startTime = Date.now();
            timeId = requestAnimationFrame(function step() {
                /*得到动画执行进度*/
                var p = (Date.now() - startTime) / duration;
                /*是否执行下一帧动画*/
                var next = true;
                /*判断动画进度是否完成*/
                if (p < 1.0) {
                    progress( p);   //执行动画回调函数，并传入动画算子的结果和动画进度。
                } else {
                    startTime = Date.now();
                }
                // 如果next是true执行下一帧动画
                if (next) timeId = requestAnimationFrame(step);
            });
        }
    }
    window.canvas =canvas;
})()