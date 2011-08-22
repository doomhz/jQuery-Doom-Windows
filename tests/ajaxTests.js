var htmlContent = '<h1>Log In</h1><form><div><label>Username</label><input type="text" value="" name="username" /></div><div><label>Password</label><input type="text" value="" name="password" /></div><div><button type="submit">Log in</button></div></form>'.replace(/ /g, '').replace(/\//g, '');

module("Load remote content",
    {
        setup: function() {
            $('').doomWindows({
                width: 400,
                height: 300,
                wrapperId: 'remote-window',
                ajaxUrl: '../remote_example.html',
                buttonClick : function (btType, win) {
                    btType === 'close' && win.close();
                    btType === 'ok' && win.close();
                }
            });
        },
        teardown: function() {
            $('.doom-win-overlay').remove();
            $('.doom-win').remove();
            $(window).unbind('resize').unbind('keydown');
        }
    }
);

asyncTest('Open a window 400x300 with remote HTML content', function () {
    equal($('.doom-win-overlay').length, 1, 'The overlay exists');
    var $textWindow = $('#remote-window');
    equal($textWindow.length, 1, 'Window wrapper element exists and has the id #text-window');
    equal($('.doom-win').length, 1, 'Window wrapper element exists and has the class .doom-win');
    equal($textWindow.find('.doom-win-bt-cnt-header').length, 1, 'The header buttons are in place');
    var $winContent = $textWindow.find('.doom-win-content');
    equal($winContent.length, 1, 'The content is in place');
    equal($winContent.width(), 400, 'The width is 400px');
    equal($winContent.height(), 300, 'The height is 300px');
    equal($textWindow.find('.doom-win-bt-cnt').length, 1, 'The footer buttons are in place');
    
    ok($textWindow.find('div.doom-win-content').hasClass('doom-win-ajax-loading'), 'doom-win-ajax-loading class is present when the ajax request starts');
    
    setTimeout(function() {
        var winContent = '<div class="doom-win-bt-cnt-header"><ul class="doom-win-bt-list"><li class="doom-win-bt-close"><button data-type="close"><span>Close</span></button></li></ul></div><div class="doom-win-content" style="width: 400px; height: 300px; ">' + htmlContent + '</div><div class="doom-win-bt-cnt"><ul class="doom-win-bt-list"><li class="doom-win-bt-ok"><button data-type="ok"><span>Ok</span></button></li></ul></div>';
        winContent = winContent.replace(/ /g, '').replace(/\//g, '');
        equal($textWindow.html().replace(/\n/g, '').replace(/\t/g, '').replace(/ /g, '').replace(/\//g, ''), winContent, 'The entire window structure is is stable:' + winContent);
        start();
    }, 500);
});