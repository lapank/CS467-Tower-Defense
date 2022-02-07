const magicboltImage = new Image();
magicboltImage.src = 'sprites/magicbolt.png';

class MagicBolt extends Projectile{
	constructor(x,y){
		super(x,y,10);

		//info for applying sprite sheet
		this.sprite = magicboltImage;
		this.frameX = 0;
		this.frameY = 0; 
		this.minFrame = 0;
		this.maxFrame = 1;
		this.spriteWidth = 34;
		this.spriteHeight = 34;
	}
	draw(){
		// Draw the sprite
		context.drawImage(this.sprite, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x , this.y - 15, this.width*4, this.height*4);
		super.draw('gold');
	}
}
