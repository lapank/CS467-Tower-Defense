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
		
	}

	draw(){
		super.draw('green', 'brown');
		// Draw the sprite
		context.drawImage(this.sprite, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x - 20, this.y + 5, this.width*1.2, this.height*1.2);

	}
}
