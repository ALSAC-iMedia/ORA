
$(function() {

	// Modal
	// ========================================

	$('#the-modal').modal();


	// Jump Menu
	// ========================================

	$('.offcanvas-nav').offCanvasMenu();

	$(window).resize(function() {
		if($(window).width() < 768) {
			$('.horizontal-nav').offCanvasMenu();
		}
	});

	// Carousel
	// ========================================

	$('.carousel ul').carousel({
		slidesToShow: 3,
		slidesToScroll: 1,
		cssEase: 'ease-in-out',
		easing: 'easeInOut',
		slide: "li",
		swipeToSlide: false,
		swipe: false,
		touchMove: true,
		centerMode: true,
		arrows: true,
		responsive: [{
		    breakpoint: 672,
		    settings: {
		      slidesToShow: 1,
		      infinite: true
		    }
		}]
	});

	// Deck
	// ========================================

	$('.deck').deck();


	// Tabs
	// ========================================

	$('.tabs').responsiveTabs('tabs');


	// Accordion
	// ========================================

	$('.accordion').accordion({ animation: true });


	// Gallery
	// ========================================

	$('.gallery').gallery();

	$(window).resize();

});

// Forms
// ========================================

$(function() {
	$('.infield form').advancedForm({
		pattern: 'infield'
	});
	$('.float form').advancedForm({
		pattern: 'float'
	});
});





