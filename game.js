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

	game.load.image('background', 'assets/kitchen.png');
	game.load.image('chef1', 'assets/chef1.png');
	game.load.image('chef2', 'assets/chef2.png');
	game.load.image('chef3', 'assets/chef3.png');
	game.load.spritesheet('main_chef', 'assets/dude.png', 32, 48);
}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.stage.backgroundColor = 'rgb(255,255,255)';

	var background = game.add.sprite(0, 0, 'background');
	background.scale.setTo(0.5,0.5);

	//  Finally some stars to collect
	ingredients = game.add.group();

	//  We will enable physics for any chef that is created in this group
	ingredients.enableBody = true;

	var chef1 = game.add.sprite(650, 200, 'chef1');
	chef1.scale.setTo(0.1,0.1);

	var dough = ingredients.create(610, 250, 'dough');
	dough.scale.setTo(0.3,0.3);

	var chef2 = game.add.sprite(650, 360, 'chef2');
	chef2.scale.setTo(0.1,0.1);

	var sauce = ingredients.create(620, 410, 'sauce');
	sauce.scale.setTo(0.3,0.3);

	var chef3 = game.add.sprite(30, 280, 'chef3');
	chef3.scale.setTo(0.1,0.1);

	var cheese = ingredients.create(90, 330, 'cheese');
	cheese.scale.setTo(0.3,0.3);

	// The player and its settings
	player = game.add.sprite(32, game.world.height - 150, 'main_chef');

	//  We need to enable physics on the player
	game.physics.arcade.enable(player);
	//player.body.collideWorldBounds = true;


	//  Player physics properties. Give the little guy a slight bounce.
	//player.body.bounce.y = 0.2;
	//player.body.gravity.y = 300;
	player.body.collideWorldBounds = true;

	//  Our two animations, walking left and right.
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);

	cursors = game.input.keyboard.createCursorKeys();


	/*station = game.add.group();
	station.enableBody = true;

	var dough = station.create(0, game.world.top, 'dough');
	var toppings = station.create(800 - 159, game.world.top, 'toppings')
	var cheese = station.create(game.world.right - (150), 600-96, 'cheese');
	var sauce = station.create(0, 600 - 148, 'sauce');
	var fire = station.create(game.world.centerX - (144 / 2), game.world.centerY - (150 / 2), 'fire');*/

	/*ball = game.add.sprite(game.world.centerX - (96/2), 300, 'ball');
	game.physics.arcade.enable(ball);
	ball.body.collideWorldBounds = true;
	cursors = game.input.keyboard.createCursorKeys();*/
}

function update() {
	//  Reset the players velocity (movement)
	player.body.velocity.x = 0;
	player.body.velocity.y = 0;

	//  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
	game.physics.arcade.overlap(player, ingredients, interactWithIngredient, null, this);

	if (cursors.left.isDown)
	{
		//  Move to the left
		player.body.velocity.x = -150;

		player.animations.play('left');
	}
	else if (cursors.right.isDown)
	{
		//  Move to the right
		player.body.velocity.x = 150;

		player.animations.play('right');
	}
	else if (cursors.up.isDown && player.y > 190) {
		player.body.velocity.y = -150;
	}
	else if (cursors.down.isDown && player.y < 415) {
		player.body.velocity.y = 150;
	}
	else
	{
		//  Stand still
		player.animations.stop();

		player.frame = 4;
	}
}

function interactWithIngredient(player, ingredient) {
	// Removes the star from the screen
	ingredient.kill();
}
