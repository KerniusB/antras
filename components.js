class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, spriteName, health, deathScore) {
        super(scene, x, y, spriteName);
        this.setPosition(x, y);
        this.damage = 1;
        this.health = health;
        this.deathScore = deathScore;
    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }
}

class ShootingEnemy extends Enemy {
    constructor(scene, x, y, spriteName, health, deathScore) {
        super(scene, x, y, spriteName, health, deathScore);
        this.timer = 0;
        this.physics = scene.physics;
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.timer += delta;
        if (this.timer > 1000) {
            this.timer = 0;
            this.shootToPlayer();
        }
    }

    shootToPlayer() {
        let angle = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y);
        let bullet = enemyBullets.create(this.x, this.y, 'enemy_bullet').setRotation(angle - Math.PI / 2).setScale(2);
        bullet.setTint(0xff0000)
        this.physics.moveTo(bullet, player.x, player.y, 500);

    }
}

class TankCarts extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, rotation) {
        super(scene, x, y, "tracks");
        this.setRotation(rotation);
        this.timer = 0;
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.timer += delta;
        this.setAlpha(1 - this.timer / 2000)
        if (this.timer > 2000) {
            this.timer = 0;
            this.destroy();
        }
    }
}