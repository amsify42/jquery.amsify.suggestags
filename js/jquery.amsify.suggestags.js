/**
 * Amsify Jquery Select 1.1
 * https://github.com/amsify42/jquery.amsify.suggestags
 * http://www.amsify42.com
 */
(function($) {

    $.fn.amsifySuggestags = function(options, method) {
        /**
         * Merging default settings with custom
         * @type {object}
         */
        var settings = $.extend({
            type            : 'bootstrap',
            tagLimit        : -1,
            suggestions     : [],
            suggestionsAction: {},
            classes         : [],
            backgrounds     : [],
            colors          : [],
            whiteList       : false,
            afterAdd        : {},
            afterRemove     : {},
        }, options);

        /**
         * Initialization begins from here
         * @type {Object}
         */
        var AmsifySuggestags = function() {
            this.selector      = null;
            this.name          = null;
            this.defaultLabel  = 'Type here';
            this.classes       = {
              sTagsArea     : '.amsify-suggestags-area',
              inputArea     : '.amsify-suggestags-input-area',
              inputAreaDef  : '.amsify-suggestags-input-area-default',
              focus         : '.amsify-focus',
              sTagsInput    : '.amsify-suggestags-input',
              listArea      : '.amsify-suggestags-list',
              list          : '.amsify-list',
              listItem      : '.amsify-list-item',
              itemPad       : '.amsify-item-pad',
              inputType     : '.amsify-select-input',
              tagItem       : '.amsify-select-tag',
              colBg         : '.col-bg',
              removeTag     : '.amsify-remove-tag',
              readyToRemove : '.ready-to-remove',
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
           this.ajaxActive = false; 
           this.tagNames   = [];
        };

        AmsifySuggestags.prototype = {
            /**
             * Executing all the required settings
             * @param  {selector} form
             */
            _init : function(selector) {
                if(this.refresh(selector, method)) {
                  this.selector   = selector;
                  this.name       = ($(selector).attr('name'))? $(selector).attr('name')+'_amsify': 'amsify_suggestags';
                  this.createHTML();
                  this.setEvents();
                  $(this.selector).hide();
                  this.setDefault();
                }
            },

            createHTML : function() {
              var HTML                      = '<div class="'+this.classes.sTagsArea.substring(1)+'"></div>';
              this.selectors.sTagsArea      = $(HTML).insertAfter(this.selector);
              var labelHTML                 = '<div class="'+this.classes.inputArea.substring(1)+'"></div>';
              this.selectors.inputArea      = $(labelHTML).appendTo(this.selectors.sTagsArea);

              this.defaultLabel             = ($(this.selector).attr('placeholder') !== undefined)? $(this.selector).attr('placeholder'): this.defaultLabel;
              var sTagsInput                = '<input type="text" class="'+this.classes.sTagsInput.substring(1)+'" placeholder="'+this.defaultLabel+'">';
              this.selectors.sTagsInput     = $(sTagsInput).appendTo(this.selectors.inputArea).attr('autocomplete', 'off');

              var listArea              = '<div class="'+this.classes.listArea.substring(1)+'"></div>';
              this.selectors.listArea   = $(listArea).appendTo(this.selectors.sTagsArea);
              $(this.selectors.listArea).width($(this.selectors.sTagsArea).width()-3);

              var list                  = '<ul class="'+this.classes.list.substring(1)+'"></ul>';
              this.selectors.list       = $(list).appendTo(this.selectors.listArea);
              this.updateSuggestionList();
              this.fixCSS();
            },

            updateSuggestionList : function() {
              $(this.selectors.list).html('');
              $(this.createList()).appendTo(this.selectors.list);
            },         

            setEvents : function() {
              var _self = this;
              $(this.selectors.inputArea).attr('style', $(this.selector).attr('style'))
                                         .addClass($(this.selector).attr('class'));
              this.setTagEvents();
              $(window).resize(function(){
                $(_self.selectors.listArea).width($(_self.selectors.sTagsArea).width()-3);
              });
              this.setSuggestionsEvents();
              this.setRemoveEvent();
            },

            setTagEvents : function() {
              var _self = this;
              $(this.selectors.sTagsInput).focus(function(){
                $(this).closest(_self.classes.inputArea).addClass(_self.classes.focus.substring(1));
                if(settings.type == 'materialize') {
                  $(this).css({
                    'border-bottom': 'none',
                    '-webkit-box-shadow': 'none',
                    'box-shadow': 'none',
                  });
                }
              });
              $(this.selectors.sTagsInput).blur(function(){
                $(this).closest(_self.classes.inputArea).removeClass(_self.classes.focus.substring(1));
              });
              $(this.selectors.sTagsInput).keyup(function(e){
                var keycode = (e.keyCode ? e.keyCode : e.which);
                if(keycode == '13' || keycode == '188') {
                   var value = $.trim($(this).val().replace(/,/g , ''));
                   $(this).val('');
                  _self.addTag(value);
                } else if(keycode == '8' && !$(this).val()) {
                  var removeClass = _self.classes.readyToRemove.substring(1);
                  if($(this).hasClass(removeClass)) {
                    $item = $(this).closest(_self.classes.inputArea).find(_self.classes.tagItem+':last');
                    _self.removeTag($item, false);
                  } else {
                    $(this).addClass(removeClass);
                  }
                  $(_self.selectors.listArea).hide();
                } else if((settings.suggestions.length || _self.isSuggestAction()) && $(this).val()) {
                  $(this).removeClass(_self.classes.readyToRemove.substring(1));
                  _self.processWhiteList(keycode, $(this).val());
                }
              });
              $(this.selectors.sTagsArea).click(function(){
                $(_self.selectors.sTagsInput).focus();
              });
            },

            setSuggestionsEvents : function() {
              var _self = this;
              $(this.selectors.listArea).find(this.classes.listItem).hover(function(){
                $(_self.selectors.listArea).find(_self.classes.listItem).removeClass('active');
                $(this).addClass('active');
                $(_self.selectors.sTagsInput).val($(this).data('val'));
              }, function() {
                 $(this).removeClass('active');
              });
              $(this.selectors.listArea).find(this.classes.listItem).click(function(){
                 _self.addTag($(this).data('val'));
                 $(_self.selectors.sTagsInput).val('').focus();
              });
            },

            isSuggestAction : function() {
                return (settings.suggestionsAction && settings.suggestionsAction.url);
            },

            processAjaxSuggestion : function(value, keycode) {
              var _self           = this;
              var actionMethod    = this.getActionURL(settings.suggestionsAction.url);
              var params          = {existing: settings.suggestions, term: value };
              var ajaxConfig      = (settings.suggestionsAction.callbacks)? settings.suggestionsAction.callbacks: {};

              var ajaxFormParams  = {
                type        : 'POST',
                url         : actionMethod,
                data        : JSON.stringify(params),
                dataType    : 'json',
              };
              
              if(settings.suggestionsAction.beforeSend !== undefined && typeof settings.suggestionsAction.beforeSend == "function") {
                  ajaxFormParams['beforeSend'] = settings.suggestionsAction.beforeSend;
              }
              ajaxFormParams['success'] = function(data) {
                if(data && data.suggestions) {
                  settings.suggestions = $.extend(settings.suggestions, data.suggestions);
                  settings.suggestions = _self.unique(settings.suggestions);
                  _self.updateSuggestionList();
                  _self.setSuggestionsEvents();
                  _self.suggestWhiteList(value, keycode);
                }
                if(settings.suggestionsAction.success !== undefined && typeof settings.suggestionsAction.success == "function") {
                    settings.suggestionsAction.success(data);
                }
              };
              if(settings.suggestionsAction.error !== undefined && typeof settings.suggestionsAction.error == "function") {
                  ajaxFormParams['error'] = settings.suggestionsAction.error;
              }
              ajaxFormParams['complete'] = function(data) {
                if(settings.suggestionsAction.complete !== undefined && typeof settings.suggestionsAction.complete == "function") {
                    settings.suggestionsAction.complete(data);
                }
                _self.ajaxActive = false;
              };
              $.ajax(ajaxFormParams);
            },

            processWhiteList : function(keycode, value) {
              if(keycode == '40' || keycode == '38') {
                var type = (keycode == '40')? 'down': 'up';
                this.upDownSuggestion(value, type);
              } else {
                if(this.isSuggestAction() && !this.ajaxActive) {
                   this.ajaxActive = true;
                   this.processAjaxSuggestion(value, keycode);
                } else {
                  this.suggestWhiteList(value, keycode);
                }
              }
            },

            upDownSuggestion : function(value, type) {
              var _self     = this;
              var isActive  = false;
              $(this.selectors.listArea).find(this.classes.listItem+':visible').each(function(){
                   if($(this).hasClass('active')) {
                    $(this).removeClass('active');
                      if(type == 'up') {
                        $item = $(this).prevAll(_self.classes.listItem+':visible:first');
                      } else {
                        $item = $(this).nextAll(_self.classes.listItem+':visible:first');
                      }
                      if($item.length) {
                        isActive = true;
                        $item.addClass('active');
                        $(_self.selectors.sTagsInput).val($item.data('val'));
                      }
                    return false;
                   }
              });
              if(!isActive) {
                var childItem = (type == 'down')? 'first': 'last';
                $item = $(this.selectors.listArea).find(this.classes.listItem+':visible:'+childItem);
                if($item.length) {
                  $item.addClass('active');
                  $(_self.selectors.sTagsInput).val($item.data('val'));
                }
              }
            },

            suggestWhiteList : function(value, keycode) {
              var _self = this;
              var found = false;
              $(this.selectors.listArea).find(this.classes.listItem).each(function(){
                if(~$(this).attr('data-val').toLowerCase().indexOf(value.toLowerCase()) && $.inArray($(this).attr('data-val'), _self.tagNames) === -1) {
                  $(this).show();
                  found = true;
                } else {
                  $(this).hide();
                }
              });
              if(found) {
                $(this.selectors.listArea).show();
                /**
                 * If only one item left in whitelist suggestions
                 */
                $item = $(this.selectors.listArea).find(this.classes.listItem+':visible');
                if($item.length == 1 && keycode != '8') {
                  if((settings.whiteList && this.isSimilarText(value.toLowerCase(), $item.data('val').toLowerCase(), 40)) || this.isSimilarText(value.toLowerCase(), $item.data('val').toLowerCase(), 60)) {
                    $item.addClass('active');
                    $(this.selectors.sTagsInput).val($item.data('val'));
                  }
                } else {
                  $item.removeClass('active');
                }
              } else {
                $(this.selectors.listArea).hide();
              }
            },

            setDefault : function() {
              var _self = this;
              var items = $(this.selector).val().split(',');
              if(items.length) {
                $.each(items, function(index, item){
                  _self.addTag($.trim(item));
                });
              }
            },

            setRemoveEvent: function() {
              var _self = this;
              $(this.selectors.inputArea).find(this.classes.removeTag).click(function(e){
                  e.stopImmediatePropagation();
                  $tagItem = $(this).closest(_self.classes.tagItem);
                  _self.removeTag($tagItem, false);
              });
            },

            createList : function() {
              var _self     = this;
              var listHTML  = '';
              $.each(settings.suggestions, function(index, item){
                  listHTML += '<li class="'+_self.classes.listItem.substring(1)+'" data-val="'+item+'">'+item+'</li>';
              });
              return listHTML;
            },

            addTag : function(value) {
              if(!value) return;
              var html  = '<span class="'+this.classes.tagItem.substring(1)+'" data-val="'+value+'">'+value+' '+this.setIcon()+'</span>';
              $item = $(html).insertBefore($(this.selectors.sTagsInput));
              if(settings.tagLimit != -1 && settings.tagLimit > 0 && this.tagNames.length >= settings.tagLimit) {
              	this.animateRemove($item, true);
                this.flashItem(value);
                return false;
              }
              var itemKey = $.inArray(value, settings.suggestions);
              if(settings.whiteList && itemKey === -1) {
                this.animateRemove($item, true);
                this.flashItem(value);
                return false;
              }
              if(this.isPresent(value)) {
                this.animateRemove($item, true);
                this.flashItem(value);
              } else {
                this.customStylings($item, itemKey);
                this.tagNames.push(value);
                this.setRemoveEvent();
                this.setInputValue();
                if(settings.afterAdd && typeof settings.afterAdd == "function") {
                  settings.afterAdd(value);
                }
              }
              $(this.selector).trigger('suggestags.add', [value]);
              $(this.selectors.listArea).find(this.classes.listItem).removeClass('active');
              $(this.selectors.listArea).hide();
              $(this.selectors.sTagsInput).removeClass(this.classes.readyToRemove.substring(1));
            },

            isPresent : function(value) {
              var present = false;
              $.each(this.tagNames, function(index, tag){
                if(value.toLowerCase() == tag.toLowerCase()) {
                  present = true;
                  return false;
                }
              });
              return present;
            },

            customStylings : function(item, key) {
              var isCutom = false;
              if(settings.classes[key]) {
                isCutom = true;
                $(item).addClass(settings.classes[key]);
              }
              if(settings.backgrounds[key]) {
                isCutom = true;
                $(item).css('background', settings.backgrounds[key]);
              }
              if(settings.colors[key]) {
                isCutom = true;
                $(item).css('color', settings.colors[key]);
              }
              if(!isCutom) $(item).addClass(this.classes.colBg.substring(1));
            },

            removeTag : function(item, animate) {
              this.tagNames.splice($(item).index(), 1);
              this.animateRemove(item, animate);
              this.setInputValue();
              $(this.selector).trigger('suggestags.remove', [$(item).attr('data-val')]);
              if(settings.afterRemove && typeof settings.afterRemove == "function") {
                settings.afterRemove($(item).attr('data-val'));
              }
              $(this.selectors.sTagsInput).removeClass(this.classes.readyToRemove.substring(1));
            },

            animateRemove : function(item, animate) {
              $(item).addClass('disabled');
              if(animate) {
                setTimeout(function(){
                  $(item).slideUp();
                  setTimeout(function(){
                    $(item).remove();
                  }, 500);
                }, 500);
              } else {
                $(item).remove();
              }
            },

            flashItem : function(value) {
              $item  = '';
              $(this.selectors.sTagsArea).find(this.classes.tagItem).each(function(){
                var tagName = $.trim($(this).attr('data-val'));
                if(value.toLowerCase() == tagName.toLowerCase()) {
                  $item = $(this);
                  return false;
                }
              });
              if($item) {
                $item.addClass('flash');
                setTimeout(function(){
                  $item.removeClass('flash');
                }, 1500);
              }
            },

            setIcon : function() {
              var removeClass = this.classes.removeTag.substring(1);
              if(settings.type == 'bootstrap') {
                return '<span class="fa fa-times '+removeClass+'"></span>';
              } else if(settings.type == 'materialize') {
                return '<i class="material-icons right '+removeClass+'">clear</i>';
              } else {
                return '<b class="'+removeClass+'">&#10006;</b>';
              }
            },

            setInputValue: function() {
              $(this.selector).val(this.tagNames.join(','));
              this.printValues();
            },

            fixCSS : function() {
              if(settings.type == 'amsify') {
                $(this.selectors.inputArea).addClass(this.classes.inputAreaDef.substring(1)).css({'padding': '5px 5px'});
              } else if(settings.type == 'materialize') {
                $(this.selectors.inputArea).addClass(this.classes.inputAreaDef.substring(1)).css({'height': 'auto', 'padding': '5px 5px'});
                $(this.selectors.sTagsInput).css({'margin': '0', 'height': 'auto'});
              }
            },

            printValues : function() {
              console.info(this.tagNames, $(this.selector).val());
            },

            refresh : function(selector, method) {
              $findTags = $(selector).next(this.classes.sTagsArea);
              if($findTags.length)  $findTags.remove();
              $(selector).show();
              if(typeof method !== undefined && method == 'destroy') {
                return false;
              } else {
                return true;
              }
            },

            getActionURL : function(urlString) {
              var URL = window.location.protocol+'//'+window.location.host;
              if(this.isAbsoluteURL(urlString)) {
                URL = urlString;
              } else {
                URL += '/'+urlString.replace(/^\/|\/$/g, '');
              }
              return URL;
            },

            isAbsoluteURL : function(urlString) {
              var regexURL  = new RegExp('^(?:[a-z]+:)?//', 'i');
              return (regexURL.test(urlString))? true: false;
            },

            unique: function(list) {
              var result = [];
              $.each(list, function(i, e) {
                if ($.inArray(e, result) == -1) result.push(e);
              });
              return result;
            },

            isSimilarText: function(str1, str2, perc) {
              var percent = this.similarity(str1, str2);
              return (percent*100 >= perc)? true: false;
            },

            similarity: function(s1, s2) {
              var longer = s1;
              var shorter = s2;
              if(s1.length < s2.length) {
                longer = s2;
                shorter = s1;
              }
              var longerLength = longer.length;
              if(longerLength == 0) {
                return 1.0;
              }
              return (longerLength - this.editDistance(longer, shorter))/parseFloat(longerLength);
            },

            editDistance: function(s1, s2) {
              s1 = s1.toLowerCase();
              s2 = s2.toLowerCase();
              var costs = new Array();
              for(var i = 0; i <= s1.length; i++) {
                var lastValue = i;
                for(var j = 0; j <= s2.length; j++) {
                  if(i == 0) {
                    costs[j] = j;
                  } else {
                    if(j > 0) {
                      var newValue = costs[j - 1];
                      if(s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                      }
                    }
                  }
                if(i > 0)
                  costs[s2.length] = lastValue;
              }
             return costs[s2.length];
           }
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