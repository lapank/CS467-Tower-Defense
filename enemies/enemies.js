let enemiesInterval = 600;		// frames between enemy spawns
let frame = 0; 					// increment that determines resource/enemy spawns
const enemies = [];				// array of existing enemies
const enemyPositions = [];		// array of enemy vertical/row positions

class Enemy{
	constructor(verticalPosition, speed, health){
		this.x = canvas.width;
		this.y = verticalPosition;
		this.width = cellSize - cellGap * 2;
		this.height = cellSize - cellGap * 2;
		this.speed = speed;
		this.movement = this.speed;
		this.health = health;
		this.maxHealth = this.health; //will award player resources based on how large the HP was
	}
	// Move the enemy
	update(){
		this.x -= this.movement; //walking right to left
	}
	// Draw the enemy
	draw(bodyColor, textColor){
		context.fillStyle = bodyColor;
		context.fillRect(this.x, this.y, this.width, this.height);
		context.fillStyle = textColor;
		context.font = '30px Orbitron';
		context.fillText(Math.floor(this.health),this.x + 15, this.y + 30);
	}
}



