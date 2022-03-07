let numberOfResources = MAX_RESOURCES;	// player's starting resources
const towers = [];						// array of existing towers
let towerSelector = 1;					// initialize variable for menu button

//Tower Explosion Animation
const explosion = new Image();
explosion.src = 'sprites/explosion.png';

// Tower to shoot projectiles and destroy enemies
class Tower{
	constructor(x,y, health, timer, fireSpeed){
		this.x = x;
		this.y = y;
		this.width = cellSize - cellGap * 2;
		this.height = cellSize - cellGap * 2;
		this.shooting = false;
		this.health = health;
		this.maxHealth = health;
		this.timer = timer;
		this.fireSpeed = fireSpeed;  // time between animation frames when shooting 
		this.towerSelector = towerSelector;
		this.dying = false;
		this.dead = false;
		this.cost = TOWER_COST;
		this.exploding = false;
		this.explodeFrame = 0;
	}
	// Draw Tower on board
	draw(textColor){
		// Draw health bar
		if ((this.health < this.maxHealth) && (this.health != 0)){
			// Prevent from showing negative bar value
			if (this.health < 0) this.health = 0;
			// Fill with percentage health
			context.fillStyle = 'red';
			context.fillRect(this.x + 15, this.y + 40, 10, -30);
			context.fillStyle = 'darkcyan';
			context.fillRect(this.x + 15, this.y + 40, 10, -30*(this.health/this.maxHealth));
			// Outline in black
			context.strokeStyle = 'black';
			context.lineWidth = '1';
			context.rect(this.x + 15, this.y + 40, 10, -30);
			context.stroke();
		}
		
		//draw explosion animation
		if(this.exploding){
			context.drawImage(explosion, this.explodeFrame * 322, 0, 322, 322, this.x - 40, this.y - 40, this.width*2, this.height*2 );
		}
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

