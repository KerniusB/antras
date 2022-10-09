var myGamePiece;
var myObstacles = [];
var myCoins = [];
var score = 0;

function startGame() {
    myGamePiece = new component(32, 23, "Chest.png", 0, 247, "image");
    myGameArea.start();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }

    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, y;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            gameOverScreen();
            return;
        }
    }

    for (i = 0; i < myCoins.length; i += 1) {
        if (myGamePiece.crashWith(myCoins[i])) {
            myCoins.splice(i, 1);
            score = score + 1
            console.log(score);
            return;
        }
    }

    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = Math.round(Math.random() * myGameArea.canvas.width);
        y = 0;
        myObstacles.push(new component(12, 15, "Potion01.png", x, y, "image"));
    }

    if (myGameArea.frameNo == 1 || everyinterval(50)) {
        x = Math.round(Math.random() * myGameArea.canvas.width);
        y = 0;
        myCoins.push(new component(10, 10, "Coin.png", x, y, "image"));
    }

    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].y += 1;
        myObstacles[i].update();
    }

    for (i = 0; i < myCoins.length; i += 1) {
        myCoins[i].y += 1;
        myCoins[i].update();
    }
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) { return true; }
    return false;
}

function gameOverScreen() {
    myGameArea.clear();
    ctx = myGameArea.context;
    ctx.font = '30px Arial';
    ctx.textAlign = "center";
    ctx.fillStyle = 'black';
    ctx.fillText("GAME OVER!", myGameArea.canvas.width / 2, myGameArea.canvas.height / 2 - 30);
    ctx.fillText("Score: " + score, myGameArea.canvas.width / 2, myGameArea.canvas.height / 2 + 15)
}

function printPoints() {
    const pointsP = document.getElementById("playerPoints");
    pointsP.innerText = 'Taškai: ' + points;
}