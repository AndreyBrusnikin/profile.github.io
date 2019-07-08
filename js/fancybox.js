$(document).ready(function() {
    $(".fancybox").fancybox({
      openEffect	: 'fade', /* none, fade, elastic */
      closeEffect	: 'fade',
      openSpeed :  300, /* ms, "slow", "normal", "fast"*/
      closeSpeed : 300,
      /* mouseWheel : false,*/
      helpers : {
        /*title : null */
        title : {
          type : 'inside' /* 'float', 'inside', 'outside', 'over', 'null' */
        }
      }
    });
  })