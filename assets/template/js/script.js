$(document).ready(function(){

  // toggle blocks by title click

  $('.js-title').click(function(event){
    $(this).addClass('closed');  
    // $(this).toggleClass('closed');
    $(this).next().show();
  });
  
  // fancybox

  $(".fancy-modal").fancybox({
    'transitionIn'  : 'elastic',
    'transitionOut' : 'elastic',
    'speedIn'   : 600,
    'speedOut'    : 200,
    'overlayShow' : true,
    'overlayOpacity' : 0.7,
    'autoDimensions' : true,
    'scrolling' : 'no',
    'openEffect' : 'fade',
    'closeEffect' : 'fade',
    'padding': 0,
    'locked': false
  });

  $(".btn-map").fancybox({
    'transitionIn'  : 'elastic',
    'transitionOut' : 'elastic',
    'speedIn'   : 600,
    'speedOut'    : 200,
    'overlayShow' : true,
    'overlayOpacity' : 0.7,
    'autoDimensions' : true,
    'scrolling' : 'auto',
    'openEffect' : 'fade',
    'closeEffect' : 'fade',
    'padding': 0
  });

  // waypoints

  var headerHeight = $('.header').height();

  $('.open-block').click(function(event){
    $('body, html').animate({
      scrollTop: $(this).offset().top - headerHeight - 25
    }, 1000);
  });

  $('section').waypoint({
    handler: function(dir){
      // "dir" - направление
      if (dir=='down') {
        var relation = $(this.element).attr('id');
        if (relation == 'interactive-map') {
          return;
        } else if (relation == 'drive-map') {
          $('.nav a[href="#interactive-map"]').fadeIn('slow');
        }
        if( !$('.header').hasClass('scroll') ) {
          $('.header').addClass('scroll');
        }
        $('.nav a[href="#'+relation+'"]').fadeIn('slow');
      }
    },
    offset: '15%'
  })
  $('#scroll_to_down').waypoint({
    handler: function(dir){
      yaCounter37317500.reachGoal('Scroll_Target');
    },
    offset: '0'
  })

  // counter

  tick($('.counter'));

  // scrolling on click

    $('.nav a').on('click', function (e) {
        e.preventDefault();
        var el = $(this).attr('href');
        $('body, html').animate({
            scrollTop: $(el).offset().top - headerHeight - 30
        }, 1000);
        $(el).find('h3').trigger('click');
    });

  // scroll panels

  $('.interactive-map-holder').niceScroll({
    cursorcolor:"#333745",
    cursorwidth: 10,
    zindex: 10
  });
  
    var count =  $('.profit-item').length;
    var itemWidth =  $('.profit-item').innerWidth();
    var width =  $('.profits').innerWidth();
    var i = (width - itemWidth - 50) / ( count - 1) ;
    var x = 0;
    $('.profit-item').each(function() {
        //x = ((x + i) + $('.profit-item').innerWidth());
        $(this).css('margin-left', x + 'px');
          x = x + i;
        //$(this).css('margin-left', (x/100) +'%');
    });
});


var days = 24 * 60 * 60, hours = 60 * 60, minutes = 60;

function tick(el) {

  var timestamp = parseInt(el.data('time'));
  if (timestamp && timestamp > 0) {
    var d = new Date();
    timestamp = (timestamp * 1000) + (24 * 60 * 60 * 1000);
    var finishDate = new Date(timestamp);
    left = Math.floor((finishDate - d) / 1000);

    if (left < 0) {
      el.find('div p').html('00');
    } else {
      d = Math.floor(left / days);
      var t = d;
      if (t < 10)
        t = '0' + d;
      el.find('.day p').html(t);
      left -= d * days;
          // Осталось часов
          h = Math.floor(left / hours);
          t = h;
          if (h < 10)
            t = '0' + h;
          el.find('.hour p').html(t);
          left -= h * hours;
          m = Math.floor(left / minutes);
          t = m;
          if (m < 10)
            t = '0' + m;
          el.find('.min p').html(t);
          left -= m * minutes;
          t = left;
          if (t < 10)
            t = '0' + t;
          el.find('.sec p').html(t);
        }
        setTimeout(function() {
          tick(el)
        }, 1000);
      } else {
        el.find('div p').html('00');
        el.addClass('end_time');
      }
    }