$.fn.modal = function(title) {
    var modal = this;
    var $overlay = $('#overlay');
    var $body = $('body');


    // Add an overlay div id there is not one
    if ($overlay.length < 1) {
        modal.insertBefore('<div id="overlay"></div>');
    }

    // Open the modal
    modal.openModal = function() {
        $body.addClass('modal-open no-scroll overlay-visible');
        modal.trigger('onOpen');
    };

    // Close the modal
    modal.closeModal = function() {
        $body.removeClass('modal-open no-scroll overlay-visible');
        modal.trigger('onClose');
    };

    // 100% height for mobile
    modal.setHeight = function() {
        // Use modernizr to detect if we need to use javascript to set the height
        // CSS vh units are preffered, but IE is a thing that we have to support
        if (Modernizr.cssvhunit) {
            // If the browser doesn't support vh units, and we are on mobile, use
            // the window's height to set the modal height accordingly
            if ($(window).width() <= 672) {
                modal.find('.modal-content').css({
                    'min-height': $(window).height()
                });
            }
            // Otherwise get rid of that min-height if we're on desktop
            else {
                modal.find('.modal-content').css({
                    'min-height': 'none'
                });
            }
        }
    };

    modal.preload = function(functionToRun) {
        modal.addClass('preload');
        functionToRun();
        modal.removeClass('preload');
        modal.trigger('preloadComplete');
        modal.openModal();
    }

    // Function for setting the modal header text
    modal.setTitle = function(title) {
        modal.find('.modal-header h3').text(title);
    };

    // Set the modal's title, if there is one
    if (title) {
        modal.setTitle(title);
    }

    // Close the modal if the close modal link or the overlay is clicked
    modal.find('.close-modal').click(function() {
        modal.closeModal();
    });

    $('#overlay').click(function() {
        modal.closeModal();
    });
};
	
