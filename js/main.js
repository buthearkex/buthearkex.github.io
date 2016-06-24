/** Document Ready Functions **/
/********************************************************************/

var $contactForm = $('#contactform');
$contactForm.submit(function(e) {
  e.preventDefault();
  $.ajax({
    url: '//formspree.io/mikkosh@hotmail.com',
    method: 'POST',
    data: $(this).serialize(),
    dataType: 'json',
    beforeSend: function() {
      $(".loading").css("display", "initial");
    },
    success: function(data) {
      
      $(".loading").css("display", "none");
      
      //show fields, not create them
      $(".success").css("display", "initial");
      
      //$contactForm.find('.alert--loading').hide();
      //$contactForm.append('<div class="alert alert--success">Message sent!</div>');
      
      //disable fields
      $contactForm.find('#subs').prop('disabled', true);
      
    },
    error: function(err) {
      //$contactForm.find('.alert--loading').hide();
      //$contactForm.append('<div class="alert alert--error">Ops, there was an error.</div>');
      
      $(".loading").css("display", "none");
      
      //show fields, not create them
      $(".failure").css("display", "initial");
    }
  });
});

function adjust_textarea(h) {
    h.style.height = "20px";
    h.style.height = (h.scrollHeight)+"px";
}

$(document).ready(function () {

  // Resive video
  scaleVideoContainer();

  initBannerVideoSize('.video-container .poster img');
  initBannerVideoSize('.video-container .filter');
  initBannerVideoSize('.video-container video');

  $(window).on('resize', function () {
    scaleVideoContainer();
    scaleBannerVideoSize('.video-container .poster img');
    scaleBannerVideoSize('.video-container .filter');
    scaleBannerVideoSize('.video-container video');
  });

});

/** Reusable Functions **/
/********************************************************************/

function scaleVideoContainer() {

  var height = $(window).height();
  var unitHeight = parseInt(height) + 'px';
  $('.homepage-hero-module').css('height', unitHeight);

}

function initBannerVideoSize(element) {

  $(element).each(function () {
    $(this).data('height', $(this).height());
    $(this).data('width', $(this).width());
  });

  scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element) {

  var windowWidth = $(window).width()
    , windowHeight = $(window).height()
    , videoWidth
    , videoHeight;

  console.log(windowHeight);

  $(element).each(function () {
    var videoAspectRatio = $(this).data('height') / $(this).data('width')
      , windowAspectRatio = windowHeight / windowWidth;

    if (videoAspectRatio > windowAspectRatio) {
      videoWidth = windowWidth;
      videoHeight = videoWidth * videoAspectRatio;
      $(this).css({
        'top': -(videoHeight - windowHeight) / 2 + 'px'
        , 'margin-left': 0
      });
    } else {
      videoHeight = windowHeight +300;
      videoWidth = videoHeight / videoAspectRatio;
      $(this).css({
        'margin-top': 0
        , 'margin-left': -(videoWidth - windowWidth) / 2 + 'px'
      });
    }

    $(this).width(videoWidth).height(videoHeight);

    $('.homepage-hero-module .video-container video').addClass('fadeIn animated');


  });
}