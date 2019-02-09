var editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight");
editor.session.setMode("ace/mode/python");

$(".run-program").click(function () {
    console.log("Test")
    runit();
})

$(document).keydown(function (e) {
    if (e.which == 17) {
        isCtrl = true;
    }
    if (e.which == 73 && isCtrl) {
        $(".form-control").focus();
        startVoice()
    }
});

function startVoice() {
    
}