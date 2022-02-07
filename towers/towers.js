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
		this.fireSpeed = fireSpeed;  // number of timer-frames between shots.
		this.towerSelector = towerSelector;
	}
	// Draw Tower on board
	draw(bodyColor, textColor){
		//context.fillStyle = bodyColor;
		//context.fillRect(this.x,this.y,this.width,this.height);
		context.fillStyle = textColor;
		context.font = '30px Orbitron';
		context.fillText(Math.floor(this.health),this.x + 15, this.y + 30);
	}
	// Take a projectile class. Increment timer and fire projectile.
	update(projectile){
		if(this.shooting){
			
			if (this.sprite == dragonImage){
				//attack animation frames
				this.minFrame = 0;
				this.maxFrame = 7;

				//fire projectile on firing frame
				if( this.frameX == 7){
					projectiles.push(new projectile(this.x + 70, this.y + 50));
					this.frameX = 0;
				}
			}
			else if(this.sprite == wizardImage){
				//attack animation frames
				this.minFrame = 0;
				this.maxFrame = 5;

				//fire projectile on firing frame
				if( this.frameX == 5){
					projectiles.push(new projectile(this.x + 70, this.y + 50));
					this.frameX = 0;
				}
			}
			else if(this.sprite == archerImage){
				//attack animation frames
				this.minFrame = 4;
				this.maxFrame = 7;

				//fire projectile on firing frame
				if( this.frameX == 7){
					projectiles.push(new projectile(this.x + 70, this.y + 80));
					this.frameX = this.minFrame;
				}
			}
			

			

	
		}
		// Reset timer if not shooting
		else{ 
				//return to idle animation
				if (this.sprite == dragonImage){
					this.minFrame = 0;
					this.maxFrame = 1;
				}
				else if (this.sprite == wizardImage){
					this.minFrame = 0;
					this.maxFrame = 1;
				}
				else if (this.sprite == archerImage){
					this.minFrame = 0;
					this.maxFrame = 1;
				}	
			}

		
	}
}

