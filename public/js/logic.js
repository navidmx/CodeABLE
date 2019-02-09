var editor = ace.edit("editor");
var session = editor.getSession();
var aceDoc = session.getDocument();

var checkpointNames = [];

for(let i = 0; i < 20; i++)
    editor.insert("test " + (i + 1) + "\n");

editor.insert(" for ");


//console.log(read(1, 5, 2, 4));


runCommand("go to next for loop");

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

        lineNum = getLineFromCommand(command);

        if(lineNum >= 0)

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

    //TODO: this is ambiguous, user could say "read lines 5 to 7" and it would
    //just read line 5
    if(command.includes("line")) {
        
        let lineNum = getLineFromCommand(command);


    }
}


function getLineFromCommand(command) {
    let index = 0;

    if(command.length > command.indexOf("line") + 4) {
        index = command.indexOf("line") + 5;
    }

    let lineNum = parseInt(command.substring(index, command.length));

    let lastLine = editor.session.getLength();

    if(lineNum > lastLine) {
        //TODO: say "line __ does not exist. Last line is __."
        return -1;
    }

    return lineNum;
}


function read(from_line, from_col, to_line, to_col)
{
   // const read_range = new Range(from_line, from_col, to_line, to_col)
   // return aceDoc.getTextRange(read_range);
}