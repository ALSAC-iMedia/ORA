$.fn.toolbox = function() {
	// pageslide open animation
	var openPageSlide = function($) {
		$("#pageslide-wrapper").css('display', 'block');
		$("#pageslide-wrapper").animate({
			right : "0px"
		}, "normal");
	};
	// pageslide close animation
	var closePageSlide = function($) {
		$("#pageslide-wrapper").animate({
			right : "-100%"
		}, "normal", function() {
			$("#pageslide-wrapper").css('display', 'none');
			$("#pageslide-content").empty();
			$("body").removeClass("no-scroll");
			$("#pageslide-wrapper").css('right', '');
		});
	};

	return {
		init : function($, authorRunMode) {
			// add slide divs if the doc has toolbox class
			if ($('.toolbox').length > 0) {
				var psSlideContent = document.createElement("div");
				$(psSlideContent).attr("id", "pageslide-content");

				var psSlideWrap = document.createElement("div");
				$(psSlideWrap).attr("id", "pageslide-wrapper").append(
						psSlideContent);

				// Wrap and append so that we have the slide containers
				$("body").append(psSlideWrap);
			}
			// modify the richtext plugin style class to href class
			$('span.toolbox').each(function(index, value) {
				$(this).find('a').addClass("toolbox");
				$(this).parent('a').addClass("toolbox");
				$(this).removeClass("toolbox");
				$(this).addClass("tip-toggle");
			});
			// anchor toolbox href click
			$("a.toolbox").click(
					function(e) {
						// check for toolbox class
						e.preventDefault();
						var ajaxPath = $(this).attr('href');
						$("body").addClass("no-scroll");
						ajaxPath = ajaxPath.substring(0, ajaxPath.length - 5)
								+ '.toolbox.html';
						if (authorRunMode) {
							ajaxPath = ajaxPath + "?wcmmode=disabled"
						}
						// ajax call to get toolbox content
						$.ajax({
							type : "GET",
							url : ajaxPath,
							success : function(data) {
								$("#pageslide-content").html(data)
								openPageSlide($);
							}
						});

						return false;

					});

			// pageslide content close link
			$(document).on('click', '.close-tool , .close-icon', function() {
				closePageSlide($);
				return false;
			});
			// pageslide content to stop Propagation
			$(document).on('click', '#pageslide-content', function(event) {
				event.stopPropagation();
			});
			// pageslide close if you click outside of pageslide area
			$(document).click(function(event) {
				var eventID = event.target.id;
				if (eventID.indexOf("pageslide-wrapper") === -1) {
					closePageSlide($);
				}

			});

		} // end init

	};

};