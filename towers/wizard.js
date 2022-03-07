const wizardImage = new Image();
wizardImage.src = 'sprites/wizard.png';

class Wizard extends Tower{
	constructor(x,y){
		super(x,y, 75, 0, 15);

		//info for applying sprite sheet
		this.sprite = wizardImage;
		this.frameX = 0;
		this.frameY = 0; 
		this.minFrame = 0;
		this.maxFrame = 5;
		this.spriteWidth = 66;
		this.spriteHeight = 66;
		this.idleRate = 10; // time between animation frames while idle
		this.animationRate = this.idleRate; // time between animation frames
		this.cost = WIZARD_COST;
	}
	static staticHealth = 75;

	draw(){
		// Draw the sprite
		context.drawImage(this.sprite, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x - 10, this.y + 15, this.width*1.1, this.height*1.1);
		super.draw('plum');
	}
	update(){
		// Cycle through sprite sheet 
		if (frame % this.animationRate === 0){
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
        }

		// Cycle through explosion sprite
		if (frame % 15 === 0){
            if (this.explodeFrame < 6) this.explodeFrame++;
            else this.fireFrame = 0;
        }

		// Cycle through attack animation
		if(this.shooting){
			//attack animation frames
			this.minFrame = 5;
			this.maxFrame = 9;
			this.animationRate = this.fireSpeed; //attack animation rate

			//fire projectile on firing frame
			if( this.frameX == this.maxFrame){
				projectiles.push(new MagicBolt(this.x + 45, this.y + 45));
				this.frameX = this.minFrame;
			}
		}
		// Cycle through death animation
		else if(this.dying){
			this.minFrame = 10;
			this.maxFrame = 14;
			
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
				this.maxFrame = 5;
				this.animationRate = this.idleRate; //idle animation rate
			}
		}
}
