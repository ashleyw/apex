$(function(){
  // $('.tabs li').click(function (e) {
  //   e.preventDefault()
  //   $(this).children('a:first').tab('show')
  // });

  // $('.menu').css({display: 'block'});

  $(window).bind('load scroll scrollstart touchmove touchend', function (event) {
    var scroll = $(window).scrollTop();
    if( $('#full-screen').css('display') === 'flex' )  return;
    if (scroll > 20) {
      $('.header').addClass('small');
    } else {
      $('.header').removeClass('small');
    }
  });


  var slideout = new Slideout({
    'panel': document.getElementById('panel'),
    'menu': document.getElementById('menu'),
    'padding': 256,
    'duration': 200,
    'side': 'right',
    'touch': false
  });

  var scroll = $(window).scrollTop();
  $(window).scroll(function(){
    scroll = $(window).scrollTop();
  });

  slideout.on('beforeopen', function(){
    $('.header').css({top: scroll, position: 'absolute'});
  });
  slideout.on('close', function(){
    $('.header').css({top: 0, position: 'fixed'});
  });


  $('.toggle').on('click', function() {
     slideout.toggle();
   });

  $(window).resize(function(){
    slideout.close();
  });

  $('#panel').click(function(a){
    if (slideout.isOpen() && (a.target.className != 'fa fa-bars fa-2x' && a.target.className != 'toggle')) {
      a.preventDefault();
      slideout.close();
    }
  })


  $(".menu a:not([role='button'])").click(function(){
    slideout.close();
  });


  $('#full-screen .close-link, #full-screen').click(function(){
    $('#full-screen').removeClass('open');

    $('html, body').css({
      'overflow': 'auto',
    });
  });

  $('.enlarge').bind('click', function(e){
    $('#full-screen').addClass('open');
    $('#full-screen img').attr('src', $(this).attr("src"));

    $('html, body').css({
      'overflow': 'hidden'
    });
  });


  FastClick.attach(document.body);

  if (window.devicePixelRatio == 2) {
        var images = $("img[data-retina]");
        for(var i = 0; i < images.length; i++) {
          var imageType = images[i].src.substr(-4);
          var imageName = images[i].src.substr(0, images[i].src.length - 4);
          imageName += "@2x" + imageType;
          images[i].src = imageName;
        }
   }

});
