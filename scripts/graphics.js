// canvas element
var canvas;
var ctx;

// some variables that help control loading
var images = 1;
var loading = 0;

// called after the browser window loads
window.onload = function() {
	// create canvas
	canvas = document.getElementById('game');
	ctx = canvas.getContext('2d');
	
	// set size
	canvas.width = 350;
	canvas.height = 350;
	
	// canvas has loaded
	loading++;
	
	// are all elements loaded now?
	if (loading == images) {
		init(); // game.js
	}
}

// image pre-loader
function loadImg(x) {
	// add to the total number of images
	images++;

	// set up a new image
    var img = new Image();
	
	// called after the image loads
    img.onload = function() {
		// add to the total number of loaded images
		loading++;
		
		// are all of the elements loaded now?
		if (loading == images)
			init(); // game.js
	};
	
	// finish creating image
    img.src = x;	
    return img;
}

// start loading our graphics
var spriteSheet = loadImg('pictures/markup-man.png');
var plankImage = loadImg('pictures/plank.png');

// draw everything
function render() {	
	// clear previous image every time a key is pressed
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	// draw the platforms
	for (i = 0; i < platforms.length; i++) {
		platforms[i].draw();
	}
	
	// draw the player on top
	player.draw();
}