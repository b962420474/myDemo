

function Wave(
  canvasWidth, // 轴长
  canvasHeight, // 轴高
  waveWidth, // 波浪宽度,数越小越宽
  waveHeight, // 波浪高度,数越大越高
  xOffset,
  speed,
  colors // 波浪颜色
) {
  this.points = [];
  this.startX = 0;
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.waveWidth = waveWidth;
  this.waveHeight = waveHeight;
  this.xOffset = xOffset;
  this.speed = speed;
  this.colors = colors;
}
Wave.prototype.getChartColor = function (ctx) {
  var radius = this.canvasWidth / 2;
  var grd = ctx.createLinearGradient(radius, radius, radius, this.canvasHeight);
  grd.addColorStop(0, this.colors[0]);
  grd.addColorStop(1, this.colors[1]);
  return grd;
}
Wave.prototype.draw = function (ctx) {
  ctx.save();
  var points = this.points;
  ctx.beginPath();
  for (var i = 0; i < points.length; i += 1) {
    var point = points[i];
    ctx.lineTo(point[0], point[1]);
  }
  ctx.lineTo(this.canvasWidth, this.canvasHeight);
  ctx.lineTo(this.startX, this.canvasHeight);
  ctx.lineTo(points[0][0], points[0][1]);
  ctx.fillStyle = this.getChartColor(ctx);
  ctx.fill();
  ctx.restore();
}
Wave.prototype.update = function (nowRange) {
  this.points = [];
  var startX = this.startX, waveWidth=this.waveWidth,waveHeight = this.waveHeight, canvasWidth = this.canvasWidth, canvasHeight = this.canvasHeight, xOffset = this.xOffset;
  for (var x = startX; x < startX + canvasWidth; x += 20 / canvasWidth) {
    var y = Math.sin(((startX + x) * waveWidth) + xOffset);
    var dY = canvasHeight * (1 - (nowRange / 100));
    this.points.push([x, dY + (y * waveHeight)]);
  }
  this.xOffset += this.speed;
}
function initCanves(){
  var canvas = document.getElementById("canvas");
  canvas.height = 300;
  canvas.width = 300;
  var canvasWidth = canvas.width;
  var canvasHeight = canvas.height;
  var ctx = canvas.getContext('2d');
  var wave1 = new Wave(canvasWidth,canvasHeight, 0.02,  8, 0, 0.04, ['#F39C6B', '#A0563B']);
  var wave2 = new Wave(canvasWidth,canvasHeight, 0.02,  8, 2, 0.04,['rgba(243, 156, 107, 0.48)', 'rgba(160, 86, 59, 0.48)']);
  draw(ctx,canvasWidth,canvasHeight,wave1,wave2);
}
function draw(ctx,canvasWidth,canvasHeight,wave1,wave2){
  ctx.clearRect(0, 0, canvasWidth,canvasHeight);
  wave1.update(60);
  wave1.draw(ctx);
  wave2.update(60);
  wave2.draw(ctx);
  window.requestAnimationFrame(function(){
    draw(ctx,canvasWidth,canvasHeight,wave1,wave2)
  });
}
function drawBackground(ctx,canvasWidth) {
  var r =canvasWidth / 2;
  var cR = r;
  ctx.beginPath();
  ctx.arc(r, r, cR, 0, 2 * Math.PI);
  var grd = ctx.createRadialGradient(r, r, r / 2, r, r, r);
  grd.addColorStop(0, 'rgba(127, 57, 242, 0');
  grd.addColorStop(1, 'rgba(255, 195, 103, 0.11)');
  ctx.fillStyle = grd;
  ctx.fill();
}