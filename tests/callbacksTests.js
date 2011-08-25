module("Callbacks tests");

test('Window onSideClick() callback overwrites the overlay click and close', function () {
    $('<p>Close win on overlay click with onSideClick() callback.</p>').doomWindows({
        width: 400,
        height: 300,
        wrapperId: 'overlay-window',
        onSideClick: function () {
            $self = $(this);
            $self.close();
        }
    });
    $('.doom-win-overlay').click();
    equal($('.doom-win-overlay').length, 0, 'The overlay doesn\'t exist anymore');
    equal($('#overlay-window').length, 0, 'Window with id #overlay-window was closed by onSideClick() callback');
});