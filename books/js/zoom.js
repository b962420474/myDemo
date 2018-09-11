$(function () {
  var $box = $('.page');
  // var w = $box.width();
  var w = 1280;
  // var h = $box.height();
  var h = 800;
  var W = $(window).width();
  var H = $(window).height();
  $box.css('zoom', w / h > W / H ? W / w : H / h);
})