// (function ( $ ) {

    $.fn.advancedForm = function(options) {
        var $form = $(this);

        var defaults = {
                pattern: 'infield',
                mask: false,
                populatedClass : 'populated',
                focusedClass : 'focused'
            },
            settings = $.extend({}, defaults, options);


        $form.show(function() {
            //Inline Pattern
            switch(options.pattern) {
                case 'infield':
                    $form.find('input').not('[type="checkbox"], [type="radio"]').each(function(index, element) {

                          var $element  = $(element);
                          var $label = $element.siblings('label');
                          var $inputGroup = $element.parents('.input-group'); 
                          var width;
                          var labelWidth = $label.width();
                          var left = labelWidth + 20;

                          //Make sure that the input is wide enough for the label to fit
                          //Make it 100% if need be.
                          if($inputGroup.hasClass('small')) { width = $label.width() + 100; } 
                          else if($inputGroup.hasClass('medium')) { width = $label.width() + 250; }
                          $(this).css({ 'width' : width });

                          //Apply the padding calculated based on the width of the label
                          if(!$inputGroup.hasClass('color')) {
                            $(this).css({'padding-left': left});
                          }
                      });

                      //Selects
                      $form.find('select').each(function() {
                        var $select = $(this);
                        var $label = $select.siblings('label');
                        var $inputGroup = $select.parents('.input-group');

                        $inputGroup.css({
                          paddingLeft: $label.width() + 10
                        });

                      });

                      $form.find('input[type="color"]').each(function() {
                        $(this).parents('.input-group').css({
                          paddingLeft: $(this).siblings('label').width() + 5
                        });
                      });

                  break;

                //Float Pattern
                case 'float':
                    // ! Pulled from FloatLabel.js - https://github.com/m10l/FloatLabel.js

                    var wrappers = $form.find('.input-group').not('.checkboxes').not('.radio-buttons');
                       
                    //Loop through the input-groups
                    
                    wrappers.each(function(){

                     var element = $(this),
                         label = element.find('label'),
                         input = element.find('textarea, input, select'),
                         select = element.find('select');

                     // input.each(function() { console.log($(this).attr('class')); });

                     select.each(function() {
                         var $label = $(this).siblings('label');
                         var labelWidth = $label.width();
                         $(this).wrap('<div class="psuedo-select"></div>').parent().append($label.clone());
                         $label.remove();
                         $(this).css({
                             'min-width' : labelWidth + 30
                         });
                     });
                     //Replace the label's value with the label text if it is empty
                     if( input.val() == '' ) {
                         input.val( label.text() );
                         if(input.parents('.input-group').hasClass('masked')) {
                             input.attr('placeholder', label.text());
                         }
                     } 
                     //Otherwise, apply the populated class since there is already
                     //a value present
                     else {
                         element.addClass( settings.populatedClass );
                     }

                     // Move the label up on field focus
                     input.on( 'focus', function(){
                         element.addClass( settings.focusedClass );
                         if( input.val() === label.text() ){
                             input.val('');
                             if(input.parents('.input-group').hasClass('masked')) {
                                 input.attr('placeholder', label.text());
                             }
                         } else {
                             element.addClass( settings.populatedClass );
                         }
                     });

                     //Move the label back down into the field value if there
                     //is no value on blur
                     input.on( 'blur', function(){
                         element.removeClass( settings.focusedClass );
                         var maskedValue = "none";
                         if(input.parents('.input-group').hasClass('masked')) {
                             maskedValue = $.trim(input.val().replace(/[\W_]+/g, ""));
                         }
                         if( !input.val() || maskedValue === "" ){
                             input.val( label.text() );
                             if(input.parents('.input-group').hasClass('masked')) {
                                 input.attr('placeholder', label.text());
                             }
                             element.removeClass( settings.populatedClass );
                         }
                     });

                     input.on( 'keyup', function(){
                         element.addClass( settings.populatedClass );
                     });
                   });
                break;
            }
        });

    };


    $.fn.setErrorPosition = function() {
        this.css({
            'top' : - this.height() - 5
            //'left' : (this.parents('.input-group').width() - this.width())/2
        });
        var $inputGroup = this.parents('.input-group');
        // var originalMargin = $inputGroup.css('margin-top');
        if($inputGroup.hasClass('error')) {
            $inputGroup.css({ 'margin-top' : this.height() + 10 });
        } else {
            $inputGroup.removeAttr('style');
        }

    };

// }(jQuery));

