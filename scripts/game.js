// the player
var player;

// the platforms
var platforms = new Array;

// array to store all key presses
var keysDown = new Array;

// important key codes to play game
var keys = {left: 37, right: 39, up: 38, down: 40};

// listen for key presses
addEventListener("keydown", function (e) {
	// add to array of keys pressed
	keysDown[e.keyCode] = true;
}, false);

// no longer pressing a key
addEventListener("keyup", function (e) {
	// remove from array of keys pressed
	delete keysDown[e.keyCode];
}, false);

// initialize the game
function init() {
	// set up player
	player = createPlayer(spriteSheet); // player.js

	// set up platforms (3 total)
	for (i = 0; i < 3; i++) {
		platforms[i] = {
			// position in middle of screen
			x: (canvas.width - canvas.width/2)/2,
			y: canvas.height - 80 - 80*i,
			width: canvas.width/2,
			height: 20,
			
			draw: function() {
				ctx.drawImage(plankImage, this.x, this.y, this.width, this.height);
			}
		};
	}

	// start game engine
	setInterval(main, 17);
}

// GAME ENGINE
function main() {
	// update game logic
	update();
		
	// draw the game
	render(); // graphics.js
}

// update game logic
function update() {
	// update player position
	player.update();
	
	// check every platform
	for (i = 0; i < platforms.length; i++) {
	
		// ignore this if player is holding down or jumping
		if (!(keys.down in keysDown) && player.velocity >= 0) {
		
			// compare x/y values to find collision between player and platform
			if (player.y + player.height > platforms[i].y && player.y + player.height < platforms[i].y + platforms[i].height && player.x + player.width > platforms[i].x && player.x < platforms[i].x + platforms[i].width) {
			
				// stop player
				player.y = platforms[i].y - player.height;
				
				// reset jumping/falling
				player.jumping = false;
				player.velocity = 0;
			}
        }
	}
}