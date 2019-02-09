var editor = ace.edit("editor");
var session = editor.getSession();
var aceDoc = session.getDocument();

var checkpointNames = [];

for(let i = 0; i < 20; i++)
    editor.insert("test " + (i + 1) + "\n");


editor.gotoLine(10);
editor.insert("for i in range(5)\n");
editor.indent();
editor.insert("x = 1\n");


function runCommand(command) {

    command.trim();
    command.toLowerCase();

    if(command.includes("go to")) {
        voiceGoTo(command);
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

        let index = 0;

        if(command.length > command.indexOf("line") + 4) {
            index = command.indexOf("line") + 5;
        }

        let lineNum = parseInt(command.substring(index, command.length));

        let lastLine = editor.session.getLength();

        if(lineNum > lastLine) {
            //TODO: say "line __ does not exist. Last line is __."
        }

        if(command.includes("end")) {
            goToLine(lineNum, 1);
        }

        goToLine(lineNum, 0);
    }
    else if(command.includes("loop") || command.includes("checkpoint")) {
        goToCheckpoint(command);
    }
    else if(command.includes("next")) {
        goToObject(command);
    }
}

//goes to specific line
//loc 0 = start, loc 1 = end
function goToLine(lineNum, loc) {
    if(loc == 0) {
        editor.gotoLine(lineNum);
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


function goToObject(command) {
    if(command.includes("loop")) {

        //if user mentions a checkpoint, goes to it
        for(let name in checkpointNames) {
            if(command.includes(name)) {
                goToCheckpoint(name);
            }
        }

        //otherwise, goes to next loop
        if(command.includes("for")) {
            let line = editor.findNext(" for ").startRow;
            let col = editor.findNext(" for ").startColumn;

            editor.insert(line.toString() + "\n" + col.toString());
        }
        else if(command.includes("while")) {
            //TODO
        }
    }
}


function voiceRead(command) {
    if(command.includes("line")) {
        //TODO
    }
}


function read(read_range)
{
    console.log(read_range)
    return aceDoc.getTextRange(read_range);
}