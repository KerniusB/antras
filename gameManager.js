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
            debug: true,
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
var fullInput;
// var control = false;

var player;
// var playerBarrel;
// var playerBullets;
// var playerBarrelEnd;
var currentPlayerSpeed;
// var tankTracks;

var score = 0;
var lives = 3;
// var healthPacks;
var livesText;

// var enemyBullets;
var monsters;
var coins;
// var explosions;

var gameOver = false;
var gameOverText;

var game = new Phaser.Game(config);

function preload() {
    this.load.image('chest', 'Chest.png');
    this.load.image('skull', 'Skull.png')
    this.load.image('coin', 'Coin.png');
}

function create() {
    // for (var i = 0; i < 11; i++) {
    //     for (var j = 0; j < 7; j++) {
    //         this.add.tileSprite(i * 128, j * 128, this.game.width, this.game.height, "background");
    //     }
    // }
    // this.add.tileSprite(0, 0, this.game.width, this.game.height, "background");
    // this.input.setDefaultCursor('crosshair');

    createGroups(this.physics);
    mapInput(this.input)
    initiateScoreAndLivesUi(this.add);
    createPlayer(this.physics);
    addCollisions(this.physics);
    // createAnims(this);


    this.triggerTimer = this.time.addEvent({
        callback: timerEventFreq,
        callbackScope: this,
        delay: 200,
        loop: true
    })
    this.triggerTimer = this.time.addEvent({
        callback: timerEvent,
        callbackScope: this,
        delay: 500,
        loop: true
    })

}


function update() {
    if (checkGameOver(this)) {
        return;
    }
    movePlayer(this);
    // shootBullets(this, this.physics);
    // moveEnemies(this);
}