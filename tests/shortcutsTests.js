module("Windows shortcut functions");

test('An alert window is displayed and closed properly with dAlert()', function () {
    dAlert('Great success!');
    $alert = $('.doom-win-alert');
    equals($('.doom-win-alert').length, 1, 'An alert is displayed')
    var alertContent = '<div class="doom-win-bt-cnt-header"><ul class="doom-win-bt-list"><li class="doom-win-bt-close"><button data-type="close"><span>Close</span></button></li></ul></div><div class="doom-win-content" style="width: auto; height: auto; "><p class="d-alert-msg">Great success!</p></div>';
    equals($alert.html(), alertContent, 'The alert structure is in place');
    $alert.find('button[data-type="close"]').click();
    equals($('.doom-win-alert').length, 0, 'The alert is closed')
});

test('A confirm window is displayed and closed properly with dConfirm()', function () {
    dConfirm('Great success?');
    $confirm = $('.doom-win-confirm');
    equals($('.doom-win-confirm').length, 1, 'A confirmation window is displayed')
    var confirmContent = '<div class="doom-win-bt-cnt-header"><ul class="doom-win-bt-list"><li class="doom-win-bt-close"><button data-type="close"><span>Close</span></button></li></ul></div><div class="doom-win-content" style="width: auto; height: auto; "><p class="d-confirm-msg">Great success?</p></div><div class="doom-win-bt-cnt"><ul class="doom-win-bt-list"><li class="doom-win-bt-yes"><button data-type="yes"><span>Yes</span></button></li><li class="doom-win-bt-no"><button data-type="no"><span>No</span></button></li></ul></div>';
    equals($confirm.html(), confirmContent, 'The confirm window structure is in place');
    $confirm.find('button[data-type="close"]').click();
    equals($('.doom-win-confirm').length, 0, 'The confirm window is closed')
});

test('Confirm window YES button reacts', function () {
    dConfirm('Great success?', function (btType, win) {
        (btType === 'no' || btType === 'close') && win.close();
        if (btType === 'yes') {
            $('body').append('<div id="confirm-ok"></div>');
            win.close();
        }
    });
    $confirm = $('.doom-win-confirm');
    equals($('.doom-win-confirm').length, 1, 'A confirmation window is displayed')
    $confirm.find('button[data-type="yes"]').click();
    equals($('#confirm-ok').length, 1, 'A div #confirm-ok was appended to body on YES button press');
    equals($('.doom-win-confirm').length, 0, 'The confirm window is closed');
    $('#confirm-ok').remove();
});

test('Confirm window NO button reacts', function () {
    dConfirm('Great success?');
    $confirm = $('.doom-win-confirm');
    equals($('.doom-win-confirm').length, 1, 'A confirmation window is displayed')
    $confirm.find('button[data-type="no"]').click();
    equals($('.doom-win-confirm').length, 0, 'The confirm window is closed')
});

test('The dWindow() shortcut opens a popup window', function () {
    dWindow('<p>Great success!</p>');
    var $win = $('.doom-win');
    equals($win.length, 1, 'A window is opened and displayed');
    var winContent = '<div class="doom-win-bt-cnt-header"><ul class="doom-win-bt-list"><li class="doom-win-bt-close"><button data-type="close"><span>Close</span></button></li></ul></div><div class="doom-win-content" style="width: auto; height: auto; "><p>Great success!</p></div>';
    equals($win.html(), winContent, 'The popup structure is in place');
    $win.find('button[data-type="close"]').click();
    equals($('.doom-win').length, 0, 'The window is closed')
});