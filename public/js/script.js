var editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight");
editor.session.setMode("ace/mode/python");
var session = editor.getSession();
var document = session.getDocument();

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
console.log(read(1, 5, 2, 4));

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

        lineNum = parseInt(command.substring(index, command.length - 1));

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

    if(loc == 0) {
        editor.gotoLine(lineNum);
        editor.insert(toString(lineNum));
    }
    //goes to line below and then goes 
    //to the left once (to go to end of prev line)
    else if(loc == 1) {
        editor.gotoLine(lineNum + 1);
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
    return document;
}