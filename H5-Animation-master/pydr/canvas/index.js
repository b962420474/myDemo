function init() {
    canvas = document.getElementById("canvas");
    can = new Canvas(canvas);
    initMain(can);
}
var canvas, can;
function load() {
    init();
}
function initMain(can) {
    var body=can.createbody({background_url:"../img/Interface/startbg.jpg"});
    var c = can.createCImage({
        url: "../img/Interface/login.png",
        position:"relative",
        top:100,
        left:80
    });
    body.add(c);
    // list.forEach((element, i) => {
    //     var c = can.createCImage({
    //         url: element,
    //         margin:36,
    //         position:"relative"
    //     });
    //     body.add(c);
    //     c.addEventListener("click", function (e, target) {
    //         e.stopPropagation();
    //         init2();
    //     })
    // });
}
window.addEventListener("load", load);

