let enemiesInterval = 600;		// frames between enemy spawns
let frame = 0; 					// increment that determines resource/enemy spawns
const enemies = [];				// array of existing enemies
const enemyPositions = [];		// array of enemy vertical/row positions


class Enemy{
	constructor(verticalPosition, speed, health, delay){
		this.x = canvas.width + (delay * speed);
		this.y = verticalPosition;
		this.width = cellSize - cellGap * 2;
		this.height = cellSize - cellGap * 2;
		this.speed = speed;
		this.movement = this.speed;
		this.health = health;
		this.maxHealth = this.health; //will award player resources based on how large the HP was
		this.onFire = false;    //set to true when hit by fireball projectile
	}
	// Move the enemy
	update(){
		this.x -= this.movement; //walking right to left

		// Cycle through sprite
		if (frame % 10 === 0){
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
        }
	
		if (this.onFire){       //damage over time if on fire
			this.health -= 0.1; 
		}
	}
	// Draw the enemy
	draw(textColor){
		//context.fillStyle = bodyColor;
		//context.fillRect(this.x, this.y, this.width, this.height);
		//context.fillStyle = textColor;
		//context.font = '20px Orbitron';
		strokedText(Math.floor(this.health).toString(),this.x + 15, this.y + 30, '20px', textColor);
		//context.fillText(Math.floor(this.health),this.x + 15, this.y + 30);

		// Display fire status when on fire
		if (this.onFire)
		{
			context.fillStyle = "red";
			context.fillText("FIRE", this.x, this.y + 80);
		}

	}
}
