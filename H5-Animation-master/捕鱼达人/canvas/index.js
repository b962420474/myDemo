function init() {
    var list = ["../img/MMSLayerDefHeatingSmallButton_BackgroundImage.png",
        "../img/MMSLayerDefDefrostSmallButton_BackgroundImage.png",
        "../img/MMSLayerDefPresetsSmallButton_BackgroundImage.png",
        "../img/MMSLayerDefSettingsSmallButton_BackgroundImage.png"];
    canvas = document.getElementById("canvas");
    can = new Canvas(canvas);
    setCenter(list, can);
}
var canvas, can;
function init2() {
    can.init();
    var list = ["../img/HSLayerDMFrstBottomSmallButton_PressImage.png",
        "../img/HSLayerDMFrstConvectionSmallButton_PressImage.png",
        "../img/HSLayerDMFrstDoubleGrillSmallButton_PressImage.png",
        "../img/HSLayerDMFrstEcoSmallButton_PressImage.png",
        "../img/HSLayerDMFrstFannedSmallButton_PressImage.png",
        "../img/HSLayerDMFrstGrillFanSmallButton_PressImage.png",
        "../img/HSLayerDMFrstGrillSmallButton_PressImage.png",
        "../img/HSLayerDMFrstStandardSmallButton_PressImage.png",
        "../img/HSLayerDMScndPizzaSmallButton_PressImage.png",
        "../img/HSLayerDMScndDrySmallButton_PressImage.png",
        "../img/HSLayerDMScndPizzaSmallButton_PressImage.png",
    ];
    var body=can.createbody();
    var div=can.createDiv({
        width:480,
        height:272,
    });
    body.add(div);
    div.addEventListener("mousedown", function (e) {
        // this.cxt.translate(100, 0);
        // this.children.forEach(ele=>{
        //     ele.render();
        // })
        this.addEventListener("mousemove",function(e){
            //this.clear();
           
        })
        this.addEventListener("mouseup",function(e){
           
            div.removeEventListener("mousemove");
        })
    })
    var left = 39, margin = 39, top = 37, width = 42;
    list.forEach((element, i) => {
        var c = can.createCImage({
            url: element,
            x: left,
            y: top
        });
        if (Math.floor((i + 1) / 4) % 2 == 1) {
            if ((i + 1) % 4 == 0) {
                left -= can.canvas.width;
            }
            left += margin * 2 + width;
            top = 153;
        }
        else {
            left += margin * 2 + width;
            top = 37;
        }
        div.add(c);
    });
    console.log(body);
}
function load() {
    init();
}
function setCenter(list, can) {
    var body=can.createbody("black");
    list.forEach((element, i) => {
        var c = can.createCImage({
            url: element,
            margin:36,
            position:"relative"
        });
        body.add(c);
        c.addEventListener("click", function (e, target) {
            e.stopPropagation();
            init2();
        })
    });
}
window.addEventListener("load", load);
window.addEventListener("onload", load);
function end(ctx) {
    if (ctx.flush) {
        ctx.flush();
    }
}

