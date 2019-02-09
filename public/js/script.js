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
/*
function startVoice() {
    
}*/

editor.insert("hello\nmy\nname\nis\njason\nhi");

interpretVoice("go to line 3");

function interpretVoice(command) {

    editor.insert("suh");
    if(command.includes("go to")) {
        voiceGoTo(command);
        editor.insert("dude");
    }
    else if(command.includes("read")) {
        voiceRead(command);
    }
    else if(command.includes("new")) {
        voiceMakeNew(command);
    }
}

//figures out where to go, given the string command
function voiceGoTo(command) {
    if(command.includes("line")) {

        editor.insert("my guy");
        if(command.length > command.indexOf("line") + 4) {
            index = command.indexOf("line") + 5;
            editor.insert("ugh");
        }

        lineNum = parseInt(command.subString(index, command.length - 1));

        editor.insert("hi");

        if(command.includes("end"))
            goToLine(lineNum, 1);

        goToLine(lineNum, 0);
    }
    if(command.includes("loop")) {
        goToCheckpoint(command);
    }
    if(command.includes("next")) {
        goToObject(command);
    }
}

//goes to specific line
//loc 0 = start, loc 1 = end
function goToLine(lineNum, loc) {
    const editor = this.ace.editor;

    if(loc == 0) {
        editor.goToLine(lineNum);
        editor.insert(toString(lineNum));
    }
    //goes to line below and then goes 
    //to the left once (to go to end of prev line)
    else if(loc == 1) {
        editor.goToLine(lineNum + 1);
        editor.navigateLeft(1);
    }
}


function goToCheckpoint(command) {
    //TODO
}


function voiceRead(command) {
    //TODO
}

function read(from_line, from_col, to_line, to_col)
{
    const editor = this.ace.editor;
    return editor.env.document.getTextRange(new Range(from_line, from_col, to_line, to_col));
}