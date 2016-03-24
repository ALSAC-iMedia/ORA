
$.fn.gallery = function(options) {

    var defaults = {
            viewerActiveOverlap: 75
        },
        opts = $.extend({}, defaults, options);

    var $modal = $('#the-modal'),
    $gallery = this;

    this.init = function() {
        var galleryViewerHTML = '<div class="gallery-viewer"><ul class="slide-track">'+$gallery.find('ul.grid').html()+'</ul></div>';

        // Apply freewall mosaic to the gallery images
        var wall = new freewall($gallery);
        wall.reset({
            selector: 'figure',
            animate: true,
            cellW: 300,
            cellH: 'auto',
            onResize: function() {
                wall.fitWidth();
            }
        });

        //Trigger window.resize to apply the wall.fitWidth function

        $gallery.find('picture img').ensureLoad(function() {
              $gallery.css('opacity', '1');
              wall.fitWidth();
        });

        //Open the gallery viewer when clicking on a gallery image
        $gallery.find("li").click(function() {

            $gallery.launchViewer(galleryViewerHTML, $(this).index());

        });
    };

    this.launchViewer = function(galleryViewerHTML, initialSlide) {


        //Prepare the modal
        $modal.modal();

        //Make sure to remove the gallery class when closing the modal
        $modal.on('modalClose', function() {
            $modal.removeClass('gallery');
        });

        // Add the gallery class to the modal so we can style it appropriately &
        // insert the galleryviewer HTML into the modal

        $modal.addClass('gallery').setTitle('Viewing gallery images');
        $modal.find('.modal-body').html(galleryViewerHTML);
     

        var $galleryViewer = $modal.find('.gallery-viewer'),
            v = 0;

        //When the images in the gallery viewer are loaded
        $galleryViewer.find('img').ensureLoad(function() {
            v++;
            if (v == $galleryViewer.find('img').length) {

                //Wrap the slick init & slide sizing inside the modal preload function
                //So the maths will be correct
                $modal.preload(function() {
                    //Initialize the gallery viewer carousel with the slick library
                     if (!Modernizr.cssvhunit) {
                        var viewportHeight =  $(window).height();
                        $modal.css({'height': viewportHeight})
                        .find(".modal-content, .modal-body, .gallery-viewer").css({'height': viewportHeight});
                     }

                     //initialize the slide viewer
                     $gallery.viewer(initialSlide, opts.viewerActiveOverlap);


                });
            }
        });
    };

    this.viewer = function(initialSlide, activeOverlap) {

        var $galleryViewer = $modal.find('.gallery-viewer'),
            $slideTrack = $galleryViewer.find('.slide-track'),
            $initialSlide = $galleryViewer.find('li').eq(initialSlide),
            $nextSlide = $initialSlide.next(),
            $prevSlide = $initialSlide.prev(),
            activeOverlap = activeOverlap || 75;


        var  vAllowance = 30,
             hAllowance = 50,
             w = 0,
             maxHeight = window.innerHeight - vAllowance*2;

        $initialSlide.addClass('active current');
        $nextSlide.addClass('active next');
        $prevSlide.addClass('active previous');
          
        //Append Navigation arrows
        $galleryViewer.append('<nav class="gallery-viewer-nav"><button class="nav-prev">Previous</button><button class="nav-next">Next</button></nav>');

        $galleryViewer.find('nav button').each(function() {
            var $button = $(this);
            if($button.outerWidth() > w) {
                w = $button.outerWidth();
            }
        });
 
        var maxWidth = $(window).innerWidth() - w*2 - hAllowance*2;

        $galleryViewer.find('.slide-track').children().each(function() {
            sizeSlide($(this), { maxWidth: maxWidth, maxHeight: maxHeight });
        });

        // Set the intial positions for the slides on init
        positionSlides(activeOverlap);

        //Slide to the left
        $galleryViewer.find('.nav-next').click(function(e) {
          slide(e, {
            dir: 'right',
            overlap: activeOverlap
          });
        });

        // Slide to the right
        $galleryViewer.find('.nav-prev').click(function(e) {
          slide(e, {
            dir: 'left',
            overlap: activeOverlap
          });
        });
    }
    $gallery.init();

};

function sizeSlide($slide, dimensions) {

    var $img = $slide.find('img'),
        imgWidth = $slide.width(),
        imgHeight = $slide.height(),
        maxWidth = dimensions.maxWidth || $(window).width(),
        maxHeight = dimensions.maxHeight || window.innerHeight;

    //Image Width & Height are greater than minimum
    if(imgWidth >= maxWidth && imgHeight >= maxHeight) {
        //Landscape
        if(imgWidth > imgHeight) {
            $img.width(maxWidth);
        // Portrait or Square
        } else {
            $img.height(maxHeight);
        }
    //Image Width is greater than minimum
    } else if(imgWidth >= maxWidth) {
        $img.width(maxWidth)
    //Image Height is greater than minimum
    } else if(imgHeight >= maxHeight) {
        $img.height(maxHeight);
    }
}

function slide(e, opts) {
  var overlap = opts.overlap || 75,
    dir = opts.dir || 'right',
    $oldCurrent = $('.gallery-viewer .current'),
    $oldPrev = $('.gallery-viewer .previous'),
    $oldNext = $('.gallery-viewer .next');

  //Prevent default button behavior and stop any current animation
  e.preventDefault();

  if(dir == 'right') {
    
    $oldPrev.removeClass('active previous');
    $oldCurrent.removeClass('current').addClass('previous');
    $oldNext.removeClass('next').addClass('current');
    
    var $newCurrent = $('.current'),
        $newNext = $newCurrent.next();
    $newNext.addClass('active next');
    
  } else {

    $oldNext.removeClass('active next');
    $oldCurrent.removeClass('current').addClass('next');
    $oldPrev.removeClass('previous').addClass('current');
    
     var $newCurrent = $('.current'),
         $newPrev = $newCurrent.prev();
    $newPrev.addClass('active previous');
  }

   //Position the slides with new classes
   positionSlides(opts.overlap);
  
}

function positionSlides(overlap) {
  var overlap = overlap || 75;
  // Enable or disable navigation buttons, depending upon the current slide
  navToggle();


  //Put the current slide back in the middle
  $('.gallery-viewer .current').css({
    'left': '50%'
  });
  
  //Pull the next slide from the right by the given overlap amount
  $('.gallery-viewer .next').css({
    left: $(window).width() - overlap
  }).next().css({
    left: $(window).width() + overlap
  });
  
  //Pull the previous slide from the left by the given overlap amount
  var $prev = $('.gallery-viewer .previous');
  $prev.css({
    left: -$prev.outerWidth() + overlap
  }).prev().css({
    left: -$prev.outerWidth - overlap
  });
}

function navToggle() {
  // Disable the next or previous buttons if there is not next or previous slide
  $('.gallery-viewer .nav-next').prop('disabled', !$('.gallery-viewer .current').next().length);
  $('.gallery-viewer .nav-prev').prop('disabled', !$('.gallery-viewer .current').prev().length);
}
