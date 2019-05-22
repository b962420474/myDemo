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
        }
    }
})()