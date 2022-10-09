function moveup() {
    myGamePiece.speedY = -1;
}

function movedown() {
    myGamePiece.speedY = 1;
}

function moveleft() {
    myGamePiece.speedX = -5;
}

function moveright() {
    myGamePiece.speedX = 5;
}

function clearmoveX() {
    myGamePiece.speedX = 0;
}

function clearmoveY() {
    myGamePiece.speedY = 0;
}

window.onkeydown = (e) => {
    e = e || window.event;
    // if (e.keyCode === 38) {
    //     moveup();
    // } else if (e.keyCode === 40) {
    //     movedown();
    // } else 
    if (e.keyCode === 37) {
        moveleft();
    } else if (e.keyCode === 39) {
        moveright();
    }
}

window.onkeyup = (e) => {
    e = e || window.event;
    // if (e.keyCode === 38) {
    //     clearmoveY();
    // } else if (e.keyCode === 40) {
    //     clearmoveY();
    // } else 
    if (e.keyCode === 37) {
        clearmoveX();
    } else if (e.keyCode === 39) {
        clearmoveX();
    }
}