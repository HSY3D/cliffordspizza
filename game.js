var game = new Phaser.Game(800, 600, Phaser.AUTO, 'pizza', {
	preload: preload,
	create: create,
	update: update
});
status = 0;
var score = 0;
var scoreText;

var drums;
var synth1;
var sounds;
var loopCount = 0;

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

	game.load.image('spread', 'assets/spread.png');
	game.load.image('sauced', 'assets/sauced.png');
	game.load.image('finished', 'assets/finished.png');
	game.load.spritesheet('main_chef', 'assets/dude.png', 32, 48);

	game.load.image('fiveguys','assets/logo.jpg');
	game.load.image('pizzacounter', 'assets/pizzacounter.png');

	//Play Button Functionality
	game.load.image('playbutton','assets/keepplaying.png');

	// sounds
	game.load.audio('drums', 'assets/drums.mp3');
	game.load.audio('synth1', 'assets/synth1.mp3');
}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);

	// set game sounds
	drums = game.add.audio('drums');
	synth1 = game.add.audio('synth1');
	sounds = [ drums, synth1 ];

	game.sound.setDecodedCallback(sounds, start, this);

	game.stage.backgroundColor = 'rgb(0,0,0)';

	background = game.add.sprite(0, 0, 'background');
	background.scale.setTo(0.5,0.5);

	//  Finally some stars to collect
	ingredients = game.add.group();

	//  We will enable physics for any chef that is created in this group
	ingredients.enableBody = true;

	placeChefs ();
	placeIncredients ();

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

	pizzacounter = game.add.sprite(20,30,'pizzacounter');
	pizzacounter.scale.setTo(0.1,0.1);
  	scoreText = game.add.text(70, 30, '0', { fontSize: '30px', fill: '#000' });
	cursors = game.input.keyboard.createCursorKeys();

	logo = game.add.sprite(-130, -30, 'fiveguys');
	logo.fixedToCamera = true;
	logo.scale.setTo(0.5,0.5);
	game.input.onDown.add(removeLogo, this);
}

function update() {
	//  Reset the players velocity (movement)
	player.body.velocity.x = 0;
	player.body.velocity.y = 0;

	//  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
	//game.physics.arcade.overlap(player, ingredients, interactWithIngredient, null, this);
	game.physics.arcade.overlap(player, dough, hitDough, null, this);
	game.physics.arcade.overlap(player, sauce, hitSauce, null, this);
	game.physics.arcade.overlap(player, cheese, hitCheese, null, this);

	if (cursors.left.isDown)
	{
		//  Move to the left
		player.body.velocity.x = -350;

		player.animations.play('left');
	}
	else if (cursors.right.isDown)
	{
		//  Move to the right
		player.body.velocity.x = 350;

		player.animations.play('right');
	}
	else if (cursors.up.isDown && player.y > 190) {
		player.body.velocity.y = -350;
	}
	else if (cursors.down.isDown && player.y < 415) {
		player.body.velocity.y = 350;
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

function hitDough(player, dough) {
	if (status == 0) {
		pizzaState = game.add.sprite(700,50, 'spread');
		dough.kill();
		status = 1;
	}
}

function hitSauce(player, sauce) {
	if (status == 1) {
			pizzaState.kill();
		pizzaState = game.add.sprite(700,50, 'sauced');
		sauce.kill();
		status = 2;
	}
}

function hitCheese(player, cheese) {
	if (status == 2) {
			pizzaState.kill();
		pizzaState = game.add.sprite(700,50, 'finished');
		cheese.kill();
		score += 1;
		scoreText.text = score;
		showButton();
	}
}

function showButton()
{
	//This is all about the play again button
	button = game.add.button(game.world.centerX - 125, 185, 'playbutton', actionOnClick, this, 2, 1, 0);
	background.alpha = 0.2;
	chef1.alpha=0.2; chef2.alpha=0.2; chef3.alpha=0.2; pizzacounter.alpha=0.2; player.alpha=0.2;
	player.x = 400;
	player.y = 300;
}

function removeLogo () {
	game.input.onDown.remove(removeLogo, this);
	logo.kill();
}

function placeChefs () {

	chef1 = game.add.sprite(650, 200, 'chef1');
	chef1.scale.setTo(0.1,0.1);

	chef2 = game.add.sprite(650, 360, 'chef2');
	chef2.scale.setTo(0.1,0.1);

	chef3 = game.add.sprite(30, 280, 'chef3');
	chef3.scale.setTo(0.1,0.1);
}

function placeIncredients () {
	//var randInt = getRandomInt(0,2);
	var randInts = [0,1,2];
	ingredientsX = [610,620,90];
	ingredientsY = [250,410,330];
	shuffle(randInts);

	placeDough(ingredientsX[randInts[0]],ingredientsY[randInts[0]]);
	placeSauce(ingredientsX[randInts[1]],ingredientsY[randInts[1]]);
	placeCheese(ingredientsX[randInts[2]],ingredientsY[randInts[2]]);


}

function shuffle(array) {
  var tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}

function placeDough(x,y){
	dough = ingredients.create(x, y, 'dough');
	dough.scale.setTo(0.3,0.3);
}

function placeSauce(x,y){
	sauce = ingredients.create(x, y, 'sauce');
	sauce.scale.setTo(0.3,0.3);
}

function placeCheese(x,y){
	cheese = ingredients.create(x, y, 'cheese');
	cheese.scale.setTo(0.3,0.3);
}

//Play Again Button Functionality
function actionOnClick () {
    background.alpha=1; chef1.alpha=1; chef2.alpha=1; chef3.alpha=1; pizzacounter.alpha=1; player.alpha=1;
    button.kill();
    placeIncredients();
	status = 0;
	pizzaState.kill();
}

// audio callbacks
function start() {

	sounds.shift();

	drums.loopFull(0.6);
	
}
