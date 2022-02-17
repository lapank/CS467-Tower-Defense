//Vampire Enemy
const vampireImage = new Image();
vampireImage.src = 'sprites/vampire.png';

class Vampire extends Enemy{
	constructor(verticalPosition, delay){
		super(verticalPosition, 1.2, 60, delay);

		//info for applying sprite sheet
		this.sprite = vampireImage;
		this.frameX = 0;
		this.frameY = 0; 
		this.minFrame = 0;
		this.maxFrame = 3;
		this.spriteWidth = 74;
		this.spriteHeight = 74;
	}

	update(){
		super.update();
		if (this.health < this.maxHealth && !this.dying){     //vampire's regain health over time
			this.health += 0.1;
		}

		// Cycle through death animation
		if(this.dying){
			this.minFrame = 7;
			this.maxFrame = 14;
			
			//start death animation immediately
			if (this.frameX < this.minFrame){
				this.frameX = this.minFrame;
			}

			//Set dead to true when end of death animation is reached
			if( this.frameX == this.maxFrame){
				this.dead = true;
			}
			
		}
	}

	draw(){
		// Draw the sprite
		context.drawImage(this.sprite, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x - 10, this.y + 18, this.width*1.1, this.height*1.1);

		super.draw('Gainsboro');		
	}
}
