//Goblin Enemy
const goblinImage = new Image();
goblinImage.src = 'sprites/goblin.png';

class Goblin extends Enemy{
	constructor(verticalPosition, delay){
		super(verticalPosition, 0.4, 100, delay);
		
		//info for applying sprite sheet
		this.sprite = goblinImage;
		this.frameX = 0;
		this.frameY = 0; 
		this.minFrame = 0;
		this.maxFrame = 7;
		this.spriteWidth = 66;
		this.spriteHeight = 64;
		this.goldValue = 10;
		this.pointValue = 10;
		
	}

	update(){
		super.update();

		// Cycle through walking animation
		if(this.walking && !this.dying){
			this.minFrame = 0;
			this.maxFrame = 7;
			
			//start walk animation immediately
			if (this.frameX < this.minFrame){
				this.frameX = this.minFrame;
			}
			
		}

		// Cycle through death animation
		if(this.dying){
			this.minFrame = 8;
			this.maxFrame = 12;
			
			//start death animation immediately
			if (this.frameX < this.minFrame){
				this.frameX = this.minFrame;
			}

			//Set dead to true when end of death animation is reached
			if( this.frameX == this.maxFrame){
				this.dead = true;
			}
			
		}

		// Cycle through attack animation
		if(this.attacking && !this.dying){
			this.minFrame = 13;
			this.maxFrame = 18;
			
			//start attack animation immediately
			if (this.frameX < this.minFrame){
				this.frameX = this.minFrame;
			}
			
		}
	}

	draw(){
		// Draw the sprite
		context.drawImage(this.sprite, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x - 20, this.y + 8, this.width*1.2, this.height*1.2);

		super.draw('SandyBrown');
		
	}
}
