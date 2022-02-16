const archerImage = new Image();
archerImage.src = 'sprites/archer.png';

class Archer extends Tower{
	constructor(x,y){
		super(x,y, 100, 0, 20);
		//info for applying sprite sheet
		this.sprite = archerImage;
		this.frameX = 0;
		this.frameY = 0; 
		this.minFrame = 0;
		this.maxFrame = 1;
		this.spriteWidth = 32;
		this.spriteHeight = 34;
		this.idleRate = 20; // time between animation frames while idle
		this.animationRate = this.idleRate; // time between animation frames
	}
	static staticHealth = 100;

	draw(){
		context.drawImage(this.sprite, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x +25, this.y + 55, this.width * 0.35, this.height *0.45);
		super.draw('white');
	}
	update(){
		// Cycle through sprite 
		if (frame % this.animationRate  === 0){
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
        }

		// Cycle through attack animation
		if(this.shooting){
				//attack animation frames
				this.minFrame = 4;
				this.maxFrame = 7;
				this.animationRate = this.fireSpeed;  //attack animation rate

				//fire projectile on firing frame
				if( this.frameX == this.maxFrame){
					projectiles.push(new Arrow(this.x + 50, this.y + 80));
					this.frameX = this.minFrame;
				}
		}
		// Cycle through death animation
		else if(this.dying){
			this.minFrame = 8;
			this.maxFrame = 8;
			
			//start death animation immediately
			if (this.frameX < this.minFrame){
				this.frameX = this.minFrame;
			}

			//Use timer to determine when set Archer to dead
			//Using timer here because only one frame is used for Archer's death 
			this.timer++;
			if(this.timer % 60 === 0){
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
