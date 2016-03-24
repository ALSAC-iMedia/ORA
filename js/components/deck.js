$.fn.deck = function(){

    var _tocScrolled = 0;
    var scroll = false;
    //var uid;
    var mySwipe;
    var maxHeight;
    var scrollable = true;
    var self = this;
    var $deck = $(this);
    var $toc = $deck.find('.toc');
    var $scrollUp =  $toc.find('.toc-scroll-up');
    var $scrollDown =  $toc.find('.toc-scroll-down');
    var $counter = $deck.find('.counter');
    var deckID = $deck.data('deck-id');
    var slideKey = '#deck-' + deckID + '-slide';

    this.scrollTableOfContents = function(amount) {
        _tocScrolled = _tocScrolled + amount;


        if (_tocScrolled <= 0) {
            _tocScrolled = 0;
            $scrollUp.addClass('inactive');
        } else {
            $scrollUp.removeClass('inactive');
        }

        if (_tocScrolled >= maxHeight){
            _tocScrolled = maxHeight;
            $scrollDown.addClass('inactive');
        } else {
            $scrollDown.removeClass('inactive');
        }

        $toc.find('ul').animate({
            scrollTop:  _tocScrolled
        });
    };

    this.calculateOffset = function(tocItem) {
        // Loop through TOC to get the height so we can animate the scroll
        var i = $this.index() - 1;
        if (i < 0) {
            i = 0;
        }

        var offset = 0;

        $toc.find('ul li:lt(' + (i) + ')').each(function(){
            offset += parseInt(tocItem.outerHeight(true));
        });
        return offset;
    };

    this.tocClick = function(tocItem, mySwipe) {

        //console.log('tocCLick');

        // console.log(tocItem.index());

        mySwipe.slide(tocItem.index(), 200);

        $counter.setTo(tocItem.index() + 1);

        // Set the #track to the height of the current slide
        var currentCardHeight = $deck.find('.slide').eq(tocItem.index()).outerHeight(true);
        $deck.find('.track').height(currentCardHeight);
        if(scrollable) {
            _tocScrolled = self.calculateOffset(tocItem);
            // Actually animate the TOC to the right spot
            self.scrollTableOfContents(0);
        }

        // Update the counter to show the current slide number
        $counter.find('.current-slide').html(tocItem.index() + 1);

        //adjust li classes
        tocItem.siblings().removeClass('selected');
        tocItem.addClass('selected');

        //if the window had a location hash or a user navigates to a new card, then scroll to it
        if (scroll) {
            window.location.hash = slideKey + '-' + (tocItem.index() + 1);
            $("html, body").animate({
                'scrollTop' : $toc.offset().top
            });
        } else {
            scroll = true;
        }
    };

    this.init = function(){

        //create the object to swipe
        var mySwipe = new Swipe($deck.find('.track').get()[0], {
              callback: function(index, elem) {
                    $toc.eq(mySwipe.getPos()).click();
                }
        });

       

         $toc.find('ul li').on('click', function(e) {
            var tocItem = $(this);
            e.preventDefault();
            self.tocClick(tocItem, mySwipe);
            $counter.setTo(tocItem.index() + 1);
         });

        //previous card click handler
         $deck.find('.nav-prev').on('click', function (e) {
             e.preventDefault();
             mySwipe.prev();
             $toc.find('li').removeClass('selected')
             .eq(mySwipe.getPos()).addClass('selected');
             $counter.decrement();
         });

         //next card click handler
         $deck.find('.nav-next').on('click', function (e) {
             e.preventDefault();
             mySwipe.next();
             $toc.find('li').removeClass('selected' )
             .eq(mySwipe.getPos()).addClass('selected');
             $counter.increment();
         });

         //calculate scroll height of the toc, bind toc up, down handlers if needed
         maxHeight = $toc.find('ul')[0].scrollHeight - $toc.find('ul').height();
        

         if(maxHeight <= 0) {
            scrollable = false;
            $scrollUp.addClass('disabled');
            $scrollDown.addClass('disabled');
         } else {

            $scrollUp.click(function(){
                self.scrollTableOfContents(-100)
            });

           $scrollDown.click(function(){
                self.scrollTableOfContents(100);
            });
         }

         //if there is a hash, go to hash slide
         var initialIndex = 0;

         if (window.location.hash.indexOf(slideKey) !== -1){
             scroll = true;
             initialIndex = parseInt(window.location.hash.replace(slideKey + '-', '')) - 1;
              $counter.deckCounter({ deck: $deck, number: initialIndex });
         } else {   
              $counter.deckCounter({ deck: $deck, number: 1 });
         }

         //sets the current card as highlighted in the TOC
         setTimeout(function(){
             $toc.eq(initialIndex).click();
         }, 100);


         //these 2 functions are for the responsive mode menu
        $deck.find('.header .toc-icon').click(function() {
             $(this).toggleClass('active');
             $toc.find('ul').toggleClass('active');
             return false;
         });
         $toc.find('ul li a').click(function() {
            $toc.find('ul').removeClass('active');
             $deck.find('.header .toc-icon').removeClass('active');
         });
    } //end init

    this.init();
};

$.fn.deckCounter = function(opts) {
   var  $deck = opts.deck,
        $counterMax = $deck.find('.counter .max-slides'),
        $counterCurrent = $deck.find('.counter .current-slide'),
        maxSlides = $deck.find('.slide').length;

    this.increment = function() {
        var current = parseInt($counterCurrent.text());
        if(current == maxSlides) {
            $counterCurrent.text(1);
        } else {
            $counterCurrent.text(parseInt($counterCurrent.text())+1);
        }
    };
    this.decrement = function() {
        var current = parseInt($counterCurrent.text());
        if(current == 1) {
            $counterCurrent.text(maxSlides);
        } else {
            $counterCurrent.text(parseInt($counterCurrent.text())-1);
        }
    };

    this.setTo = function(number) {
        $counterCurrent.text(number);
    };

    this.init = function(number) {
        $counterMax.text(maxSlides);
        if(number) {
            this.setTo(number);
        } else {
            this.setTo(1);
        }
    };
    this.init(opts.number);
}