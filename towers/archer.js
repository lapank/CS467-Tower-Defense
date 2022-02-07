const archerImage = new Image();
archerImage.src = 'sprites/archer.png';

class Archer extends Tower{
	constructor(x,y){
		super(x,y, 100, 0, 100);

		//info for applying sprite sheet
		this.sprite = archerImage;
		this.frameX = 0;
		this.frameY = 0; 
		this.minFrame = 0;
		this.maxFrame = 1;
		this.spriteWidth = 31.8;
		this.spriteHeight = 34;
	}
	draw(){
		context.drawImage(this.sprite, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x +25, this.y + 55, this.width * 0.35, this.height *0.45);
		super.draw('saddlebrown', 'white');
	}
	update(){
		super.update(Arrow);
		// Cycle through sprite
		if (frame % 20  === 0){
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
        }
	}
}
