const arrowImage = new Image();
arrowImage.src = 'sprites/arrow.png';

class Arrow extends Projectile{
	constructor(x,y){
		super(x,y, 10);

		//info for applying sprite sheet
		this.sprite = arrowImage;
		this.frameX = 0;
		this.frameY = 0; 
		this.minFrame = 0;
		this.maxFrame = 0;
		this.spriteWidth = 32;
		this.spriteHeight = 32;
	}
	draw(){
		// Draw the sprite
		context.drawImage(this.sprite, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x , this.y - 18 , this.width*4, this.height*4);
		//super.draw('black');
	}
}
