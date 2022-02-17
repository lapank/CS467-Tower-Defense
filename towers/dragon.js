const dragonImage = new Image();
dragonImage.src = 'sprites/dragon.png';

class Dragon extends Tower{
	constructor(x,y){
		super(x,y, 150, 0, 25);

		//info for applying sprite sheet
		this.sprite = dragonImage;
		this.frameX = 0;
		this.frameY = 0; 
		this.minFrame = 0;
		this.maxFrame = 1;
		this.spriteWidth = 82;
		this.spriteHeight = 82;
		this.idleRate = 25; // time between animation frames while idle
		this.animationRate = this.idleRate; // time between animation frames
		this.cost = DRAGON_COST;
	}
	static staticHealth = 150;

	draw(){
		// Draw the sprite
		context.drawImage(this.sprite, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x - 10, this.y + 15, this.width*1.1, this.height*1.1);
		super.draw('gold');
	}
	update(){
		// Cycle through sprite sheet
		if (frame % this.animationRate === 0){
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
        }

		// Cycle through attack animation
		if(this.shooting){
			//attack animation frames
			this.minFrame = 0;
			this.maxFrame = 7;
			this.animationRate = this.fireSpeed; //attack animation rate

			//fire projectile on firing frame
			if( this.frameX == this.maxFrame){
				projectiles.push(new FireBall(this.x + 55, this.y + 40));
				this.frameX = this.minFrame;
			}
		}
		// Cycle through death animation
		else if(this.dying){
			this.minFrame = 8;
			this.maxFrame = 12;
			
			//start death animation immediately
			if (this.frameX < this.minFrame){
				this.frameX = this.minFrame;
			}

			this.animationRate = this.idleRate;

			//Set dead to true when end of death animation is reached
			if( this.frameX == this.maxFrame){
				this.dead = true;
			}
			
		}
		// Return to idle animation when not shooting
		else{ 
				this.minFrame = 0;
				this.maxFrame = 1;
				this.animationRate = this.idleRate; //idle animation rate
			}
		}
}
