$.fn.wrapper = function() {
    return {
        init: function($, uid, height, parallax){
            var self = this;
            var $parsysDiv = $('.target-' + uid);

            if (height > 0) {
                $parsysDiv.css('min-height', height+'px');
            }

            if (!stjude.global.checkWcmMode()) {
                var $section = $parsysDiv.parent();
                if ($section.hasClass('full-width')) {
                    $(window).resize("on", function() {
                        var windowWidth = window.getWidth();
                        var contentWidth = $('.entry-content').width();
                        var margin = (windowWidth - contentWidth) / 2;
                        $section.css('margin-left', '-'+margin+'px');
                        $section.css('margin-right', '-'+margin+'px');
                    }).resize();
                    if (parallax) {
                        $parsysDiv.siblings('.wrapper-img').addClass('parallax');
                    }
                }
            }
        }//end init
    };
};
