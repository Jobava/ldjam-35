'use strict';

const Ship = require('./sprites/ship.js');
const EnemyFighter = require('./sprites/enemy_fighter.js');

let PlayScene = {};

PlayScene.create = function () {
    // set up input
    this.keys = this.game.input.keyboard.createCursorKeys();
    this.keys.spacebar = this.game.input.keyboard.addKey(
        Phaser.Keyboard.SPACEBAR);
    this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.SPACEBAR);

    // create background
    this.game.add.image(0, 0, 'background');

    // create player's ship
    this.ship = new Ship(this.game, 20, 100);
    this.game.add.existing(this.ship);

    this.shipBullets = this.game.add.group();
    this.fighterGroup = this.game.add.group();

    // TODO: temp
    this.fighterGroup.add(new EnemyFighter(this.game, 350, 100));
};

PlayScene.update = function () {
    // handle ship movement
    let dirX = 0, dirY = 0;
    if (this.keys.left.isDown) { dirX = -1; }
    if (this.keys.right.isDown) { dirX = 1; }
    if (this.keys.up.isDown) { dirY = -1; }
    if (this.keys.down.isDown) { dirY = 1;}
    this.ship.move(dirX, dirY);

    // shoot if button is pressed
    if (this.keys.spacebar.isDown) {
        this.ship.shoot(this.shipBullets);
    }
};


module.exports = PlayScene;
