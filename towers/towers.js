let towerCost = 100;			// required resources to place a tower
let numberOfResources = 500;	// player's starting resources
const towers = [];				// array of existing towers

// Tower to shoot projectiles and destroy enemies
class Tower{
	constructor(x,y, health, timer, fireSpeed){
		this.x = x;
		this.y = y;
		this.width = cellSize - cellGap * 2;
		this.height = cellSize - cellGap * 2;
		this.shooting = false;
		this.health = health;
		this.timer = timer;
		this.fireSpeed = fireSpeed;  // number of timer-frames between shots.
	}
	// Draw Tower on board
	draw(bodyColor, textColor){
		context.fillStyle = bodyColor;
		context.fillRect(this.x,this.y,this.width,this.height);
		context.fillStyle = textColor;
		context.font = '30px Orbitron';
		context.fillText(Math.floor(this.health),this.x + 15, this.y + 30);
	}
	// Increment timer and fire projectiles
	update(projectile){
		if(this.shooting){
			this.timer++;
			if(this.timer % this.fireSpeed === 0){
				projectiles.push(new projectile(this.x + 70, this.y + 50));
			}
		}
		// Reset timer if not shooting
		else{ 
			this.timer = 0;
		}
	}
}

