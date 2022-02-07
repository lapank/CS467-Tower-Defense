const fireballImage = new Image();
fireballImage.src = 'sprites/fireball.png';

class FireBall extends Projectile{
	constructor(x,y){
		super(x,y, 50);

		//info for applying sprite sheet
		this.sprite = fireballImage;
		this.frameX = 0;
		this.frameY = 0; 
		this.minFrame = 0;
		this.maxFrame = 1;
		this.spriteWidth = 34;
		this.spriteHeight = 34;
	}
	draw(){
		// Draw the sprite
		context.drawImage(this.sprite, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x , this.y , this.width*4, this.height*4);
		super.draw('darkorange');
	}
}
