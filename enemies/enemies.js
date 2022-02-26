let enemiesInterval = 2000;		// frames between enemy spawns
let frame = 0; 					// increment that determines resource/enemy spawns
const enemies = [];				// array of existing enemies
const enemyPositions = {};		// map of enemy vertical/row positions
// fill pre-fill vertical coordinates for enemy positions in the map.
for (let i = 1; i <= 5; i++){
	enemyPositions[i * cellSize + cellGap] = 0;
}

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
		this.dying = false;
		this.dead = false;
		this.attacking = false;
		this.walking = true;
		this.goldValue = 10;
		this.pointValue = 10;
		this.visible = false;

	}
	// Move the enemy
	update(){
		
		//Enemy moves towards left of screen until dying
		if (!this.dying){
			this.x -= this.movement; //walking right to left
		}

		// Cycle through sprite
		if (frame % 10 === 0){
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
        }
	
		if (this.onFire && !this.dying){       //damage over time if on fire
			this.health -= 0.1; 
		}

		// Makes enemy visible to towers when it moves onto the screen
		if (!(this.visible) && this.x < canvas.width) this.makeVisible();
	}
	// Draw the enemy
	draw(textColor){
		// display health bar when damaged 
		if ((this.health < this.maxHealth) && (this.health != 0)){
			// Prevent from showing negative bar value
			if (this.health < 0) this.health = 0;
			// Fill with percentage health
			context.fillStyle = 'red';
			context.fillRect(this.x + 15, this.y + 40, 10, -30);
			context.fillStyle = 'green';
			context.fillRect(this.x + 15, this.y + 40, 10, -30*(this.health/this.maxHealth));
			// Outline in black
			context.strokeStyle = 'black';
			context.lineWidth = '1';
			context.rect(this.x + 15, this.y + 40, 10, -30);
			context.stroke();
		}

		// Display fire status when on fire
		if (this.onFire)
		{
			context.fillStyle = "red";
			context.fillText("FIRE", this.x, this.y + 80);
		}
	}
	// Makes the enemy visible to towers when they move onto the screen.
	makeVisible(){
		this.visible = true;
		enemyPositions[this.y] += 1;
	}
}
