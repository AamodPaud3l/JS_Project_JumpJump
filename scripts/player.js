// player class
function createPlayer(s) {
	return {
		// graphics
		sprite: s,
		width: s.width,
		height: s.height,
		// position
		x: canvas.width/2 - s.width/2,
		y: canvas.height/2 - s.height/2,
		// movement
		speed: 5,
		velocity: 0,
		jumpPower: 14,
		jumping: false,
		update: function() {
			// presses left
			if (this.x > 0 && keys.left in keysDown) {
				// move player to the left
				this.x -= this.speed;
			}
				
			// presses right
			if (this.x + this.width <= canvas.width && keys.right in keysDown) {
				this.x += this.speed;
			}
				
			// presses up
			if (!this.jumping && keys.up in keysDown && this.velocity == 0) {
				// begin jumping by bumping up velocity power
				this.velocity = this.jumpPower*-1;
				this.jumping = true;
			}
			
			// update gravity
			if (this.velocity < 0) {
				this.velocity++;
			}
			else {
				// fall slower than you jump
				this.velocity += 0.5;
			}
			
			// apply final velocity value
			this.y += this.velocity;
			
			// stop at bottom of screen
			if (this.y + this.height >= canvas.height) {
				this.y = canvas.height - this.height;
				
				// reset jumping/falling
				this.jumping = false;
				this.velocity = 0;
			}
		},
		draw: function() {			
			// draw player on canvas
			ctx.drawImage(this.sprite, this.x, this.y);
		}
	}
}