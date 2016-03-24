var $overlay = $('#overlay');
function closeMenu() {
    $(".menu > li,.mobile-menu").removeClass("active");
    $(".mega-menu-wrapper").animate({'height': 0}, 500, function(){
        $(this).removeClass('active');
        $(this).find("li").removeClass('active');
    });
    $overlay.animate({opacity: 0}, 500, function() {
        $(this).css('display', 'none').unbind('click');
    });
    $("body").removeClass("no-scroll");
    $(".icon-sj-menu").removeClass("active");
    return false;
}

$(".menu > li.search").click(function() {
    $(".mega-menu .search-input").focus();
    return false;
});

$(".nav-close-icon").click(function() {
    closeMenu();
});

// Dynamically create the getWidth Function
if (typeof(window.innerWidth) !== 'undefined') {
    window.getWidth = function() { return window.innerWidth; };
} else { // IE8
    window.getWidth = function() { return document.documentElement.clientWidth; };
}

var heightDiff = 223;
if (window.getWidth() <= 960)
heightDiff = 211;

$(".menu > li,.mobile-menu > li").click(function(e) {
    e.preventDefault();
    var $self = $(this);
    var callback = function() {
        $(".mega-menu-wrapper").addClass("active").animate({'height': window.innerHeight-heightDiff}, 500);
        //$("body").addClass("no-scroll");
        var megaMenuLi = $(".mega-menu-wrapper > ul").children().get($self.index());
        if ($(megaMenuLi).hasClass("active")) {
            closeMenu();
        } else {
            $self.addClass("active").siblings("li").removeClass("active");
            $(megaMenuLi).addClass("active").siblings("li").removeClass("active");
        }
    }

    if (!$(".mega-menu-wrapper").hasClass('active')){
        $overlay.css('opacity', 0).css('display', 'block').animate({opacity: 0.65}, 300, function() {
            callback();
        }).click(function(){
            closeMenu();
        });
    } else {
        callback();
    }
});

$(window).on("resize", function () {
    $('.mega-menu-wrapper.active').css('height', window.innerHeight-heightDiff); //the -100 will subtract from the height if you need that
}).resize();

$(".icon-sj-menu").click(function() {
    $(this).toggleClass("active");
    $(".mobile-menu").toggleClass("active");
    return false;
});

$(".mobile-menu > li").click(function() {
    $(".icon-sj-menu").removeClass("active");
    $(".mobile-menu").removeClass("active");
});

$(window).on("resize", function () {
    if (window.getWidth() >= 860) {
        $(".icon-sj-menu").removeClass("active");
        $(".mobile-menu").removeClass("active");
    }
}).resize();



