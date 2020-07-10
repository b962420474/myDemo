console.log("page loaded:" + window.location);

var cnt = 0;
function canvas_paint(c, i) {
  if (c) {
    var vg = c.canvas;
    console.log("paint canvas[" + c.id + "]:[" + vg.width + "," + vg.height + "]");
    vg.save();
    vg.fillColor = "green";
    vg.rect(10, 10, vg.width - 20, vg.height - 20);
    vg.fill();
    vg.lineWidth = 1;
    vg.strokeStyle = "#0000ff";

    vg.save();
    vg.translate(vg.width / 2, vg.height / 2);
    var w = vg.width / 3;
    var h = vg.height / 3;
    var colors = ["#0000ff", "#00ff00", "#ff0000", "#00ffff", "#ffff00", "#ff00ff"];
    for (var j = 0; j < 32; j++) {
      vg.strokeStyle = colors[j%6];
      vg.rotate(j * 0.1);
      vg.rect(-w, -h, w * 2, h * 2);
      vg.stroke();
    }
    vg.restore();

    vg.fontSize = 16;
    vg.fillText("i am canvas", 50, 40 + (i + 40) % 60, 100);
    vg.restore();
    vg.flush();
  }
}

function btn_css_init() {
  var b = window.getElementById("btn_css");
  if (b != undefined) {
    b.addEventListener("mouseclick", function(e) {
      console.log("btn_css clicked");
      b.text = e.type + ":" + cnt;
      cnt++;
      canvas_paint(window.getElementById("div"), cnt * 10);
    });
  }

  var p = window.getElementById("paint");
  if (p != undefined) {
    p.addEventListener("dompaint", function(e) {
      var vg = e.canvas;
      console.log("paint button:" + e.type + "[" + vg.width + "," + vg.height + "]");
      vg.save();
      vg.fillColor = "green";
      vg.rect(10, 10, vg.width - 20, vg.height - 20);
      vg.fill();
      vg.lineWidth = 3;
      vg.strokeStyle = "blue";
      vg.rect(30, 30, vg.width - 60, vg.height - 60);
      vg.stroke();
      vg.restore();
      vg.flush();
    });
  }

  window.getElementById("w+").addEventListener("mouseclick", function(e) {
    window.getElementById("div").width += 10;
  });

  window.getElementById("w-").addEventListener("mouseclick", function(e) {
    window.getElementById("div").width -= 10;
  });

  window.getElementById("h+").addEventListener("mouseclick", function(e) {
    window.getElementById("div").height += 10;
  });

  window.getElementById("h-").addEventListener("mouseclick", function(e) {
    window.getElementById("div").height -= 10;
  });
}

/*
window.addEventListener("mousemove",
  function(e) {
    console.log(e.type + ":" + e.x +  "," + e.y);
  }
);
*/

btn_css_init();
var id = window.setInterval(200, function() {
    console.log("interval 0");
    window.clearInterval(id);
  }
)
window.setTimeout(5000, function() {
    console.log("timeout 0");
  }
)

window.setInterval(300, function() {
    console.log("interval 1");
  }
)

var ch = window.getElementById("load");
if (ch != undefined) {
  ch.addEventListener("mouseclick", function(e) {
    console.log("change location:" + "2.html");
    window.location = "2.html";
  });
}


