/**
 * Amsify Jquery Select 1.1
 * https://github.com/amsify42/jquery.amsify.suggestags
 * http://www.amsify42.com
 */
(function($) {

    $.fn.amsifySuggestags = function(options) {
        /**
         * Merging default settings with custom
         * @type {object}
         */
        var settings = $.extend({
            type        : 'bootstrap',
            tagLimit    : 5,
            whiteList   : [],
        }, options);

        /**
         * Initialization begins from here
         * @type {Object}
         */
        var AmsifySuggestags = function() {
           this.selector      = null;
           this.defaultLabel  = 'Type to search';
           this.classes       = {
              
           };
           this.selectors     = {
              
           };
        };

        AmsifySuggestags.prototype = {
            /**
             * Executing all the required settings
             * @param  {selector} form
             */
            _init : function(selector) {
                this.selector       = selector;
                this.setEvents();
                $(this.selector).hide();
            },           

            setEvents : function() {
              var _self = this;
            },
           
        };
        
        /**
         * Initializing each instance of selector
         * @return {object}
         */
        return this.each(function() {
            (new AmsifySuggestags)._init(this);
        });

    };

}(jQuery));