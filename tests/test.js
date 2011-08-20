var htmlContent = '<p>Great success!</p>';

module("Core functionality",
    {
        setup: function() {
            $(htmlContent).doomWindows({
                width: 400,
                height: 300,
                wrapperId: 'text-window',
                buttonClick : function (btType, win) {
                    btType === 'close' && win.close();
                    btType === 'ok' && win.close();
                }
            });
    	},
        teardown: function() {
    	    $('.doom-win-overlay').remove();
            $('.doom-win').remove();
	    }
    }
);

test('Open a window 400x300 with HTML content', function () {
    equal($('.doom-win-overlay').length, 1, 'The overlay exists');
    var $textWindow = $('#text-window');
    equal($textWindow.length, 1, 'Window wrapper element exists and has the id #text-window');
    equal($('.doom-win').length, 1, 'Window wrapper element exists and has the class .doom-win');
    equal($textWindow.find('.doom-win-bt-cnt-header').length, 1, 'The header buttons are in place');
    var $winContent = $textWindow.find('.doom-win-content');
    equal($winContent.length, 1, 'The content is in place');
    equal($winContent.width(), 400, 'The width is 400px');
    equal($winContent.height(), 300, 'The height is 300px');
    equal($winContent.html(), htmlContent, 'The content is ' + htmlContent);
    equal($textWindow.find('.doom-win-bt-cnt').length, 1, 'The footer buttons are in place');
});

test('Window closes on header close button', function () {
    var $textWindow = $('#text-window');
    var $closeBt = $textWindow.find('.doom-win-bt-cnt-header button[data-type="close"]');
    equal($closeBt.length, 1, 'The CLOSE button is in place');
    $closeBt.trigger('click');
    equal($('.doom-win-overlay').length, 0, 'The overlay doesn\'t exist anymore');
    equal($('#text-window').length, 0, 'Window with id #text-window doesn\'t exist anymore');
});

test('Window closes on footer close button', function () {
    var $textWindow = $('#text-window');
    var $okBt = $textWindow.find('.doom-win-bt-cnt button[data-type="ok"]');
    equal($okBt.length, 1, 'The OK button is in place');
    $okBt.trigger('click');
    equal($('.doom-win-overlay').length, 0, 'The overlay doesn\'t exist anymore');
    equal($('#text-window').length, 0, 'Window with id #text-window doesn\'t exist anymore');
});

test('Window closes on overlay click', function () {
    var $textWindow = $('#text-window');
    $('.doom-win-overlay').click();
    equal($('.doom-win-overlay').length, 0, 'The overlay doesn\'t exist anymore');
    equal($('#text-window').length, 0, 'Window with id #text-window doesn\'t exist anymore');
});

test('Window closes on ESC key press', function () {
    var $textWindow = $('#text-window');
    
    var event = $.Event('keydown');
    event.keyCode = 27;
    $(window).trigger(event);
    
    equal($('.doom-win-overlay').length, 0, 'The overlay doesn\'t exist anymore');
    equal($('#text-window').length, 0, 'Window with id #text-window doesn\'t exist anymore');
    
    // TODO Verify if the window event has been removed
});