$(function () {
  var $box = $('.page');
  // var w = $box.width();
  var w = 360;
  // var h = $box.height();
  var h = 700;
  var W = $(window).width();
  var H = $(window).height();
  $box.css('zoom', w / h > W / H ? W / w : H / h);
})