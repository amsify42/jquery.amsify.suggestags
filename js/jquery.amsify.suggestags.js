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
            this.name          = null;
            this.defaultLabel  = 'Type to search';
            this.classes       = {
              sTagsArea     : '.amsify-suggestags-area',
              inputArea     : '.amsify-suggestags-input-area',
              inputAreaDef  : '.amsify-suggestags-input-area-default',
              sTagsInput    : '.amsify-suggestags-input',
              listArea      : '.amsify-suggestags-list',
              list          : '.amsify-suggestags-list',
              listGroup     : '.amsify-list-group',
              listItem      : '.amsify-list-item',
              itemPad       : '.amsify-item-pad',
              inputType     : '.amsify-select-input',
           };
           this.defaultClass  = {
              bootstrap : {
                clear : 'btn btn-default',
                close : 'btn btn-default',
              },
              materialize : {
                clear : 'btn waves-effect waves-light',
                close : 'btn waves-effect waves-light',
              },
              amsify : {
                clear : '',
                close : '',
              }
           };
           this.selectors     = {
              sTagsArea     : null,
              inputArea     : null,
              inputAreaDef  : null,
              sTagsInput    : null,
              listArea      : null,
              list          : null,
              listGroup     : null,
              listItem      : null,
              itemPad       : null,
              inputType     : null,
           };
        };

        AmsifySuggestags.prototype = {
            /**
             * Executing all the required settings
             * @param  {selector} form
             */
            _init : function(selector) {
                this.selector   = selector;
                this.name       = ($(selector).attr('name'))? $(selector).attr('name')+'_amsify': 'amsify_suggestags';
                this.createHTML();
                this.setEvents();
                $(this.selector).hide();
            },

            createHTML : function() {
              var HTML                      = '<div class="'+this.classes.sTagsArea.substring(1)+'"></div>';
              this.selectors.sTagsArea      = $(HTML).insertAfter(this.selector);
              var labelHTML                 = '<div class="'+this.classes.inputArea.substring(1)+'"></div>';
              this.selectors.inputArea      = $(labelHTML).appendTo(this.selectors.sTagsArea);

              this.defaultLabel             = (settings.whiteList.length && settings.whiteList[0])? settings.whiteList[0]: this.defaultLabel;
              var sTagsInput                = '<input type="text" class="'+this.classes.sTagsInput.substring(1)+'" placeholder="'+this.defaultLabel+'">';
              this.selectors.sTagsInput     = $(sTagsInput).appendTo(this.selectors.inputArea);

              var listArea              = '<div class="'+this.classes.listArea.substring(1)+'"></div>';
              this.selectors.listArea   = $(listArea).appendTo(this.selectors.sTagsArea);
              $(this.selectors.listArea).width($(this.selectors.sTagsArea).width()-3);

              /**
               * If searchable
               */
              if(this.isSearchable) {
                var searchArea            = '<div class="'+this.classes.searchArea.substring(1)+'"></div>';
                this.selectors.searchArea = $(searchArea).appendTo(this.selectors.listArea);

                var search                = '<input type="text" class="'+this.classes.search.substring(1)+'" placeholder="Search here..."/>';
                this.selectors.search     = $(search).appendTo(this.selectors.searchArea);
              }

              var list                  = '<ul class="'+this.classes.list.substring(1)+'"></ul>';
              this.selectors.list       = $(list).appendTo(this.selectors.listArea);
              $(this.createList()).appendTo(this.selectors.list);
              this.fixCSS();
            },           

            setEvents : function() {
              var _self = this;
              $(this.selectors.inputArea).attr('style', $(this.selector).attr('style'))
                                         .addClass($(this.selector).attr('class'));
            },


            createList : function() {
              var _self     = this;
              var listHTML  = '';
              // $.each(this.options, function(index, option){
              //   if(option.type == 'optgroup') {
              //       listHTML += '<li class="'+_self.classes.listGroup.substring(1)+'">'+option.label+'</li>';
              //   } else if(option.value) {
              //     isActive     += (_self.isOptGroup)? ' '+_self.classes.itemPad.substring(1): '';
              //     listHTML += '<li class="'+_self.classes.listItem.substring(1)+' '+isActive+'">'+_self.getInputType(option.value)+' '+option.label+'</li>';
              //     if(option.selected) {
              //       _self.selected.push(option.value);
              //       selected = true;
              //     }
              //   }
              // });
              // if(this.isSearchable) listHTML += '<li class="'+_self.classes.noResult.substring(1)+'">No matching options</li>';
              return listHTML;
            },

            fixCSS : function() {
              if(settings.type == 'materialize') {
                $(this.selectors.inputArea).addClass(this.classes.inputAreaDef.substring(1)).css({'min-height': '36px', 'padding': '5px 5px'});
              }
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