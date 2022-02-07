const dragonImage = new Image();
dragonImage.src = 'sprites/dragon.png';

class Dragon extends Tower{
	constructor(x,y){
		super(x,y, 150, 0, 200);

		//info for applying sprite sheet
		this.sprite = dragonImage;
		this.frameX = 0;
		this.frameY = 0; 
		this.minFrame = 0;
		this.maxFrame = 1;
		this.spriteWidth = 82;
		this.spriteHeight = 82;
	}
	draw(){
		// Draw the sprite
		context.drawImage(this.sprite, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x - 10, this.y + 15, this.width*1.1, this.height*1.1);
		super.draw('lime', 'black');
	}
	update(){
		super.update(FireBall);
		// Cycle through sprite
		if (frame % 25  === 0){
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
        }
	}
}
