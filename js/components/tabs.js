$.fn.responsiveTabs = function(display) {
    this.init = function(){
        var self = this;
        var $container = $(self);

        switch(display) {
            case 'tabs':
                self.responsiveTabs($container);
                $(window).resize(function() {
                    self.switchView($container);
                });
                break;
            case 'accordion':
                $container.addClass('accordion');
                self.accordion($container);
                break;
        }
    },//end init

    this.switchView = function($container) {
        var self = this;
        if($(window).width() >= 672) {
            if($container.hasClass('accordion')) {
                $container.removeClass('accordion');
                self.silenceAccordion($container);
            }
        } else {
            if(!$container.hasClass('accordion')) {
                $container.addClass('accordion');
                self.accordion($container);
            }
        }
    },//end switchView

    this.responsiveTabs = function($container) {
        var self = this;

        var tabber;
        var tabOptions = {
            classActive: 'tab-current',
            classData: 'at-content',
            classNav: 'at-nav',
            dataDefault: 'data-tabs-default',
            dataId: 'data-tabs-id',
            dataPair: 'data-tabs-pair'
        };

        tabber = new HashTabber(tabOptions);
        tabber.run();
        if($(window).width() <=  672) {
            $container.addClass('accordion');
            self.accordion($container);
        }
    },//end responsiveTabs

    this.accordion = function($container, animate) {
        var animate = animate || true;

        if($container.find('.at-content .nav-item').length <= 0) {
            $container.find('.at-nav').each(function() {
                var $nav = $(this);
                var $items = $nav.parents('nav').siblings('.content-wrap').find('.at-content .item');
                $nav.find('.nav-item').each(function(i) {
                    var thisItem = $items[i];
                    var newItem = $(this).clone();
                    //newItem.find('a').append('<span class="cta-text">'+collapsedText+'</span>');
                    $(newItem).insertBefore(thisItem);
                });
            });
            $container.accordion({ animate: animate });
        }
    },//end accordion

    this.silenceAccordion = function($container) {
        $container.find('.item').removeClass('expanded').removeAttr('style');
        $container.find('.at-content .nav-item').remove();
        $container.find('.nav-item').removeClass('expanded');
    }//end silenceAccordion

    this.init();
};
