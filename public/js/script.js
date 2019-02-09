$('.run-program').click(function() {
    runit();
});

// Keyboard shortcuts
$(document).keydown(function(e) {
    // Click "ESC" to switch between command bar and input
    if (e.which == 27 && $('.form-control').is(':focus') == false) {
        $('.form-control').focus();
        startVoice();
    } else if (e.which == 27) {
        $('.ace_content').focus();
        endVoice();
    }
});

function commandEntered(e) {
    if (e.keyCode == 13) {
        runCommand($('#scriptBox').val());
        return false;
    }
}
