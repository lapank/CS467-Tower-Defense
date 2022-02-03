//Vampire Enemy
const vampireImage = new Image();
vampireImage.src = 'sprites/vampire.png';

class Vampire extends Enemy{
	constructor(verticalPosition){
		super(verticalPosition, 1.2, 60);

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
		if (this.health < this.maxHealth){     //vampire's regain health over time
			this.health += 0.1;
		}
	}

	draw(){
		super.draw('red', 'grey');
		// Draw the sprite
		context.drawImage(this.sprite, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x - 10, this.y - 10, this.width*1.1, this.height*1.1);

	}
}
