
$.fn.offCanvasMenu = function(opts) {
	
	var $menu = $(this),
		$content = opts.content || $('#content'),
		resetCSS = {
		'-webkit-transform': 'translateX(0)',
		'-o-transform': 'translateX(0)',
		'-moz-transform': 'translateX(0)',
		'-ms-transform': 'translateX(0)',
		transform: 'translateX(0)',
	};

	opts = setOpts({
		toggle: $menu.find('.toggle'),
		closeOnNavigate: true,
		smoothScroll: true,
		pushContent: false,
		showOverlay: false
	}, opts);

	$content.css({
		position: 'relative',
		'-webkit-transition': '-webkit-transform 0.35s ease-in-out',
		'-o-transition': '-o-transform 0.35s ease-in-out',
		'-moz-transition': '-moz-transform 0.35s ease-in-out',
		'-ms-transition': '-ms-transform 0.35s ease-in-out',
		transition: 'transform 0.35s ease-in-out',
	});
	
	opts.toggle.click(function(e) {
		e.preventDefault();
		if(opts.pushContent) {

			var contentCSS;
			var menuWidth = $menu.children('ul').width();

			if($menu.css('right') == 'auto') {
				contentCSS = {
					'-webkit-transform': 'translateX('+menuWidth+'px)',
					'-o-transform': 'translateX('+menuWidth+'px)',
					'-moz-transform': 'translateX('+menuWidth+'px)',
					'-ms-transform': 'translateX('+menuWidth+'px)',
					transform: 'translateX('+menuWidth+'px)',
				};
			} else {
				contentCSS = {
					'-webkit-transform': 'translateX(-'+menuWidth+'px)',
					'-o-transform': 'translateX(-'+ menuWidth+'px)',
					'-moz-transform': 'translateX(-'+ menuWidth+'px)',
					'-ms-transform': 'translateX(-'+ menuWidth+'px)',
					transform: 'translateX(-'+ menuWidth+'px)',
				};
			}

			if($content.hasClass('offcanvas-menu-open')) {
				$content.removeClass('offcanvas-menu-open').css(resetCSS);
			} else {
				$content.addClass('offcanvas-menu-open').css(contentCSS);
			}
		}

		if(opts.showOverlay) {
			$('body').toggleClass('overlay-visible');
		}

		$menu.toggleClass('expanded');
	});

	if(opts.closeOnNavigate) {
		$menu.children('ul').find('a').click(function() {
			if(opts.pushContent) {
				$content.removeClass('offcanvas-menu-open').css(resetCSS);
			}
			if(opts.showOverlay) {
				$('body').toggleClass('overlay-visible');
			}
			$menu.toggleClass('expanded');
		});
	}
};