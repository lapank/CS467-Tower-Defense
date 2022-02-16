let towerCost = 100;			// required resources to place a tower
let numberOfResources = 500;	// player's starting resources
const towers = [];				// array of existing towers
let towerSelector = 1;			// initialize variable for menu button

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
		this.fireSpeed = fireSpeed;  // time between animation frames when shooting 
		this.towerSelector = towerSelector;
		this.dying = false;
		this.dead = false;
	}
	// Draw Tower on board
	draw(textColor){
		strokedText(Math.floor(this.health).toString(),this.x + 15, this.y + 30, '20px', textColor);
	}
	// Take a projectile class. Increment timer and fire projectile.
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

