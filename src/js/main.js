'use strict';

var PlayScene = require('./play_scene.js');


var BootScene = {
    init: function () {
        this.game.renderer.renderSession.roundPixels = true;
        // NOTE: change this to suit your preferred scale mode.
        //       see http://phaser.io/docs/2.6.1/Phaser.ScaleManager.html
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.pageAlignHorizontally = true;
    },

    preload: function () {
        // load here assets required for the loading screen
        this.game.load.image('preloader_bar', 'images/preloader_bar.png');
    },

    create: function () {
        this.game.state.start('preloader');
    }
};


var PreloaderScene = {
    preload: function () {
        this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
        this.loadingBar.anchor.setTo(0, 0.5);
        this.load.setPreloadSprite(this.loadingBar);

        // image assets
        this.game.load.image('background', 'images/background.png');
        this.game.load.image('ship:fighter', 'images/ship_fighter.png');
        this.game.load.image('ship:bomber', 'images/ship_bomber.png');
        this.game.load.image('bullet', 'images/ship_bullet.png');
        this.game.load.image('bomb', 'images/ship_bomb.png');
        this.game.load.image('crawler_bullet', 'images/crawler_bullet.png');
        this.game.load.image('cloud00', 'images/cloud00.png');
        this.game.load.spritesheet('enemy:fighter', 'images/enemy00.png',
            54, 54);
        this.game.load.spritesheet('enemy:crawler', 'images/enemy01.png',
            90, 33);
        this.game.load.spritesheet('explosion', 'images/explosion.png', 96, 96);

        // audio assets
        this.game.load.audio('hit', 'audio/hit.wav');
        this.game.load.audio('ship_bullet', 'audio/ship_bullet.wav');
        this.game.load.audio('enemy_bullet', 'audio/enemy_bullet.wav');
        this.game.load.audio('bomb', 'audio/shoot_bomb.wav');
        this.game.load.audio('explosion', 'audio/explosion.wav');
        this.game.load.audio('shapeshift', 'audio/powerup.wav');
        this.game.load.audio('background',
            ['audio/background.mp3', 'audio/background.ogg']);
    },

    create: function () {
        this.game.state.start('play');
    }
};


function startGame() {
    var game = new Phaser.Game(900, 600, Phaser.AUTO);

    game.state.add('boot', BootScene);
    game.state.add('preloader', PreloaderScene);
    game.state.add('play', PlayScene);

    game.state.start('boot');
}

window.onload = function () {
  // // for dev mode
  // document.querySelector('.overlay').style.display = 'none';
  // startGame();

  // for production
  document.getElementById('play').addEventListener('click', function (evt) {
    evt.preventDefault();
    // hide overlay
    document.querySelector('.overlay').style.display = 'none';
    startGame();
  });
};
