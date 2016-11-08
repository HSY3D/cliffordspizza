		var game = new Phaser.Game(800, 600, Phaser.AUTO, 'pizza', {
			preload: preload,
			create: create,
			update: update
		});

		function preload() {
			game.load.image('dough', 'assets/dough.png');
			game.load.image('sauce', 'assets/sauce.png');
			game.load.image('cheese', 'assets/cheese.png');
			game.load.image('toppings', 'assets/toppings.png');
			game.load.image('fire', 'assets/fire.png');
			game.load.image('ball', 'assets/ball.png');
		}

		function create() {
			game.physics.startSystem(Phaser.Physics.ARCADE);
			game.stage.backgroundColor = 'rgb(255,255,255)';

			station = game.add.group();
			station.enableBody = true;

			var dough = station.create(0, game.world.top, 'dough');
			var toppings = station.create(800 - 159, game.world.top, 'toppings')
			var cheese = station.create(game.world.right - (150), 600-96, 'cheese');
			var sauce = station.create(0, 600 - 148, 'sauce');
			var fire = station.create(game.world.centerX - (144 / 2), game.world.centerY - (150 / 2), 'fire');

			ball = game.add.sprite(game.world.centerX - (96/2), game.world.bottom - 81, 'ball');
			game.physics.arcade.enable(ball);
			ball.body.collideWorldBounds = true;
			cursors = game.input.keyboard.createCursorKeys();
		}

		function update() {
			ball.body.velocity.x = 0;
			ball.body.velocity.y = 0;

			if (cursors.left.isDown) {
				//  Move to the left
				ball.body.velocity.x = -150;
			} else if (cursors.right.isDown) {
				//  Move to the right
				ball.body.velocity.x = 150;
			} else {
				//  Stand still
				ball.frame = 4;
			}
			if (cursors.up.isDown) {
				ball.body.velocity.y = -150;
			} else if (cursors.down.isDown) {
				ball.body.velocity.y = 150;
			} else {
				ball.frame = 4;
			}

		}