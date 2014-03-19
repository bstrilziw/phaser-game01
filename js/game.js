window.onload = function() {
	var imgPath = "gfx/",
	player,
	background,
	platforms,
	cursors,
	cameraMovementForward = true,
	cameraMovementSpeed = 3,
	playerMovementSpeed = 350;

	var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });


	function preload() {
		game.load.image('background', imgPath+'background.png');
		game.load.image('ground', imgPath+'ground.png');
		game.load.image('player', imgPath+'player.png');
	}

	function create() {
		background = game.add.sprite(0, 0, 'background');
		game.world.setBounds(0, 0, game.cache.getImage('ground').width, game.cache.getImage('ground').height);

		player = game.add.sprite(-game.cache.getImage('player').width, game.world.height - 300, 'player');
		game.physics.enable(player, Phaser.Physics.ARCADE);
		player.body.velocity.x = 100;
		// player.body.collideWorldBounds = true;
		
		platforms = game.add.group();
		var ground = platforms.create(0, game.world.height - game.cache.getImage('ground').height, 'ground');
		// ground.body.immovable = true;
		
		cursors = game.input.keyboard.createCursorKeys();
		fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		console.log(game.camera);

	}

	function update() {
		// game.physics.collide(player, platforms);
		if (game.camera.x == 800) {
			cameraMovementForward = false;
		} else if (game.camera.x == 0) {
			cameraMovementForward = true;
		}

		game.camera.x += (cameraMovementForward) ? cameraMovementSpeed : -cameraMovementSpeed;
		
		console.log();

		// Movement

		// Reset
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;

		// Cursors
		if (cursors.down.isDown && cursors.right.isDown) { // Down & Right
			player.body.velocity.x = playerMovementSpeed;
			player.body.velocity.y = playerMovementSpeed/2;
		} else if (cursors.down.isDown && cursors.left.isDown) { // Down & Left
			player.body.velocity.x = -playerMovementSpeed;
			player.body.velocity.y = playerMovementSpeed/2;
		} else if (cursors.up.isDown && cursors.left.isDown) { // Up & Left
			player.body.velocity.x = -playerMovementSpeed;
			player.body.velocity.y = -playerMovementSpeed/2;
		} else if (cursors.up.isDown && cursors.right.isDown) { // Up & Right
			player.body.velocity.x = playerMovementSpeed;
			player.body.velocity.y = -playerMovementSpeed/2;
		} else if (cursors.left.isDown) { // Left
			player.body.velocity.x = -playerMovementSpeed;
		} else if (cursors.right.isDown) { // Right
			player.body.velocity.x = playerMovementSpeed;
		} else if (cursors.up.isDown) { // Up
			player.body.velocity.y = -playerMovementSpeed/2;
		} else if (cursors.down.isDown) { // Down
			player.body.velocity.y = playerMovementSpeed/2;
		} else { //  Stand still
			
		}

		// Spacebar
		if (fireButton.isDown) {
			console.log("pew pew");
		}
	}




	function render() {
		game.debug.cameraInfo(game.camera, 32, 32);
	}
};