var editor = ace.edit("editor");

editor.setTheme("ace/theme/twilight");
editor.session.setMode("ace/mode/python");

let session = editor.getSession();
let aceDoc = session.getDocument();

let checkpointNames = [];

for (let i = 0; i < 20; i++)
    editor.insert("test " + (i + 1) + "\n");

editor.gotoLine(10);
editor.insert("for i in range(5)\n");
editor.indent();
editor.insert("x = 1\n");

function giveFeedback(text) {
    return text;
}

function runCommand(command) {
    if (command.includes("run")) {
        runit();
    } else if (command.includes("go to")) {
        commandGoTo(command);
    } else if (command.includes("read")) {
        commandRead(command);
    } else if (command.includes("new") || command.includes("make")) {
        commandMake(command);
    } else if (command.includes("save")) {
        commandSaveFile(command)
    }
}

//saves a file, given the name
function commandSaveFile(command) {
    if (command.includes("as")) {
        fileName = command.substring(command.indexOf("as") + 3, command.length);
        if (fileName.includes(".py")) {
            fileName = fileName.split(".py")[0]
        }
        downloadFile(fileName)
    } else {
        downloadFile("script")
    }
}

//figures out where to go, given the string command
function commandGoTo(command) {
    if (command.includes("line")) {

        let lineNum = getLineFromCommand(command);

        if (lineNum >= 0) {

            if (command.includes("end")) {
                goToLine(lineNum, 1);
            } else
                goToLine(lineNum, 0);
        }
    } else if (command.includes("next")
                || command.includes("loop")
                || command.includes("checkpoint")) {
        goToObject(command);
    }
}

//goes to specific line
//loc 0 = start, loc 1 = end
function goToLine(lineNum, loc) {
    if (loc == 0) {
        editor.gotoLine(lineNum);
    }
    //goes to line below and then goes 
    //to the left once (to go to end of prev line)
    else if (loc == 1) {
        let lastLine = editor.session.getLength();

        editor.gotoLine(lineNum + 1);
        editor.navigateLeft(1);
    }
}

function getLineFromCommand(command) {
    let index = 0;

    if (command.length > command.indexOf("line") + 4) {
        index = command.indexOf("line") + 5;
    }

    let lineNum = parseInt(command.substring(index, command.length));

    let lastLine = editor.session.getLength();

    if (lineNum > lastLine) {
        giveFeedback("Line " + lineNum.toString() + " does not exist. Last line is " + lastLine.toString());
        return -1;
    }

    return lineNum;
}

function getLineLength(lineNum) {
    //TODO
}


function goToObject(command) {
    if (command.includes("loop")) {

        //if user mentions a checkpoint, goes to it
        for (let name in checkpointNames) {
            if (command.includes(name)) {
                giveFeedback("Going to loop checkpoint " + name);
                goToCheckpoint("loop", name);
            }
        }

        //otherwise, goes to next for loop
        if (command.includes("for")) {
            let line = editor.findNext("for ").startRow;
            let col = editor.findNext("for ").startColumn;

            editor.insert(line.toString() + "\n" + col.toString());
        } else if (command.includes("while")) {
            //TODO
        }
    } else if (command.includes("checkpoint")) {
        for (let name of checkpointNames) {
            if(command.includes(name)) {
                giveFeedback("Going to checkpoint " + name);
                editor.insert(" Going to checkpoint " + name + "...");
                goToCheckpoint("checkpoint", name);
            }
        }
    }
}

function commandRead(command) {
    if (command.includes("this line") || command.includes("current line")) {
        let line = editor.getCursorPosition().row + 1;

    }
}

function commandMake(command) {
    if (command.includes("checkpoint")) {
        let index = command.indexOf("checkpoint");
        if (command.length > index + 10) {

            let line = editor.getCursorPosition().row + 1;

            makeCheckpoint("checkpoint", command.substring(index + 11), line);
        }
    }
}

function read(read_range) {
    return aceDoc.getTextRange(read_range);
}

function makeCheckpoint(type, name, line) {
    goToLine(line, 1);
    let cursorPosition = editor.getCursorPosition();
    let symbol = " ~ ";
    let comment = "#" + symbol + type + ": \"" + name + "\"";

    session.insert(cursorPosition, comment);
    checkpointNames.splice(0, 0, name)
}

function goToCheckpoint(type, name) {
    let allLines = [];
    allLines = aceDoc.getAllLines().slice();
    let symbol = " ~ ";
    let comment = "#" + symbol + type + ": \"" + name + "\"";

    for (let i = 0; i < allLines.length; i++) {
        if (allLines[i].includes(comment)) {
            goToLine(i + 2);
            giveFeedback("Now at " + type + " " + name);
        }
    }
    giveFeedback("That " + type + " does not exist")
}
