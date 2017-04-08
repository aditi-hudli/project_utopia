var game = new Phaser.Game(800, 600, Phaser.CANVAS,'mainGameDiv');

var mainState ={
    preload:function() {
    game.load.image('sky', '../assets/sky.png');
    game.load.image('ground', '../assets/platform.png');
    game.load.image('star', '../assets/star.png');
    game.load.spritesheet('dude', '../assets/dude.png', 32, 48);
    },

    create:function() {
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
   
    sky= game.add.tileSprite(0,0,800,600,'sky');
    player = game.add.sprite(380, game.world.height - 120, 'dude');
    game.physics.arcade.enable(player);
    
    game.camera.follow(player);    
    
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    
    //movement
    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    player.body.gravity.y = 500;
    
    //keyboard and mouse initialization
    var cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addCallbacks(this, null, null, keyPress); 
    game.mouse.capture = true;
    },

    update:function() {
    
    //collisions
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    
    //movement
    player.body.velocity.x = 0;
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else
    {
        player.animations.stop();
        player.frame = 4;
    }

    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -350;
    }
  }
};

game.state.add('mainState',mainState);
game.state.start('mainState');
