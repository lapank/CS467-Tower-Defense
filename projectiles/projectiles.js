const projectiles = []; // Array to hold existing projectiles

class Projectile {
	constructor(x,y, power){
		this.x = x;
		this.y = y;
		this.width = 10;
		this.height = 10;
		this.power = power;
		this.speed = 5;
	}
	// Move the projectile
	update(){
		this.x += this.speed;

		// Cycle through sprite
		if (frame % 25  === 0){
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
        }
	}
	// Draw the projectile
	draw(color){
		context.fillStyle = color;
		context.beginPath();
		context.arc(this.x,this.y, this.width, 0, Math.PI * 2);
		context.fill();
	}
}
