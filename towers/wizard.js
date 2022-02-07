const wizardImage = new Image();
wizardImage.src = 'sprites/wizard.png';

class Wizard extends Tower{
	constructor(x,y){
		super(x,y, 75, 0, 40);

		//info for applying sprite sheet
		this.sprite = wizardImage;
		this.frameX = 0;
		this.frameY = 0; 
		this.minFrame = 0;
		this.maxFrame = 1;
		this.spriteWidth = 66;
		this.spriteHeight = 66;
	}
	draw(){
		// Draw the sprite
		context.drawImage(this.sprite, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x - 10, this.y + 15, this.width*1.1, this.height*1.1);
		super.draw('skyblue', 'gold');
	}
	update(){
		super.update(MagicBolt);
		// Cycle through sprite
		if (frame % 10  === 0){
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
        }
	}
}
