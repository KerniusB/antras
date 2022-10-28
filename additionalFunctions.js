function collectCoin(player, coin) {
    coin.destroy();
    score++;
    livesText.setText('Lives: ' + lives + ' SCORE: ' + score);
}

function addCollisions(physics) {
    physics.add.overlap(player, coins, collectCoin, null, this);
    physics.add.overlap(player, skulls, touchEnemy, null, this);
}

function createPlayer(physics) {
    player = physics.add.sprite(game.config.width / 2, game.config.height, 'chest').setScale(2);
    player.setCollideWorldBounds(true);

}

function createGroups(physics) {
    skulls = physics.add.group();
    coins = physics.add.group();
}

function mapInput(input) {
    cursors = input.keyboard.addKeys(
        {
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
}

function initiateScoreAndLivesUi(add) {
    livesText = add.text(16, 16, 'Lives: ' + lives + ' SCORE: ' + score, { fontSize: '32px', fill: '#000' })
}

function initiateTimeUi(add) {
    secondsText = add.text(800, 16, 'Time: ' + seconds + 's', { fontSize: '32px', fill: '#000' })
}

function checkGameOver(self) {
    if (gameOver) {
        if (!gameOverText) {
            gameOverText = true;
            skullTimer.remove(false);
            coinTimer.remove(false);
            // secondsTimer.remove()
            self.add.displayList.removeAll();
            self.add.text(game.config.height / 2, game.config.height / 2, 'Your player lost!\nScore: ' + score, { font: "bold 32px Arial", fill: "#000", align: 'center' });
        }
        return gameOver;
    }
}

function movePlayer(self) {

    if (cursors.left.isDown) {
        player.setVelocityX(-250);
        // console.log("left");
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(250);
        // console.log("right");
    }
    else {
        player.setVelocityX(0);
        // console.log("0");
    }
}

function touchEnemy(player, enemy) {
    enemy.destroy();
    lives = lives - 1;
    livesText.setText('Lives: ' + lives + ' SCORE: ' + score);
    if (lives <= 0) {
        gameOver = true;
    }
}

function timerEvent() {
    let x;
    let y;

    x = Math.random() * game.config.width;
    y = -20;

    skulls.create(x, y, "skull").setScale(2);
}

function timerEventFreq() {
    let x;
    let y;

    x = Math.random() * game.config.width;
    y = -20;

    coins.create(x, y, "coin").setScale(2);
}

function changeTime(){
    seconds = seconds + 1;
    secondsText.setText('Time : ' + seconds + 's');
    console.log(seconds)
}