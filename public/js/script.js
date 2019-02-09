$('.run-program').click(function () {
    runit();
});

// Keyboard shortcuts
$(document).keydown(function (e) {
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
        $(".form-control").blur();
        editor.focus();
        runCommand($("#scriptBox").val());
        $("#scriptBox")
            .css("color", "#2e9dc6")
            .delay(300)
            .queue(function (next) {
                $(this).css("color", "rgba(255, 255, 255, 0)");
                next();
            })
            .delay(1000)
            .queue(function (next) {
                $(this).val("");
                $(this).css("color", "white");
                next();
            })
        return false;
    }
}

function pythonSuccess() {
    $("#output").css("color", "white")
}

function pythonError() {
    $("#output").css("color", "red")
}
