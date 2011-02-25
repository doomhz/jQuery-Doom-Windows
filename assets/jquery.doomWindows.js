/**
 * Jquery Doom Windows Plugin
 *
 * @author Dumitru Glavan
 * @version 1.0
 *
 */
(function ($) {

	$.fn.doomWindows = function (options) {
		this.config = {styles: {
						   width: 'auto',
						   height: 'auto',
						   position: 'absolute',
						   'z-index': 999,
						   top: false,
						   left: false
					   },
					   overlay: true,
					   wrapp: true,
					   wrapperClass: 'doom-win',
					   wrapperId: false,
					   wrapperHtml: '<div><div class="doom-win-content"></div></div>',
					   buttons: {
						   ok:'Ok'
					   },
					   buttonsTranslate: globalParams.dialogMessages,
					   buttonsWrapperHtml: '<div class="doom-win-bt-cnt"><ul class="doom-win-bt-list">{buttons}</ul></div>',
					   buttonHtml: '<li class="doom-win-bt-{buttonType}"><button data-type="{buttonType}">{buttonText}</button></li>',
					   buttonClick: null,
					   ajaxUrl: null,
					   afterAjax: null,
					   ajaxData: null
				  };
		$.extend(this.config, options);

		var self = this;
		var $self = $(this);

		if (self.config.wrapp) {
			var wrapper = $(self.config.wrapperHtml);
			self.winContent = $('.doom-win-content', wrapper);
			self.winContent.html($self);
			if (self.config.wrapperId) {
				wrapper.attr('id', self.config.wrapperId);
			}
			wrapper.addClass(self.config.wrapperClass || '');
			wrapper.prependTo('body:first');
			self.config.wrapp = false;
			return wrapper.doomWindows(self.config);
		}

		var lastZIndex = self.getLastIndexStack();

		if (self.config.overlay) {
			lastZIndex++;
			$('<div class="doom-win-overlay"></div>').css({position: 'absolute',
														   'z-index': lastZIndex,
														   width: '100%',
														   height: $(window).height() + $(window).attr('scrollMaxY')
														  }).prependTo('body:first');
		}

		self.winContent = $('.doom-win-content', $self);

		lastZIndex++;
		self.config.styles['z-index'] = lastZIndex;
		$self.css(self.config.styles);
		$self.css({top:self.config.styles.top || self.getMiddlePosition().top});
		$self.css({left:self.config.styles.left || self.getMiddlePosition().left});

		if (typeof(self.config.buttons) === 'object') {
			var buttons = '';
			$.each(self.config.buttons, function (key, text) {
				text = self.config.buttonsTranslate[key] || text;
				buttons += self.config.buttonHtml.replace(/{buttonType}/g, key).replace(/{buttonText}/g, text);
			});
			buttons = $(self.config.buttonsWrapperHtml.replace('{buttons}', buttons));
			buttons.appendTo(self);
			if (typeof(self.config.buttonClick) === 'function') {
				$('button', buttons).each(function (index, el) {
					$(el).click(function (ev) {
						self.config.buttonClick($(this).attr('data-type'), $self, ev, this);
					});
				});
			}
		}

		self.config.ajaxUrl = $self.attr('data-url') || self.config.ajaxUrl;
		
		if (self.config.ajaxUrl) {
			self.winContent.addClass('doom-win-ajax-loading');
			self.winContent.load(self.config.ajaxUrl, self.config.ajaxData, function (response) {
				self.winContent.removeClass('doom-win-ajax-loading');
				$.isFunction(self.config.afterAjax) && self.config.afterAjax(response);
				$(window).trigger('resize');
			});
		}

		$(window).resize(
			function () {
				$self.css({top:self.config.styles.top || self.getMiddlePosition().top});
				$self.css({left:self.config.styles.left || self.getMiddlePosition().left});
			}
		);

		$(this).data('_self', this);

		return $(this);
	},

	$.fn.getMiddlePosition = function () {
		var self = $(this) || $(this).data('_self');
		return {top: parseInt(($(window).height() - self.height()) / 2)  + 'px',
				left: parseInt(($(window).width() - self.width()) / 2)  + 'px'};
	},

	$.fn.getLastIndexStack = function () {
		var self = this || $(this).data('_self');
		var index = parseInt($('.doom-win:eq(1)').css('z-index')) || self.config.styles['z-index'];
		return index;
	},

	$.fn.close = function () {
		var self = $(this) || $(this).data('_self');
		self.remove();
		$('.doom-win-overlay:first').remove();
	},

	dWindow = function (options) {
		options = $.extend({buttons: {close:'Close'}}, options);
		options.buttonClick = typeof(options.buttonClick) === 'function' ? options.buttonClick : function (btType, win) {win.close();};
		$('').doomWindows(options);
	},

	dAlert = function (message, callback) {
		callback = typeof(callback) === 'function' ? callback : function (btType, win) {win.close();};
		$('<p class="d-alert-msg">' + message + '</p>').doomWindows({buttons: {close:'Close'}, buttonClick: callback});
	},

	dConfirm = function (message, callback) {
		callback = typeof(callback) === 'function' ? callback : function (btType, win) {if (btType === 'no') {win.close();}};
		$('<p class="d-confirm-msg">' + message + '</p>').doomWindows({buttons: {yes:'Yes', no:'No'}, buttonClick: callback});
	},

	dPrompt = function () {
		alert('Sorry, not yet. :)');
	}

})(jQuery);