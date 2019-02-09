var checkpointNames = [];

editor.insert("hello\nmy\nname\nis\njason\nhi");
console.log(read(1, 5, 2, 4));


interpretVoice("go to next for loop");

function interpretVoice(command) {

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
            let line = editor.findNext(" for ").line;
            let col = editor.findNext(" for ").col;

            editor.insert(line.toString() + "\n" + col.toString());
        }
        else if(command.includes("while")) {
            let line = edit
        }
    }
}


function read(from_line, from_col, to_line, to_col)
{
    return document;
}