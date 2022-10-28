var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 100 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    backgroundColor: '#FFFFFF'
}

var cursors;

var skullTimer;
var coinTimer;
var secondsTimer;
var player;
var currentPlayerSpeed;

var score = 0;
var lives = 3;
var seconds = 0;
var secondsText;
var livesText;
var skulls;
var coins;

var gameOver = false;
var gameOverText;

var game = new Phaser.Game(config);

function preload() {
    this.load.image('chest', 'Chest.png');
    this.load.image('skull', 'Skull.png')
    this.load.image('coin', 'Coin.png');
}

function create() {
    createGroups(this.physics);
    mapInput(this.input)
    createPlayer(this.physics);
    addCollisions(this.physics);
    initiateScoreAndLivesUi(this.add);
    initiateTimeUi(this.add);

    coinTimer = this.time.addEvent({
        callback: timerEventFreq,
        callbackScope: this,
        delay: 500,
        loop: true
    })
    skullTimer = this.time.addEvent({
        callback: timerEvent,
        callbackScope: this,
        delay: 1000,
        loop: true
    })
    secondsTimer = this.time.addEvent({
        callback: changeTime,
        callbackScope: this,
        delay: 1000,
        loop: true
    })
}

function update() {
    if (checkGameOver(this)) {
        return;
    }
    movePlayer(this);
}