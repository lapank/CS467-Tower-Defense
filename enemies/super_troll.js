class SuperTroll extends Enemy{
	constructor(verticalPosition, delay){
		super(verticalPosition, 2., 400, delay);

		//info for applying sprite sheet
		this.sprite = trollImage;
		this.frameX = 0;
		this.frameY = 0; 
		this.minFrame = 0;
		this.maxFrame = 9;
		this.spriteWidth = 1602;
		this.spriteHeight = 1002;
		this.goldValue = 40;
		this.pointValue = 40
		this.damage = .8;
	}

	update(){
		super.update();

		// Cycle through walking animation
		if(this.walking && !this.dying){
			this.minFrame = 0;
			this.maxFrame = 9;
			
			//start walk animation immediately
			if (this.frameX < this.minFrame){
				this.frameX = this.minFrame;
			}
			
		}

		// Cycle through death animation
		if(this.dying){
			this.minFrame = 0;
			this.maxFrame = 8;

			// Switch to death animation sprite sheet
			if (this.sprite == trollImage){
				this.frameX = this.minFrame;
				this.sprite = trollDeath;
			}

			//Set dead to true when end of death animation is reached
			if( this.frameX == this.maxFrame){
				this.dead = true;
			}
			
		}

		// Cycle through attack animation
		if(this.attacking && !this.dying){
			this.minFrame = 15;
			this.maxFrame = 19;
			
			//start attack animation immediately
			if (this.frameX < this.minFrame){
				this.frameX = this.minFrame;
			}
			
		}
	}

	draw(){
		// Draw the sprite
		if(this.frameX < 15 || this.frameX > 19){ //If not attacking, could not use this.attacking, caused sprite update to lag
			context.drawImage(this.sprite, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x - 80, this.y - 70, this.width*3.6, this.height*2);
		}
		//Stops sprite from jumping around when switching to attack animation
		else{
			context.drawImage(this.sprite, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x - 50, this.y - 70, this.width*3.6, this.height*2);
		}
		
		super.draw('Cyan');		
	}

}
