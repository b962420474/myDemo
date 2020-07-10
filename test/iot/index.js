var num = 10;
function Cricle(canvas,start, base, num) {
    this.canvas=canvas;
    this.start = start;
    this.rad = (Math.PI * 2) / base;
    this.blueCircle(num);
}



Cricle.prototype.blueCircle = function (n) {
    console.log(num);
    this.clearCanvas();
    var context = this.canvas.getContext("2d");
    var centerX = this.canvas.width / 2;
    var centerY = this.canvas.height / 2;
    context.beginPath();
    context.strokeStyle = "#9e9e9e";
    context.lineWidth = 14;
    context.arc(
        centerX,
        centerY,
        this.canvas.width / 2 - 14,
        0,
        Math.PI * 2,
        false
    );
    context.stroke();
    context.beginPath();
    context.strokeStyle = "#9f0000";
    context.lineCap = "round";
    context.arc(
        centerX,
        centerY,
        this.canvas.width / 2 - 14,
        -Math.PI / 2,
        -Math.PI / 2 + (n) * this.rad,
        false
    );
    context.stroke();
    context.flush();
}



Cricle.prototype.clearCanvas = function () {
    var context = this.canvas.getContext("2d");
    context.clearRect(0, 0, context.width, context.height);
}



function init() {

    var canvas = window.getElementById("cas");
    var c = new Cricle(canvas,0, 60, num);
    window.getElementById("hour").addEventListener("keydown", function (e) {
        console.log("keyCode:" + e.keyCode);
        var keyCode = e.keyCode;
        if (keyCode == 61) {//ascii '+'
            num++;
        } else if (keyCode == 45) {//ascii '-'
            num--;
        }
        c.blueCircle(num);
    });
    var m=window.getElementById("min");
    var s = new Cricle(m,0, 60, num);
    window.getElementById("minute").addEventListener("keydown", function (e) {
        console.log("keyCode:" + e.keyCode);
        var keyCode = e.keyCode;
        if (keyCode == 61) {//ascii '+'
            num++;
        } else if (keyCode == 45) {//ascii '-'
            num--;
        }
        s.blueCircle(num);
    });
}



window.addEventListener("onload", init);

