function createAnims(self) {
    self.anims.create({
        key: 'ride',
        frames: self.anims.generateFrameNumbers('tank', { start: 0, end: 1 }),
        frameRate: 5,
        repeat: -1
    });
    self.anims.create({
        key: 'stand',
        frames: [{ key: 'tank', frame: 1 }],
        frameRate: 20
    });

    self.anims.create({
        key: 'explosion1',
        frames: self.anims.generateFrameNumbers('explosion1', { start: 0, end: 7 })
    })
    self.anims.create({
        key: 'explosion2',
        frames: self.anims.generateFrameNumbers('explosion2', { start: 0, end: 7 })
    })
    self.anims.create({
        key: 'explosion3',
        frames: self.anims.generateFrameNumbers('explosion3', { start: 0, end: 9 })
    })
    self.anims.create({
        key: 'explosion4',
        frames: self.anims.generateFrameNumbers('explosion4', { start: 0, end: 11 })
    })
    self.anims.create({
        key: 'explosion5',
        frames: self.anims.generateFrameNumbers('explosion5', { start: 0, end: 7 })
    })
}


function addCollisions(physics) {
    physics.add.overlap(player, healthPacks, collectHealth, null, this);
    physics.add.overlap(player, monsters, touchEnemy, null, this);
    physics.add.collider(monsters, monsters)
    physics.add.collider(playerBullets, monsters, shootEnemy, null, this);
    physics.add.overlap(player, enemyBullets, touchEnemy, null, this);
}

function createPlayer(physics) {
    player = physics.add.sprite(game.config.width / 2, game.config.height / 2, 'tank');
    player.setCollideWorldBounds(true);
    playerBarrel = physics.add.sprite(player.x, player.y, "tankShaft");
    playerBarrel.setOrigin(0.5, 0)
}

function createGroups(physics) {
    healthPacks = physics.add.staticGroup();
    playerBullets = physics.add.group();
    enemyBullets = physics.add.group();
    monsters = physics.add.group();
    explosions = physics.add.group();
    tankTracks = physics.add.group();
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
    fullInput = input;
}

function initiateScoreAndLivesUi(add) {
    livesText = add.text(16, 16, 'Lives: ' + lives + ' SCORE: ' + score, { fontSize: '32px', fill: '#000' })
}


function moveEnemies(self) {
    monsters.getChildren().forEach(function (enemy) {
        if (enemy.health > 0) {
            let angle = Phaser.Math.Angle.Between(player.x, player.y, enemy.x, enemy.y);
            enemy.setRotation(angle - Math.PI / 2);
            self.physics.moveToObject(enemy, player, 100);
        }
    })
}

function checkGameOver(self) {
    if (gameOver) {
        if (!gameOverText) {
            self.triggerTimer.remove(false);
            self.add.displayList.removeAll();
            self.add.text(420, game.config.height / 2, 'Your ship has been destroyed!\nScore: ' + score, { font: "bold 32px Arial", fill: "#000", align: 'center' });
        }
        return gameOver;
    }
}

function shootBullets(self, physics) {
    if (fullInput.activePointer.isDown && control === false) {
        let angle = Phaser.Math.Angle.Between(fullInput.x, fullInput.y, playerBarrel.x, playerBarrel.y);
        let movingAngle = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        let bullet = playerBullets.create(playerBarrel.x - (playerBarrel.height * movingAngle.x), playerBarrel.y - (playerBarrel.height * movingAngle.y), 'bullet').setRotation(angle - Math.PI / 2);
        physics.moveTo(bullet, fullInput.x, fullInput.y, 500);
        control = true;
        self.children.bringToTop(player);
        self.children.bringToTop(playerBarrel);
    } else if (!fullInput.activePointer.isDown) {
        control = false;
    }
}

function movePlayer(self) {
    let angle = Phaser.Math.Angle.Between(fullInput.x, fullInput.y, player.x, player.y);
    playerBarrel.setRotation(angle + Math.PI / 2);
    if (cursors.left.isDown) {
        player.anims.play('ride', true);
        player.angle -= 2;
    }
    else if (cursors.right.isDown) {
        player.anims.play('ride', true);
        player.angle += 2;
    }

    if (cursors.up.isDown) {
        currentPlayerSpeed = 160
        player.anims.play('ride', true);
    } else {
        if (currentPlayerSpeed > 0) {
            currentPlayerSpeed -= 4;
            player.anims.play('ride', true);
        }
    }
    if (currentPlayerSpeed > 0) {
        self.physics.velocityFromRotation(player.rotation - Math.PI / 2, currentPlayerSpeed, player.body.velocity);
    } else {
        player.anims.play('stand')
    }

    playerBarrel.x = player.x;
    playerBarrel.y = player.y;
}
function collectHealth(player, healthPack) {
    healthPack.destroy();
    lives++;
    livesText.setText('Lives: ' + lives + ' SCORE: ' + score);
}

function shootEnemy(bullet, enemy) {
    bullet.destroy();
    score += 5;
    livesText.setText('Lives: ' + lives + ' SCORE: ' + score);
    enemy.health--;
    if (enemy.health <= 0) {

        enemy.damage = 0;
        enemy.destroy();
        let angle = Phaser.Math.Angle.Between(player.x, player.y, enemy.x, enemy.y);
        playExplosion(enemy.x, enemy.y, angle);
        score += enemy.deathScore;
        livesText.setText('Lives: ' + lives + ' SCORE: ' + score);
        if (Math.random() < 0.10) {
            dropHeart(enemy.x, enemy.y);
        }

    }
}

function dropHeart(x, y) {
    healthPacks.create(x, y, 'health_pack').setScale(2);
}

function playExplosion(x, y, angle) {
    var explosiona = explosions.create(x, y, "explosion1").setScale(2);
    explosiona.setRotation(angle + Math.PI / 2)
    explosiona.anims.play('explosion' + (Math.floor(Math.random() * 5) + 1));
    explosiona.once('animationcomplete', () => {
        explosiona.destroy();
    })
}

function touchEnemy(player, enemy) {
    enemy.destroy();
    lives = lives - enemy.damage;
    livesText.setText('Lives: ' + lives + ' SCORE: ' + score);
    if (lives <= 0) {
        gameOver = true;
    }
}

function timerEvent() {
    let x;
    let y;
    
    x = Math.random() < 0.5 ? -20 : game.config.width + 20;
    y = -20;

    monsters.create(x, y, "skull").setScale(2);

}

function timerEventFreq() {
    let x;
    let y;
    
    x = Math.random() < 0.5 ? -20 : game.config.width + 20;
    y = -20;

    coins.create(x, y, "coin").setScale(2);
}

function addTracks() {
    var lastTankTracks = tankTracks.getChildren()[tankTracks.getChildren().length - 1];
    if (!lastTankTracks) {
        var tankCarts = new TankCarts(this, player.x, player.y, player.rotation);
        tankTracks.add(tankCarts, { addToScene: true });
    }
    if (lastTankTracks && (lastTankTracks.x != player.x || lastTankTracks.y != player.y)) {
        var tankCarts = new TankCarts(this, player.x, player.y, player.rotation);
        tankTracks.add(tankCarts, { addToScene: true });
    }
    this.children.bringToTop(player);
    this.children.bringToTop(playerBarrel);
}