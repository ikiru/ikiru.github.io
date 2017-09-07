$.fn.bounce = function(options) {
  var settings = $.extend(
    {
      speed: 10
    },
    options
  );

  return $(this).each(function() {
    var $this = $(this),
      $parent = $this.parent().parent(),
      height = $parent.height(),
      width = $parent.width(),
      top = Math.floor(Math.random() * (height / 2)) + height / 4,
      left = Math.floor(Math.random() * (width / 2)) + width / 4,
      vectorX = settings.speed * (Math.random() > 0.5 ? 1 : -1),
      vectorY = settings.speed * (Math.random() > 0.5 ? 1 : -1);

    console.log($parent);
    // place initialy in a random location
    $this.css({ top: top, left: left }).data("vector", {
      x: vectorX,
      y: vectorY
    });

    var move = function($e) {
      var offset = $e.offset(),
        width = $e.width(),
        height = $e.height(),
        vector = $e.data("vector"),
        $parent = $e.parent().parent();
      bodywidth = ($(document).width() - $("#playfield").width()) / 2;

      if (offset.left <= bodywidth && vector.x < 0) {
        vector.x = -1 * vector.x;
      }
      console.log(bodywidth);
      if (offset.left + width >= $parent.width() + bodywidth) {
        vector.x = -1 * vector.x;
      }
      if (offset.top <= 108 && vector.y < 0) {
        vector.y = -1 * vector.y;
      }
      if (offset.top >= $parent.height() + 108) {
        // console.log("offset", offset.top);
        // console.log($parent.height() + 108);
        vector.y = -1 * vector.y;
      }

      $e
        .css({
          top: offset.top + vector.y + "px",
          left: offset.left + vector.x + "px"
        })
        .data("vector", {
          x: vector.x,
          y: vector.y
        });

      setTimeout(function() {
        move($e);
      }, 50);
    };

    move($this);
  });
};

$(function() {
  $("#playfield img").bounce({ speed: 0.5 });
});
