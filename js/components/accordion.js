

$.fn.accordion = function(opts) {
    var self = this;
    var $container = $(self);
    var animate = opts.animate || true;
    var expandedText = $container.attr('data-expanded-text') + ' ';
    var collapsedText = $container.attr('data-collapsed-text') + ' ';

    $container.find('.nav-item').each(function() {
         var $nav = $(this);
         $nav.find('a').append('<span class="cta-text"><small>'+collapsedText+'</small></span>');
    });
    $container.find('.at-content .nav-item a').click(function(e) { 
        e.preventDefault();
    });
    $container.find('.at-content .nav-item').click(function(e) {
        e.preventDefault();
        var $itemToggled = $(this).next('.item');
        var $navItem = $(this);
        if(animate === true) {
            if($itemToggled.hasClass('expanded')) {
                $itemToggled.slideUp(400, 'swing');
                if($navItem.parents('.accordion').hasClass('.tabs-folder')) {
                    setTimeout(function() {
                        $navItem.toggleClass('expanded').find('.cta-text small').text(collapsedText);
                    }, 400);
                } else {
                    $navItem.toggleClass('expanded').find('.cta-text small').text(collapsedText);
                }
            } else {
                $itemToggled.slideDown(400, 'swing');
                $navItem.toggleClass('expanded').find('.cta-text small').text(expandedText);
            }
            $itemToggled.toggleClass('expanded');
        } else {
            if($itemToggled.hasClass('expanded')) {
                $navItem.find('.cta-text small').text(collapsedText);
            } else {
                $navItem.find('.cta-text small').text(expandedText);
            }
            $navItem.toggleClass('expanded').next('.item').toggleClass('expanded');
        }
    });
};